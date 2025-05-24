import ctypes
import numpy as np
import cv2

# Load the freenect_sync library
freenect_sync = ctypes.CDLL('/opt/homebrew/lib/libfreenect_sync.dylib')  # Update this path based on the find command output

# Define the necessary functions and structures
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

class FreenectDevice(ctypes.Structure):
    pass

# Define the return type and argument types for the freenect_sync_get_video function
freenect_sync.freenect_sync_get_video.restype = ctypes.c_int
freenect_sync.freenect_sync_get_video.argtypes = [ctypes.POINTER(ctypes.POINTER(ctypes.c_uint8)), ctypes.POINTER(ctypes.c_uint32), ctypes.c_int, ctypes.c_int]

def get_video():
    video_ptr = ctypes.POINTER(ctypes.c_uint8)()
    timestamp = ctypes.c_uint32()
    result = freenect_sync.freenect_sync_get_video(ctypes.byref(video_ptr), ctypes.byref(timestamp), 0, 0)
    if result != 0:
        print(f"Error getting video: {result}")
        return None
    frame_array = np.ctypeslib.as_array(video_ptr, shape=(480, 640, 3))
    return cv2.cvtColor(frame_array, cv2.COLOR_RGB2BGR)

if __name__ == "__main__":
    while True:
        frame = get_video()
        if frame is not None:
            cv2.imshow('Kinect Video', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cv2.destroyAllWindows()