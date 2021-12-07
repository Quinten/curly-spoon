let draw = c => {
    let {ctx} = c;
    let {nodes, width, tileSize} = c.component;
    ctx.fillStyle = '#fff';
    let offsetX = (c.entities.viewport.resize.width - c.entities.viewport.resize.minWidth) / 2;
    let offsetY = (c.entities.viewport.resize.height - c.entities.viewport.resize.minHeight) / 2;
    c.component.x = offsetX;
    c.component.y = offsetY;
    nodes.forEach((node, index) => {
        let x = index % width;
        let y = index / width | 0;
        if (node === 1) {
            ctx.fillRect(
                offsetX + x * tileSize,
                offsetY + y * tileSize,
                tileSize,
                tileSize
            );
        } else {
            ctx.fillRect(
                offsetX + (x + 7 / 16) * tileSize,
                offsetY + (y + 7 / 16) * tileSize,
                tileSize / 8,
                tileSize / 8
            );
        }
    });
};

export default Object.freeze({
    draw
});
