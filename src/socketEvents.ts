import {Chats} from "./models/Chat";

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
            const chat = await Chats.add(userId,msg.to,msg.text);
            // io.sockets.emit('refresh messages', chat);
        });

        socket.on('disconnect', function() {
            userId = '';
        });
    });
}