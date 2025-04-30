let particles = [];
const nums = 1000;

const noiseScale = 0.01;

function setup() {
   noCanvas();

   document.body.style.margin = "0";
   document.body.style.padding = "0";
   document.body.style.overflow = "hidden";

   createCanvas(innerWidth, innerHeight)
   for (let i = 0; i < nums; i ++) {
      particles.push(createVector(random(width), random(height)));
   }
}

function draw() {
   for (let i = 0; i < nums; i ++) {
      let p = particles[i];
      point(p.x, p.y);
      let n = noise(p.x * noiseScale, p.y * noiseScale);
      let a = TAU * n;
      p.x += cos(a);
      p.y += sin(a);
      if (!onScreen(p)) {
         p.x = random(width);
         p.y = random(height);
      }
   }
}

function mousePressed() {
   noiseSeed(millis());
   colorMode(HSB)
   stroke(random(100), random(360), random(360));
}

function onScreen(v) {  
   return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}