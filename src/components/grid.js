let update = c => {
};

let draw = c => {
    let {ctx} = c;
    let {nodes, width, tileSize} = c.component;
    ctx.fillStyle = '#fff';
    nodes.forEach((node, index) => {
        let x = index % width;
        let y = index / width | 0;
        if (node === 1) {
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        } else {
            ctx.fillRect((x + 7 / 16) * tileSize, (y + 7 / 16) * tileSize, tileSize / 8, tileSize / 8);
        }
    });
};

export default Object.freeze({
    draw,
    update
});
