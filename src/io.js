const socketIo = require('socket.io');

/**
 * Sets up socket io
 * @param {import('http').Server} server
 * @param {import('socket.io').ServerOptions} options
 */
const setupSocketIO = (server, options = null) => {
    const io = socketIo(server, options);
    io.on('connection', socket => {
        console.log('connected to socket', socket.id);
        socket.on('disconnect', (reason) => {
            console.log('disconnect for reason', reason, socket.id);
            clearInterval(socket.interval);
        });
        socket.on('disconnecting', (reason) => {
            console.log('disconnecting for reason', reason, socket.id);
        });

        socket.interval = setInterval(() => {
            console.log('sending message', socket.id);
            socket.emit('message', {
                message: 'howdy'
            });
        }, 5000);
    });
    return io;
};

module.exports = { setupSocketIO };
