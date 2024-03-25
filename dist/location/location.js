"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLocationsOfNode = void 0;
function findLocationsOfNode(node_id, locations) {
    let result = [];
    const _findLocationsOfNode = (node_id, locations, queue) => {
        const data = locations.filter((p) => p.parent_id === node_id);
        if (data && data.length) {
            queue = data;
        }
        while (queue && queue.length) {
            const cur = queue.shift();
            result.push(cur);
            _findLocationsOfNode(cur.id, queue);
        }
    };
    _findLocationsOfNode(node_id, locations);
    return result;
}
exports.findLocationsOfNode = findLocationsOfNode;
//# sourceMappingURL=location.js.map