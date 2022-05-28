var song;
var fft;

var spectrum = [];
var bins = 128;
var segments = 16;

var segAvs = [0];
//Segment Averages

var segPreAvs = [0];
//Segment Previous Averages

var segSpan = bins / segments;
//Segment Span (how many bins are in a segment)

var countPreAvs = 0;
//Count Previous Averages

var countPreAvsThreshold = 20;
//Count Previous Averages

var spikeThreshold = 1.15;
//multiplies with the segment previous average to see if the segment average exceeds that sum
//the higher it is, the more the segment average needs to exceed the previous segment average for a spike to be read

var minSpikeThreshold = 60;
//the minimum a segment average needs to be before it counts as a spike

function preload() {
  song = loadSound("fortunate-son.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(map(segments, 2, 32, 24, 4));
  textAlign(CENTER);

  arrSetup();

  song.setVolume(0.3);
  song.loop();
  fft = new p5.FFT(0.2, bins);
}

function draw() {
  background(0);
  spectrum = fft.analyze(bins);
  calAllSegAvs();
  noStroke();
  fill(255);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x + ((width / spectrum.length)/2), height, width / spectrum.length, h);
  }
  drawSegmentLines();

  fill(255, 0, 0);

  var x = (width / segments) / 2;
  for (let i = 0; i < segAvs.length; i++) {
    text(
      "Segment " + (i + 1) + " Amp: " + segAvs[i],
      x,
      20
    );
    text(
      "Seg " + (i + 1) + " Pre-Amp: " + segPreAvs[i],
      x,
      50
    );

    if (spikeCheck(i) == true) {
      rectMode(CENTER);
      fill(0, 255, 0);
      rect(x, height - 50, width / segments, 100);
      fill(255, 0, 0);
    }
    x += width/segments;
  }
}