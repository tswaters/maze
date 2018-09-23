
export const NORTH = 0b1000
export const SOUTH = 0b0100
export const EAST  = 0b0010
export const WEST  = 0b0001
export const ALL   = 0b1111

const flip = dir =>
  [NORTH + SOUTH, EAST + WEST].reduce((memo, mask) =>
    memo || mask & dir && ~(mask & dir) & ALL & mask
  , null)

export default ({rows, cols, ...rest}) => {
  delete rest.type
  const nodes = {}

  for (let i = 0; i < cols; i++ ) {
    for (let j = 0; j < rows; j++) {
      nodes[`${i},${j}`] = {x: i, y: j, parent: null, dirs: ALL, walls: ALL}
    }
  }

  // pick a random position along the walls to start.
  let x = null
  let y = null
  const randX = parseInt(Math.random() * cols)
  const randY = parseInt(Math.random() * rows)
  switch (1 <<  Math.random() * 4) {
    case NORTH: y = 0; x = randX; break
    case SOUTH: y = rows - 1; x = randX; break
    case EAST: x = cols - 1; y = randY; break
    case WEST: x = 0; y = randY; break
  }

  const start = nodes[`${x},${y}`]

  start.distance = 0
  start.parent = start

  let last = null

  while (last != start) {
    last = link(last || start)
  }

  // figure out the node with the largest distance - that is the end
  const end =  Object.entries(nodes)
    .reduce((memo, [, value]) => [...memo, value], [])
    .sort((a, b) => a.distance < b.distance ? 1 : a.distance > b.distance ? -1 : 0)[0]

  // remove things we don't need
  for (const [, value] of Object.entries(nodes)) {
    delete value.parent
    delete value.dirs
    delete value.distance
  }

  return {
    maze: nodes,
    start,
    end,
    cursor: {x, y}
  }

  function link (node) {

    // While there are directions still unexplored
    while (node.dirs) {

      let x = node.x
      let y = node.y

      // Randomly pick one direction
      const dir = 1 <<  Math.random() * 4

      // If it has already been explored - try again
      if (~node.dirs & dir) { continue }

      // Mark direction as explored
      node.dirs &= ~dir

      // If it's not possible to go that direction - try again
      if (dir === NORTH && node.y === 0) { continue }
      if (dir === SOUTH && node.y + 1 >= rows) { continue }
      if (dir === EAST && node.x + 1 >= cols) { continue }
      if (dir === WEST && node.x === 0) { continue }

      // Increment for the given direction
      switch (dir) {
        case EAST: x = node.x + 1; break
        case SOUTH: y = node.y + 1; break
        case WEST: x = node.x - 1; break
        case NORTH: y = node.y - 1; break
      }

      // Get destination node
      const flipped = flip(dir)
      const dest = nodes[`${x},${y}`]

      // Make sure that destination node is not a wall
      // If destination is a linked node already - abort
      // otherwise adopt nodes & tear down those walls.
      if (
        node.walls & dir &&
        dest.walls & flipped &&
        dest.parent === null
      ) {

        dest.parent = node
        node.walls &= ~dir
        dest.walls &= ~flipped
        dest.distance = node.distance + 1
        return dest

      }
    }

    return node.parent
  }


}

