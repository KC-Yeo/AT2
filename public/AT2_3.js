// assigning empty array to particles
// to store data
let particles = [];

// set number of particles to 1000
const nums = 1000;

// for gray spaces (glitch) 
// set to 50 pixels
let space = 50;

// assigning x and y initial positions
let x = 0;
let y = 0;

// setting constant value of 0.01 to noise
const noiseScale = 0.01;

// 
let wave;

// setting initial audio to false
// for users to click play on canvas
let playing = false;

// making of Particle class
class Particle {
   constructor(x, y) {
      this.pos = createVector(x, y);
      this.col = rand_col();
   }

   update() {

      // calculate noise value depending on x and y 
      // positions, scaled by noiseScale
      let n = noise(this.pos.x * noiseScale, this.pos.y * noiseScale);

      // map noise value to an angle between 0 and TAU
      let angle = TAU * n;

      // move particles depending on the angle
      // x to cos angle
      // y to sin angle
      this.pos.x += cos(angle);
      this.pos.y += sin(angle);

      // if position off screen
      if (!onScreen(this.pos)) {

         // reset x and y position within canvas width
         this.pos.x = random(width);
         this.pos.y = random(width);

         // random colour generated
         this.col = rand_col();
      }
   }

   display() {

      // display stroke of particle's colour
      stroke(this.col);

      // draw point in current x and y position
      point(this.pos.x, this.pos.y);
   }
}

function setup() {

   // remoce margin and padding 
   document.body.style.margin = "0";
   document.body.style.padding = "0";
   document.body.style.overflow = "hidden";
   

   // create canvas with window size
   createCanvas(windowWidth, windowHeight);

   // change colour mode to hue, saturation, brightness
   colorMode(HSB);

   // for loop 
   for (let i = 0; i < nums; i ++) {

      // create new particles with random positions
      // and push into array
      particles.push(new Particle(random(width), random(height)));
   }

   // create oscillator object
   wave = new p5.Oscillator();

   // sine angle waveform
   wave.setType('sine');

   // play oscillator
   wave.start();

   // frequency of oscillator set at 440
   wave.freq(440);

   // amplitude of oscillator set at 0.5
   wave.amp(0.5);

}

function draw() {
   for (let p of particles) {

      // update particles position in array for new position
      // using update function
      p.update();

      // draw new particles using display function
      p.display();
   }

   stroke(255)

   // if random number less than 0.1
   if (random(1) < 0.1) {

      // draw random grayscale between 0-255
      stroke(random(255));

      // draw a line from (x, y) to (x + space, y + space)
      line(x, y, x + space, y + space);
      text(x, y);

      // if random number less than 0.03
   } else if (random(1) < 0.03) {

      // fill random grayscale between 0-255
      fill(random(255));

      // left corner at (x, y) and width and height of (x + space, y + space)
      rect(x, y, x + space, y + space);
      stroke(random(255));
      text(x, y);
      stroke(random(255));
   } else {
      stroke(random(255));

      // // left corner at (x, y) and width and height of (space, space)
      rect(x, y, space, space);
      text(x, y);
      stroke(random(255));
   }

   // increment of 20
   x += 20;

   // if x more than width,
   if (x > width) {

      // x reset to 0 position
      x = 0;

      // reset to y + space(50) position
      y = y + space;
   }

   // if y more than height,
   if (y > height) {

      // y reset to 0 position
      y = 0;

      // reset to x + space(50) position
      x = x + space
   }

   // call osciallator function
   updateOscillator();
}


function mousePressed() {

   // change the noise function to millisecond
   // to change the direction of the particles each time mouse click
   noiseSeed(millis());
 
   // to check if Web Audio API is running
   // if not running
   if (getAudioContext().state !== 'running') {

      // resume playing audio 
      // then() continue donw code
     getAudioContext().resume().then(() => {

      // if not playing
       if (!playing) {

         // volume is 0.5 per second
         wave.amp(0.5, 1);

         // set 'playing' boolean to be true
         playing = true;

         // if playing
       } else {

         // volume to 0 (no sound)
         wave.amp(0, 1);

         // set 'playing' boolean to be false
         playing = false;
       }
     });

     // if oscillator already running
     // control osciallator only
   } else {

      // is not playing
     if (!playing) {
      
      // volume to 0.5
       wave.amp(0.5, 1);

       // set 'playing' true
       playing = true;

       // or else
     } else {

      // volume to 0
       wave.amp(0, 1);

       // set 'playing' false
       playing = false;
     }
   }
 }

function rand_col() {
   
   // return p5.js colour to random hue
   // 80% saturation
   // 100% brightness
   // 180out of 255 transparency
   return color(random(360), 80, 100, 180);
}

// to check if particles on screen
function onScreen(v) {  

   // return true of vectors are on screen
   return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

// declaring updateOscillator
function updateOscillator() {

   // map mouse x position (0 to width) to frequency (220, 880) 
   let freq = map(mouseX, 0, width, 220, 880);
   wave.freq(freq);

    // map mouse y position (0 to height) to amplitude (0.5, 0) 
   let amp = map(mouseY, 0, height, 0.5, 0);
   if (playing) {
      wave.amp(amp, 1)
   }
}