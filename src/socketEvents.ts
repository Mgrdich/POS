import {Chats} from "./models/Chat";
import {IDocMessage} from "./interfaces/models/Message";
import {Messages} from "./models/Message";

let connections:Array<any> = [];

export function socketEvents(io) {
    // Set socket.io listeners.
    io.on('connection', function(socket) {
        connections.push(socket);
        let userId:string;

        socket.on('auth',function (id) {
            userId = id;
            socket.userId = userId;
        });

        // On conversation entry, join broadcast channel
        socket.on('enter conversation', function (conversation) {
            socket.join(conversation);
            // console.log('joined ' + conversation);
        });

        socket.on('leave conversation', function (conversation) {
            socket.leave(conversation);
            // console.log('left ' + conversation);
        });


        socket.on('new message', async function (msg) {
            const {messages} = await Chats.add(userId,msg.to,msg.text);
            const messageId = messages[messages.length-1]; //last
            const message:IDocMessage = await Messages.findById(messageId).populate('sender','name');
            socket.emit('received message',message); //for the same user
            let recipient = connections.filter(function (recipient) {
                return recipient.userId === msg.to;
            })[0];
            socket.to(recipient.id).emit('received message',message);
        });

        socket.on('disconnect', function() {
            userId = '';
            connections.splice(connections.indexOf(socket), 1); //deleting it from connections
        });
    });
}