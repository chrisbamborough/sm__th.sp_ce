let sound;
let fft;
let amplitude;
let peakDetect;
let isPlaying = false;
let waveform = []; // To store waveform data
let colorPalettes = []; // Store multiple color palettes
let currentPalette = 0;
let paletteTransitionTime = 10000; // Time in ms to transition between palettes
let lastPaletteChange = 0;
let colorLerpAmount = 0; // For smooth color transitions

function preload() {
  sound = loadSound("assets/ZOOM0001.MP3"); // <-- Put your file in the project folder
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  fft = new p5.FFT(0.8, 1024); // Increased bins for more detail
  amplitude = new p5.Amplitude();
  peakDetect = new p5.PeakDetect();

  sound.setVolume(0.8);

  // Define several color palettes (background, wave, circle)
  colorPalettes = [
    // Cool blues and purples
    { bg: [30, 20, 70], wave: [100, 200, 255], circle: [255, 100, 180] },
    // Warm reds and oranges
    { bg: [50, 10, 10], wave: [255, 150, 50], circle: [255, 50, 50] },
    // Greens and cyans
    { bg: [10, 40, 30], wave: [50, 255, 200], circle: [180, 255, 100] },
    // Monochrome
    { bg: [20, 20, 20], wave: [200, 200, 200], circle: [255, 255, 255] },
    // Neon colors
    { bg: [10, 5, 20], wave: [255, 50, 255], circle: [50, 255, 200] },
  ];

  // Add a play button that ensures audio context is started
  let playButton = createButton("Play Audio");
  playButton.position(10, 10);
  playButton.style("background-color", "#55FF55");
  playButton.style("color", "white");
  playButton.style("padding", "8px 12px");
  playButton.style("border", "none");
  playButton.style("border-radius", "4px");
  playButton.mousePressed(() => {
    if (!isPlaying) {
      sound.play();
      isPlaying = true;
      playButton.html("Pause Audio");
    } else {
      sound.pause();
      isPlaying = false;
      playButton.html("Play Audio");
    }
  });
}

function draw() {
  let bass = 0,
    mid = 0,
    treble = 0;

  // Handle color palette transitions
  updateColorPalette();

  let currentColors = getCurrentColors();

  if (sound.isPlaying()) {
    let level = amplitude.getLevel();
    let spectrum = fft.analyze();
    waveform = fft.waveform(); // Get waveform data
    peakDetect.update(fft);

    let circleSize = map(level, 0, 0.5, 50, width * 0.8);

    // Get audio data
    bass = fft.getEnergy("bass");
    mid = fft.getEnergy("mid");
    treble = fft.getEnergy("treble");

    // Create a background with dynamic colors based on audio
    let bgColor = color(
      currentColors.bg[0] + bass * 0.3,
      currentColors.bg[1] + mid * 0.2,
      currentColors.bg[2] + treble * 0.2,
      50
    );
    background(bgColor);

    // Draw fullscreen spectrum visualization
    drawFullscreenWaveform(spectrum, currentColors.wave);

    // Draw the main circle with responsive color
    let circleColor = color(
      currentColors.circle[0],
      currentColors.circle[1],
      currentColors.circle[2],
      200
    );
    fill(circleColor);
    ellipse(width / 2, height / 2, circleSize, circleSize);

    // Draw waveform around the circle
    drawCircularWaveform(
      waveform,
      width / 2,
      height / 2,
      circleSize * 0.6,
      currentColors.wave
    );

    // Draw peaks
    if (peakDetect.isDetected) {
      fill(255);
      for (let i = 0; i < 5; i++) {
        ellipse(random(width), random(height), 20, 20);
      }
    }
  } else {
    background(
      currentColors.bg[0],
      currentColors.bg[1],
      currentColors.bg[2],
      20
    );
  }
}

