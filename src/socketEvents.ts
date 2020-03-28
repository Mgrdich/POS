export function socketEvents(io) {
    // Set socket.io listeners.
    io.on('connection', function(socket) {

        let userId:string;

        socket.on('auth',function (id) {
            userId = id;
        });

        socket.on('logout',function () {

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

        socket.on('new message', function (conversation) {

            io.sockets.emit('refresh messages', conversation,new Date().toLocaleDateString());
        });

        socket.on('disconnect', function() {
            //console.log('user disconnected');
        });
    });
}