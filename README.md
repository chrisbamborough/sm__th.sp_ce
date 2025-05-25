# smthspce

An ongoing design program repository related to architecture. See individual folders for instructions.

Instagram - 640 x 800 - 150 dpi - 4:5 ratio

The code uses Rhino 3DM JS / Three.js / D3.js

Run a server with debugging on each index.html file

---

# Kinect

1. Install libfreenect (aka freenect)

libfreenect is part of OpenKinect, a community driver that supports Kinect v1 on macOS.

```bash
pip install numpy opencv-python websockets
brew install libfreenect
```

2. Test RGB/Depth Streams

```bash
freenect-glview
```

3. Write a Node.js script to read from libfreenect - kinect_full_server.py

```python
import freenect
import numpy as np
import asyncio
import websockets
import json
import struct

async def send_kinect_data(websocket, _):
    while True:
        # Get RGB (video), Depth, IR
        video, _ = freenect.sync_get_video(format=freenect.VIDEO_RGB)
        depth, _ = freenect.sync_get_depth()
        ir, _ = freenect.sync_get_video(format=freenect.VIDEO_IR_8BIT)
        accel = freenect.get_accel(freenect.init(), 0)
        tilt = freenect.get_tilt_degs(freenect.init(), 0)

        # Convert to bytes
        video_bytes = video.tobytes()          # 640x480x3
        depth_bytes = depth.astype(np.uint16).tobytes()  # 640x480x2
        ir_bytes = ir.tobytes()                # 640x480x1

        # Send header with sizes and metadata
        header = {
            "type": "kinect_frame",
            "sizes": {
                "video": len(video_bytes),
                "depth": len(depth_bytes),
                "ir": len(ir_bytes)
            },
            "accel": accel,
            "tilt": tilt
        }
        header_json = json.dumps(header).encode('utf-8')
        header_size = struct.pack("!I", len(header_json))  # 4-byte length prefix

        # Send header + data as a single binary packet
        await websocket.send(header_size + header_json + video_bytes + depth_bytes + ir_bytes)

        await asyncio.sleep(1 / 15)

start_server = websockets.serve(send_kinect_data, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
```

4. Run the servere

```bash
python kinect_server.py
```

5. Vanilla JS Client with Canvas

```html
<canvas id="rgbCanvas"></canvas>
<canvas id="depthCanvas"></canvas>
<canvas id="irCanvas"></canvas>
<script>
  const rgbCanvas = document.getElementById("rgbCanvas");
  const depthCanvas = document.getElementById("depthCanvas");
  const irCanvas = document.getElementById("irCanvas");

  const width = 640,
    height = 480;
  [rgbCanvas, depthCanvas, irCanvas].forEach((c) => {
    c.width = width;
    c.height = height;
  });

  const ctxRGB = rgbCanvas.getContext("2d");
  const ctxDepth = depthCanvas.getContext("2d");
  const ctxIR = irCanvas.getContext("2d");

  const socket = new WebSocket("ws://localhost:8765");
  socket.binaryType = "arraybuffer";

  let buffer = new Uint8Array();

  socket.onmessage = async (event) => {
    const chunk = new Uint8Array(event.data);
    buffer = chunk;

    // First 4 bytes = header length
    const headerLen = new DataView(buffer.buffer).getUint32(0);
    const headerJSON = new TextDecoder().decode(buffer.slice(4, 4 + headerLen));
    const header = JSON.parse(headerJSON);

    const offsetStart = 4 + headerLen;
    const videoSize = header.sizes.video;
    const depthSize = header.sizes.depth;
    const irSize = header.sizes.ir;

    const videoData = buffer.slice(offsetStart, offsetStart + videoSize);
    const depthData = buffer.slice(
      offsetStart + videoSize,
      offsetStart + videoSize + depthSize
    );
    const irData = buffer.slice(offsetStart + videoSize + depthSize);

    drawRGB(videoData);
    drawDepth(
      new Uint16Array(depthData.buffer, depthData.byteOffset, width * height)
    );
    drawIR(irData);
  };

  function drawRGB(bytes) {
    const imageData = ctxRGB.createImageData(width, height);
    for (let i = 0; i < width * height; i++) {
      const j = i * 3;
      const k = i * 4;
      imageData.data[k] = bytes[j];
      imageData.data[k + 1] = bytes[j + 1];
      imageData.data[k + 2] = bytes[j + 2];
      imageData.data[k + 3] = 255;
    }
    ctxRGB.putImageData(imageData, 0, 0);
  }

  function drawDepth(depthArray) {
    const imageData = ctxDepth.createImageData(width, height);
    for (let i = 0; i < depthArray.length; i++) {
      const v = depthArray[i];
      const b = 255 - Math.min((v / 2048) * 255, 255);
      const j = i * 4;
      imageData.data[j] = b;
      imageData.data[j + 1] = b;
      imageData.data[j + 2] = b;
      imageData.data[j + 3] = 255;
    }
    ctxDepth.putImageData(imageData, 0, 0);
  }

  function drawIR(bytes) {
    const imageData = ctxIR.createImageData(width, height);
    for (let i = 0; i < width * height; i++) {
      const v = bytes[i];
      const j = i * 4;
      imageData.data[j] = v;
      imageData.data[j + 1] = v;
      imageData.data[j + 2] = v;
      imageData.data[j + 3] = 255;
    }
    ctxIR.putImageData(imageData, 0, 0);
  }
</script>
```