// Function to draw fullscreen spectrum visualization
function drawFullscreenWaveform(spectrum, waveColor) {
  stroke(waveColor[0], waveColor[1], waveColor[2], 180);
  strokeWeight(2);
  noFill();

  // Main large spectrum wave covering most of screen
  beginShape();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = map(spectrum[i], 0, 255, height, 0); // Inverted to fill from top
    vertex(x, h);
  }
  endShape();

  // Add multiple layers of waves with varying offsets for depth
  strokeWeight(1);
  stroke(waveColor[0], waveColor[1], waveColor[2], 120);

  // Second wave layer
  beginShape();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let val = spectrum[i] * 0.8; // Reduced effect
    let h = map(val, 0, 255, height, height * 0.2);
    vertex(x, h);
  }
  endShape();

  // Add vertical frequency lines across the entire height
  for (let i = 0; i < spectrum.length; i += 40) {
    let x = map(i, 0, spectrum.length, 0, width);
    let intensity = map(spectrum[i], 0, 255, 0, 1);
    stroke(waveColor[0], waveColor[1], waveColor[2], 100 * intensity);
    line(x, 0, x, height);
  }

  noStroke();
}

// Function to draw circular waveform around the main circle
function drawCircularWaveform(waveform, centerX, centerY, radius, waveColor) {
  stroke(waveColor[0], waveColor[1], waveColor[2], 200);
  strokeWeight(2);
  noFill();

  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let angle = map(i, 0, waveform.length, 0, TWO_PI);
    // Map waveform value to radius variation
    let r = radius + map(waveform[i], -1, 1, -40, 40);
    let x = centerX + r * cos(angle);
    let y = centerY + r * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
  noStroke();
}

function updateColorPalette() {
  // Change color palette over time
  if (millis() - lastPaletteChange > paletteTransitionTime) {
    let prevPalette = currentPalette;
    currentPalette = (currentPalette + 1) % colorPalettes.length;
    lastPaletteChange = millis();
    colorLerpAmount = 0; // Reset the lerp amount
  } else {
    // Increment lerp amount for smooth transition
    colorLerpAmount = (millis() - lastPaletteChange) / paletteTransitionTime;
  }
}

function getCurrentColors() {
  // Get the current and next palette for interpolation
  let currentPaletteColors = colorPalettes[currentPalette];
  let nextPaletteIndex = (currentPalette + 1) % colorPalettes.length;
  let nextPaletteColors = colorPalettes[nextPaletteIndex];

  // Interpolate between palettes
  return {
    bg: [
      lerp(
        currentPaletteColors.bg[0],
        nextPaletteColors.bg[0],
        colorLerpAmount
      ),
      lerp(
        currentPaletteColors.bg[1],
        nextPaletteColors.bg[1],
        colorLerpAmount
      ),
      lerp(
        currentPaletteColors.bg[2],
        nextPaletteColors.bg[2],
        colorLerpAmount
      ),
    ],
    wave: [
      lerp(
        currentPaletteColors.wave[0],
        nextPaletteColors.wave[0],
        colorLerpAmount
      ),
      lerp(
        currentPaletteColors.wave[1],
        nextPaletteColors.wave[1],
        colorLerpAmount
      ),
      lerp(
        currentPaletteColors.wave[2],
        nextPaletteColors.wave[2],
        colorLerpAmount
      ),
    ],
    circle: [
      lerp(
        currentPaletteColors.circle[0],
        nextPaletteColors.circle[0],
        colorLerpAmount
      ),
      lerp(
        currentPaletteColors.circle[1],
        nextPaletteColors.circle[1],
        colorLerpAmount
      ),
      lerp(
        currentPaletteColors.circle[2],
        nextPaletteColors.circle[2],
        colorLerpAmount
      ),
    ],
  };
}

function mousePressed() {
  if (!sound.isPlaying() && mouseX > 100) {
    // Only toggle if clicked outside buttons
    sound.play();
    isPlaying = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
