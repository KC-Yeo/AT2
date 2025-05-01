document.body.style.margin   = 0
document.body.style.overflow = `hidden`

const cnv = document.getElementById (`cnv_element`)
cnv.width = innerWidth
cnv.height = innerHeight

const ctx = cnv.getContext (`2d`)

const particles = [];
const numParticles = 1000;

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    angle: Math.random() * Math.PI * 2
  });
}

function onScreen(p) {
  return p.x >= 0 && p.x <= innerWidth && p.y >= 0 && p.y <= innerHeight;
}

function draw_frame() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  ctx.fillStyle = `pink`;

  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
    ctx.fill();

    p.x += Math.cos(p.angle);
    p.y += Math.sin(p.angle);

    if (!onScreen(p)) {
      p.x = Math.random() * innerWidth;
      p.y = Math.random() * innerHeight;
      p.angle = Math.random() * Math.PI * 2;
    }
  }
  requestAnimationFrame(draw_frame);
}

draw_frame();

onresize = () => {
   cnv.width = innerWidth
   cnv.height = innerHeight   
}

