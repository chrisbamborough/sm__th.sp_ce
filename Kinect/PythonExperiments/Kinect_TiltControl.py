import ctypes
import time

# Load the freenect library for motor control
freenect = ctypes.CDLL('/opt/homebrew/lib/libfreenect.dylib')  # Update this path based on the find command output

# Define the necessary structures
class FreenectDevice(ctypes.Structure):
    pass

class FreenectTiltState(ctypes.Structure):
    _fields_ = [("accelerometer_x", ctypes.c_double),
                ("accelerometer_y", ctypes.c_double),
                ("accelerometer_z", ctypes.c_double),
                ("tilt_angle", ctypes.c_double),
                ("tilt_status", ctypes.c_int)]

# Define the return type and argument types for the motor control functions
freenect.freenect_init.restype = ctypes.c_int
freenect.freenect_open_device.restype = ctypes.c_int
freenect.freenect_close_device.restype = ctypes.c_int
freenect.freenect_shutdown.restype = ctypes.c_int
freenect.freenect_set_tilt_degs.restype = ctypes.c_int
freenect.freenect_set_tilt_degs.argtypes = [ctypes.POINTER(FreenectDevice), ctypes.c_double]
freenect.freenect_get_tilt_state.restype = ctypes.POINTER(FreenectTiltState)
freenect.freenect_update_tilt_state.restype = ctypes.c_int
freenect.freenect_update_tilt_state.argtypes = [ctypes.POINTER(FreenectDevice)]

# Initialize the freenect context
ctx = ctypes.c_void_p()
if freenect.freenect_init(ctypes.byref(ctx), None) < 0:
    raise RuntimeError('Failed to initialize freenect')

# Open the first Kinect device
dev = ctypes.POINTER(FreenectDevice)()
if freenect.freenect_open_device(ctx, ctypes.byref(dev), 0) < 0:
    raise RuntimeError('Failed to open Kinect device')

# Function to set the tilt angle
def set_tilt_angle(angle):
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

# Test setting the tilt angle
if __name__ == "__main__":
    set_tilt_angle(15)  # Set tilt angle to 15 degrees
    set_tilt_angle(-15)  # Set tilt angle to -15 degrees
    set_tilt_angle(0)  # Reset tilt angle to 0 degrees

    freenect.freenect_close_device(dev)
    freenect.freenect_shutdown(ctx)