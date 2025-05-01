let particles = [];
const nums = 1000;

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

function glitch() {
   textSize(8);
   text(("error"), this.x, this.y)
}

function rand_col() {
   // colorMode(HSB);
   return color(random(200), 80, 100, 180);
}

function mousePressed() {
   noiseSeed(millis());

}

function onScreen(v) {  
   return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}