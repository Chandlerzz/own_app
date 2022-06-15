import WebSocket, { WebSocketServer } from 'ws';
import { readFile } from 'fs/promises';


const wss = new WebSocketServer({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  }
});

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
  setInterval(function(){
    filename(ws)
  },2000)

});
async function filename(ws) {
  try {
    const fileName = "/home/chandler/.lrc"
    const controller = new AbortController();
    const { signal } = controller;
    const promise = readFile(fileName, { signal });

    // Abort the request before the promise settles.
    // controller.abort();
    let result = null;

    await promise.then(res => {result = res});
    result = result.toString()
    ws.send(result)
    result = result.split("\n")
    result = result.split
    
  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error(err);
  }
}
