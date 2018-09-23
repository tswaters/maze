
import build_maze, {NORTH, SOUTH, EAST, WEST} from './lib/maze'

const getStats = ({windowWidth, windowHeight, padding, rows, cols}) => {
  return {
    rows,
    cols,
    windowWidth: windowWidth,
    windowHeight: windowHeight,
    width: parseInt(windowWidth / cols),
    height: parseInt(windowHeight / rows),
    offsetX: 0,
    offsetY: 0,
    padding
  }
}

const defaultState = {
  maze: {},
  cursor: {},
  stats: {padding: 10},
  path: []
}

export default (state = defaultState, action) => {

  if (action.type === 'init') {
    return {
      ...build_maze(action),
      path: [],
      stats: getStats({...state.stats, ...action})
    }
  }

  if (action.type === 'resize') {
    return {
      ...state,
      stats: getStats({...state.stats, ...action})
    }
  }

  if (action.type === 'move') {
    const {maze, cursor: {x, y}} = state
    const {direction} = action

    const current_node = maze[`${x},${y}`]
    if (current_node.walls & direction) {
      return state
    }

    const new_cursor = {x, y}

    switch (direction) {
      case NORTH: new_cursor.y -= 1; break
      case SOUTH: new_cursor.y += 1; break
      case EAST: new_cursor.x += 1; break
      case WEST: new_cursor.x -= 1; break
    }

    return {
      ...state,
      path: [...state.path, {x, y, direction}],
      cursor: new_cursor
    }
  }

  return state

}
