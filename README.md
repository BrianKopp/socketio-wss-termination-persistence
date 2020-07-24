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

By using postStart and preStop hooks in the container lifecycle,
we can see that while a container is being created
(which extends for the duration of postStart hook), the existing pod
is left in tact. Once the new pod gains Ready status, the existing pod
begins its termination lifecycle, which includes its preStop hook.
During this time, the web-socket connection is left in tact.
Once the preStop hook completes, the pod is sent a SIGTERM, which
it handles by shutting down the server.
When the client reconnects, it hits the new server.

### Using Service publishNotReadyAddresses

This should be avoided if possible. It does allow for pods to
hit behind a service after entering the Terminating state.

The downside is that the pod is not as quickly removed from
the service as it should be. Connections are refused sometimes
from the container while it is shutting down.

It does appear, though, that new pods do not enter the service
until they are Running, even if not Ready at that point (which is fine).

If a large percentage of our user base is using long-polling as a
transport mode, then using `publishNotReadyAddresses` may be
something to pursue.
