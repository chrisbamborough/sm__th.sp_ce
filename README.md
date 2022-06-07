# smthspce

# Install the CLI tool globally

npm install canvas-sketch-cli -g

# To update the CLI tool, you can re-install it globally:

npm install canvas-sketch-cli@latest -g

# Start a new sketch and open the browser

canvas-sketch --new --open

# Run the development server on an existing file

canvas-sketch sketches/foobar.js

# Start a new sketch from the Three.js template

canvas-sketch --new --template=three --open

# Build your sketch to a sharable HTML + JS website

canvas-sketch sketches/my-sketch.js --build
