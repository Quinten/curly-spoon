let draw = c => {
    let {component, entities, ctx} = c;
    let grid = entities[component.grid].grid;
    component.path.forEach(n => {
        let x = grid.x + (n % grid.width) * grid.tileSize;
        let y = grid.y + ((n / grid.width) | 0) * grid.tileSize;
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
    });
};

let neighbours = [
    {x: 0, y: -1},
    {x: -1, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 1}
];

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
        let ex = (i % width);
        let ey = (i / width) | 0;
        // calculate path
        let nodes = grid.nodes.map((w, p) => {
            return {p, w, f: 0, g: 0, h: 0};
        });
        let openList = [];
        let closedList = [];
        openList.push(nodes[component.startNode]);
        while (openList.length > 0) {
            openList.sort((a, b) => a.f - b.f);
            let currentNode = openList.shift();
            closedList.push(currentNode);
            if (currentNode.p === component.endNode) {
                // build path
                let path = [];
                let node = currentNode;
                let p = node.p;
                path.push(p);
                while (p !== component.startNode) {
                    node = node.parent;
                    p = node.p;
                    path.unshift(p);
                }
                component.path = path;
                component.startNode = component.endNode;
                return;
            }
            let px = (currentNode.p % width);
            let py = (currentNode.p / width) | 0;
            for (let r = 0; r < neighbours.length; r = r + 1) {
                let ax = px + neighbours[r].x;
                if (ax < 0 || ax >= width) {
                    continue;
                }
                let ay = py + neighbours[r].y;
                if (ay < 0 || ay >= height) {
                    continue;
                }
                let child = nodes[ax + ay * width];
                if (
                    child.w === 1 ||
                    closedList.indexOf(child) > -1
                ) {
                    continue;
                }
                let g = currentNode.g + 1;
                let h = Math.sqrt(
                    (ax - ex) * (ax - ex) +
                    (ay - ey) * (ay - ey)
                );
                let f = child.g + child.h;
                if (openList.indexOf(child) > -1) {
                    if (child.f > f) {
                        child.f = f;
                        child.g = g;
                        child.h = h;
                        child.parent = currentNode;
                    }
                } else {
                    child.f = f;
                    child.g = g;
                    child.h = h;
                    child.parent = currentNode;
                    openList.push(child);
                }
            }
        }
    }
};

export default Object.freeze({
    update,
    draw
});
