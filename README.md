# socket.io Websocket Termination Persistence

If you're running `socket.io` in kubernetes, but want
to give some kind of timeout for processes to finish before cutting
the connection, what happens?

This repo helps answer that question.

## Getting Started

```sh
git clone https://github.com/briankopp/socketio-wss-termination-persistence
cd socketio-wss-termination-persistence
npm run start
```

Open a browser to `http://localhost:3000`.

## Strategies

There are a few possible ways to handle this. We'll give these a shot.

### Use Pre-Start and Pre-Stop Hooks


