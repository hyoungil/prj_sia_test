

export async function CanvasDrawing(
  crop,
  canvas,
  name,
  color
) {
  const ctx = canvas.current.getContext('2d')

  if (!ctx) {
    console.error(ctx + "<---------CTX 애러!")
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  var x = 300 * (crop.x / 100);
  var y = 150 * (crop.y / 100);
  var w = 300 * (crop.width / 100);
  var h = 150 * (crop.height / 100);
  ctx.strokeRect(x, y, w, h);

  // Text 처리 
  ctx.textBaseline = 'top';
  ctx.font = "10px Verdana";
  ctx.fillStyle = color;
  ctx.fillText(name, x, y - 9);
}
