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