import {Chats} from "./models/Chat";
import {IDocMessage} from "./interfaces/models/Message";
import {Messages} from "./models/Message";

export function socketEvents(io) {
    // Set socket.io listeners.
    io.on('connection', function(socket) {

        let userId:string;

        socket.on('auth',function (id) {
            userId = id;
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
            console.log("userId",userId);
            const {messages} = await Chats.add(userId,msg.to,msg.text);
            const messageId = messages[messages.length-1]; //last
            const message:IDocMessage = await Messages.findById(messageId).populate('sender','name');
            socket.emit('received message',message);
        });

        socket.on('disconnect', function() {
            userId = '';
        });
    });
}