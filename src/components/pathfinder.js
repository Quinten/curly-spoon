let draw = c => {
    let {component, entities, ctx} = c;
    // tmp
    if (component.endNode !== undefined) {
        component.startNode = component.endNode;
    }
    let grid = entities[component.grid].grid;
    let x = grid.x + (component.startNode % grid.width) * grid.tileSize;
    let y = grid.y + ((component.startNode / grid.width) | 0) * grid.tileSize;
    ctx.fillStyle = '#fff';
    ctx.fillRect(
        x + 3 / 8 * grid.tileSize,
        y + 3 / 8 * grid.tileSize,
        grid.tileSize / 4,
        grid.tileSize / 4
    );
    ctx.fillStyle = '#000';
    ctx.fillRect(
        x + 7 / 16 * grid.tileSize,
        y + 7 / 16 * grid.tileSize,
        grid.tileSize / 8,
        grid.tileSize / 8
    );
};

let update = c => {
    let {pointer} = c.entities.input;
    if (!pointer.justUp) {
        return;
    }
    let {component, entities} = c;
    let grid = entities[component.grid].grid;
    let x = Math.floor((pointer.x - grid.x) / grid.tileSize);
    let y = Math.floor((pointer.y - grid.y) / grid.tileSize);
    let width = grid.width;
    let height = (grid.nodes.length / grid.width) | 0;
    if (x < 0 || x >= width || y < 0 || y >= height) {
        return;
    }
    let i = x + y * grid.width;
    if (grid.nodes[i] === 0) {
        component.endNode = i;
        // calculate path
    }
};

export default Object.freeze({
    update,
    draw
});
