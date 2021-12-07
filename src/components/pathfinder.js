let update = c => {
    let {pointer} = c.entities.input;
    if (!pointer.justUp) {
        return;
    }
    let {component, entity} = c;
    let grid = c.entities[component.grid].grid;
    let x = Math.floor((pointer.x - grid.x) / grid.tileSize);
    let y = Math.floor((pointer.y - grid.y) / grid.tileSize);
    let width = grid.width;
    let height = (grid.nodes.length / grid.width) | 0;
    if (x < 0 || x >= width || y < 0 || y >= height) {
        return;
    }
    let i = x + y * grid.width;
    console.log(grid.nodes[i]);
};

export default Object.freeze({
    update
});
