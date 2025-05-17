document.body.style.margin   = 0
document.body.style.overflow = `hidden`

const cnv = document.getElementById (`cnv_element`)
cnv.width = innerWidth
cnv.height = innerHeight

const ctx = cnv.getContext (`2d`)

const draw_frame = ms => {
   ctx.fillStyle = `pink`
   ctx.fillRect (0, 0, innerWidth, innerHeight)

   const seconds = (ms / 1000)
   console.log (seconds.toFixed (2))

   const images = [
    { src: './src/dageoff.png', x: 100, y: 100, width: 200, height: 150 },
    { src: './src/ergeoff.png', x: 350, y: 150, width: 150, height: 100 },
    { src: './src/dageon.png', x: 50, y: 300, width: 250, height: 200 }
  ];

  let loadedImages = 0; // Keep track of how many images have loaded

  images.forEach(imageData => {
    const img = new Image();
    img.src = imageData.src;

    img.onload = () => {
      // Draw the image onto the canvas
      ctx.drawImage(img, imageData.x, imageData.y, imageData.width, imageData.height);
      loadedImages++; // Increment the counter

      // If all images are loaded, you can do something else (optional)
      if (loadedImages === images.length) {
        console.log('All images loaded and drawn!');
        // You could add more drawing here, or trigger another function
      }
    };
  });
  
   requestAnimationFrame (draw_frame)
}

draw_frame ()

onresize = () => {
   cnv.width = innerWidth
   cnv.height = innerHeight   
}

