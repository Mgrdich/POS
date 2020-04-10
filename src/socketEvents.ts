import {Chats} from "./models/Chat";
import {IDocMessage} from "./interfaces/models/Message";
import {Messages} from "./models/Message";
import {GroupsChats} from "./models/ChatGroups";
import {isMongooseValidId} from "./utilities/functions";
import {IDocGroupsChat} from "./interfaces/models/ChatGroups";

let connections: Array<any> = [];

export function socketEvents(io) {
    // Set socket.io listeners.
    io.on('connection', function (socket) {
        connections.push(socket);
        let userId: string;

        socket.on('auth', function (id) {
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
            let message: IDocMessage;
            try {
                const {messages} = await Chats.add(userId, msg.to, msg.text);
                const messageId = messages[messages.length - 1];
                message = await Messages.findById(messageId).populate('sender', 'name');
            } catch (e) {
                console.log(e);
            }

            socket.emit('received message', message); //for the same user
            let recipient = connections.filter(function (recipient) {
                return recipient.userId === msg.to;
            })[0];
            if (recipient) {
                socket.to(recipient.id).emit('received message', message);
            }
        });

        socket.on('new message group', async function (groupId, msg) {
            if (!isMongooseValidId(groupId)) {
                return;
            }
            const groupChat: IDocGroupsChat = await GroupsChats.findById(groupId);
            if (!groupChat) {
                return
            }
            const {messages, members,admins} = await groupChat.add(userId, msg);
            
            const messageId: string = messages[messages.length - 1]; //last
            let message = await Messages.findById(messageId).populate('sender', 'name'); //TODO check out the importance
            socket.emit('received message', message); //for the same user

            let recipients: Array<any> = connections.filter(function (recipient) {
                return members.includes(recipient.userId) || admins.includes(recipient.userId);
            });
            if (recipients && recipients.length) {
                for (let i = 0; i < recipients.length; i++) {
                    socket.to(recipients[i].id).emit('received message', message);
                }
            }
        });

        socket.on('disconnect', function () {
            userId = '';
            connections.splice(connections.indexOf(socket), 1); //deleting it from connections
        });
    });
}