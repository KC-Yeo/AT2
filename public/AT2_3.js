let particles = [];
const nums = 1000;

let space = 50;
let x = 0;
let y = 0;

const noiseScale = 0.01;

class Particle {
   constructor(x, y) {
      this.pos = createVector(x, y);
      this.col = rand_col();
   }

   update() {
      let n = noise(this.pos.x * noiseScale, this.pos.y * noiseScale);
      let angle = TAU * n;
      this.pos.x += cos(angle);
      this.pos.y += sin(angle);

      if (!onScreen(this.pos)) {
         this.pos.x = random(width);
         this.pos.y = random(width);
         this.col = rand_col();
      }
   }

   display() {
      stroke(this.col);
      point(this.pos.x, this.pos.y);
   }
}

function setup() {
   document.body.style.margin = "0";
   document.body.style.padding = "0";
   document.body.style.overflow = "hidden";

   createCanvas(windowWidth, windowHeight);
   colorMode(HSB);
   for (let i = 0; i < nums; i ++) {
      particles.push(new Particle(random(width), random(height)));
   }
}

function draw() {
   for (let p of particles) {
      p.update();
      p.display();
   }

   stroke(255)
   // strokeWeight(0.1);
   if (random(1) < 0.1) {
      stroke(random(255));
      line(x, y, x + space, y + space);
      text(x, y);
   } else if (random(1) < 0.03) {
      fill(random(255));
      rect(x, y, x + space, y + space);
      stroke(random(255));
      text(x, y);
      stroke(random(255));
   } else {
      stroke(random(255));
      rect(x, y, space, space);
      text(x, y);
      stroke(random(255));
   }

   x += 20;

   if (x > width) {
      x = 0;
      y = y + space;
   }

   if (y > height) {
      y = 0;
      x = x + space
   }
}

class Particles {
   constructor(x, y) {
      this.pos = createVector(x, y);
      this.col = rand_col();
   }

   update() {
      let n = noise(this.pos.x * noiseScale, this.pos.y * noiseScale);
      let angle = TAU * n;
      this.pos.x += cos(angle);
      this.pos.y += sin(angle);

      if (!onScreen(this.pos)) {
         this.pos.x = random(width);
         this.pos.y = random(width);
         this.col = rand_col();
      }
   }

   display() {
      stroke(this.col);
      point(this.pos.x, this.pos.y);
   }
}

function mousePressed() {
   noiseSeed(millis());
}

function rand_col() {
   // colorMode(HSB);
   return color(random(360), 80, 100, 180);
}

function onScreen(v) {  
   return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}