export default {
    system: {
        states: ['game', 'level']
    },
    game: {
        state: {
            entities: ['viewport', 'input']
        }
    },
    viewport: {
        resize: {
            minWidth: 288,
            minHeight: 288
        }
    },
    input: {
        pointer: {}
    },
    map: {
        grid: {
            width: 6,
            tileSize: 48,
            nodes: [
                0, 0, 0, 0, 0, 0,
                0, 1, 0, 0, 1, 0,
                0, 1, 1, 0, 1, 0,
                0, 0, 1, 0, 0, 0,
                0, 0, 1, 0, 1, 1,
                0, 0, 0, 0, 0, 0
            ]
        }
    },
    spoon: {
        pathfinder: {
            grid: 'map',
            startNode: 30
        }
    },
    level: {
        state: {
            entities: ['map', 'spoon']
        }
    }
};
