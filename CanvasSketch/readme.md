# Install the CLI tool globally

npm install canvas-sketch-cli -g

# to update CLI tool

npm install canvas-sketch-cli@latest --global

# Updating canvas-sketch (JavaScript API and Library)

npm install canvas-sketch@latest

# Make a new folder to hold all your sketches

mkdir my-sketches

# Move into that folder

cd my-sketches

# Start a new sketch and open the browser

canvas-sketch --new --open

# Run the development server on an existing file

canvas-sketch src/foobar.js

# Start a new sketch from the Three.js template

canvas-sketch --new --template=three --open

# Build your sketch to a sharable HTML + JS website

canvas-sketch sketches/my-sketch.js --build

# Paste the clipboard contents & run a new sketch at './foo.js'

pbpaste | canvas-sketch foo.js --new

# run a local version of the sketch

npx canvas-sketch my-sketch.js --open

# 2D graphics - Canvas API

https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

# 3D - WebGL

https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API

# Save animations to MP4 file

canvas-sketch animation.js --output=tmp --stream

# Save animations to GIF file instead

canvas-sketch animation.js --output=tmp --stream=gif

# Save animations to GIF but scale it down to 512 px wide

canvas-sketch animation.js --output=tmp --stream [ gif --scale=512:-1 ]

# With the browser in focus, you can use the following shortcuts to export your artwork:

# Export a single frame

Cmd + S or Ctrl + S

# Start/stop exporting a sequence of frames

Cmd + Shift + S or Ctrl + Shift + S
