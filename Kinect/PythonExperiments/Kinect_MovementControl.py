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
        if result == -1:
            print("DEBUG LIBUSB_ERROR_ACCESS: Access denied (insufficient permissions)")
        elif result == -2:
            print("LIBUSB_ERROR_NO_DEVICE: No such device (it may have been disconnected)")
        elif result == -3:
            print("LIBUSB_ERROR_NOT_FOUND: Entity not found")
        elif result == -4:
            print("LIBUSB_ERROR_BUSY: Resource busy")
        elif result == -5:
            print("LIBUSB_ERROR_TIMEOUT: Operation timed out")
        elif result == -6:
            print("LIBUSB_ERROR_OVERFLOW: Overflow")
        elif result == -7:
            print("LIBUSB_ERROR_PIPE: Pipe error")
        elif result == -8:
            print("LIBUSB_ERROR_INTERRUPTED: System call interrupted (perhaps due to signal)")
        elif result == -9:
            print("LIBUSB_ERROR_NO_MEM: Insufficient memory")
        return None
    frame_array = np.ctypeslib.as_array(video_ptr, shape=(480, 640, 3))
    del freenect_sync  # Unload freenect_sync library
    return cv2.cvtColor(frame_array, cv2.COLOR_RGB2BGR)

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
            frame = get_video()
            if frame is not None:
                cv2.imshow('Kinect Video', frame)
            key = cv2.waitKey(1) & 0xFF
            if key == ord('q'):
                break
            elif key == 126:  # Up arrow key
                cv2.destroyAllWindows()
                time.sleep(2)  # Ensure the device is properly released
                current_tilt_angle += 5  # Increment tilt angle
                set_tilt_angle(current_tilt_angle)
            elif key == 125:  # Down arrow key
                cv2.destroyAllWindows()
                time.sleep(2)  # Ensure the device is properly released
                current_tilt_angle -= 5  # Decrement tilt angle
                set_tilt_angle(current_tilt_angle)

    finally:
        cv2.destroyAllWindows()

if __name__ == "__main__":
    main()