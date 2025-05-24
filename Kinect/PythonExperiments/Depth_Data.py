import ctypes
import time
import numpy as np
import cv2

# Define the necessary functions and structures for video capture
class FreenectFrameMode(ctypes.Structure):
    _fields_ = [("reserved", ctypes.c_uint32 * 4),
                ("resolution", ctypes.c_int),
                ("video_format", ctypes.c_int),
                ("bytes", ctypes.c_int),
                ("width", ctypes.c_int),
                ("height", ctypes.c_int),
                ("data_bits_per_pixel", ctypes.c_int),
                ("padding_bits_per_pixel", ctypes.c_int),
                ("framerate", ctypes.c_int),
                ("is_valid", ctypes.c_int),
                ("bpp", ctypes.c_int)]

# Define the necessary functions and structures for motor control
class FreenectDevice(ctypes.Structure):
    pass

class FreenectTiltState(ctypes.Structure):
    _fields_ = [("accelerometer_x", ctypes.c_double),
                ("accelerometer_y", ctypes.c_double),
                ("accelerometer_z", ctypes.c_double),
                ("tilt_angle", ctypes.c_double),
                ("tilt_status", ctypes.c_int)]

def get_video():
    print("Loading freenect_sync library...")
    freenect_sync = ctypes.CDLL('/opt/homebrew/lib/libfreenect_sync.dylib')
    print("freenect_sync loaded")

    print("Getting video frame...")
    video_ptr = ctypes.POINTER(ctypes.c_uint8)()
    timestamp = ctypes.c_uint32()
    result = freenect_sync.freenect_sync_get_video(ctypes.byref(video_ptr), ctypes.byref(timestamp), 0, 0)
    if result != 0:
        print(f"Error getting video frame: {result}")
        return None
    frame_array = np.ctypeslib.as_array(video_ptr, shape=(480, 640, 3))
    del freenect_sync  # Unload freenect_sync library
    return cv2.cvtColor(frame_array, cv2.COLOR_RGB2BGR)

def get_depth():
    print("Loading freenect_sync library...")
    freenect_sync = ctypes.CDLL('/opt/homebrew/lib/libfreenect_sync.dylib')
    print("freenect_sync loaded")

    print("Getting depth frame...")
    depth_ptr = ctypes.POINTER(ctypes.c_uint16)()
    timestamp = ctypes.c_uint32()
    result = freenect_sync.freenect_sync_get_depth(ctypes.byref(depth_ptr), ctypes.byref(timestamp), 0, 0)
    if result != 0:
        print(f"Error getting depth frame: {result}")
        return None
    depth_array = np.ctypeslib.as_array(depth_ptr, shape=(480, 640))
    del freenect_sync  # Unload freenect_sync library
    return depth_array

def set_tilt_angle(angle):
    print("Loading freenect library...")
    freenect = ctypes.CDLL('/opt/homebrew/lib/libfreenect.dylib')
    print("freenect loaded")

    ctx = ctypes.c_void_p()
    if freenect.freenect_init(ctypes.byref(ctx), None) < 0:
        raise RuntimeError('Failed to initialize freenect')
    dev = ctypes.POINTER(FreenectDevice)()
    if freenect.freenect_open_device(ctx, ctypes.byref(dev), 0) < 0:
        raise RuntimeError('Failed to open Kinect device')

    print(f"Setting tilt angle to {angle} degrees")
    result = freenect.freenect_set_tilt_degs(dev, angle)
    if result != 0:
        print(f"Error setting tilt angle: {result}")
    else:
        print(f"Tilt angle set to {angle} degrees")
        time.sleep(2)  # Add delay to give the motor time to move
        freenect.freenect_update_tilt_state(dev)
        tilt_state = freenect.freenect_get_tilt_state(dev)
        print(f"Current tilt angle: {tilt_state.contents.tilt_angle} degrees")
        print(f"Tilt status: {tilt_state.contents.tilt_status}")

    freenect.freenect_close_device(dev)
    freenect.freenect_shutdown(ctx)
    del freenect  # Unload freenect library

def main():
    current_tilt_angle = 0  # Initialize the current tilt angle

    try:
        while True:
            depth = get_depth()
            if depth is not None:
                depth_colormap = cv2.applyColorMap(cv2.convertScaleAbs(depth, alpha=0.03), cv2.COLORMAP_JET)
                cv2.imshow('Kinect Depth', depth_colormap)
            
            # Wait for key press and check for 'q' or ESC key
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q') or key == 27:  # 'q' or ESC key
                print("Exiting...")
                break
            elif key == 126:  # Up arrow key
                current_tilt_angle += 5  # Increment tilt angle
                set_tilt_angle(current_tilt_angle)
            elif key == 125:  # Down arrow key
                current_tilt_angle -= 5  # Decrement tilt angle
                set_tilt_angle(current_tilt_angle)

    finally:
        cv2.destroyAllWindows()
        print("Windows closed. Program terminated.")

if __name__ == "__main__":
    main()