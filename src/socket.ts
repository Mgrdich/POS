import * as socketio from "socket.io"

let io;
const ioConfig = {
    init: function (httpServer) {
        io = socketio(httpServer);
        return io;
    },
    getIO: function () {
        if (!io) {
            throw Error('Socket is not working')
        }
        return io;
    }
};
export default ioConfig;