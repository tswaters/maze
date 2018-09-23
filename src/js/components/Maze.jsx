
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {canvas} from '../../less/canvas'
import {NORTH, SOUTH, EAST, WEST} from '../lib/maze'

class Maze extends Component {

  static propTypes = {
    maze: PropTypes.object,
    stats: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      padding: PropTypes.number.isRequired,
      windowWidth: PropTypes.number.isRequired,
      windowHeight: PropTypes.number.isRequired,
      offsetX: PropTypes.number.isRequired,
      offsetY: PropTypes.number.isRequired
    }).isRequired
  }

  constructor (props) {
    super(props)
    this.canvas = null
  }

  componentDidMount() {
    this.updateCanvas()
  }

  componentDidUpdate () {
    this.updateCanvas()
  }

  updateCanvas () {
    const {maze, stats: {width, height, padding, windowWidth, windowHeight, offsetX, offsetY}} = this.props
    this.canvas.width = windowWidth + padding
    this.canvas.height = windowHeight + padding
    const ctx = this.canvas.getContext('2d')
    ctx.beginPath()
    for (const [, {walls, x, y}] of Object.entries(maze)) {
      const xpos = 1 + offsetX + x * width
      const ypos = 1 + offsetY + y * height
      if (walls & NORTH) { ctx.moveTo(xpos, ypos); ctx.lineTo(xpos + width, ypos) }
      if (walls & SOUTH) { ctx.moveTo(xpos, ypos + height); ctx.lineTo(xpos + width, ypos + height) }
      if (walls & EAST) { ctx.moveTo(xpos + width, ypos); ctx.lineTo(xpos + width, ypos + height) }
      if (walls & WEST) { ctx.moveTo(xpos, ypos); ctx.lineTo(xpos, ypos + height) }
    }
    ctx.stroke()
  }

  render () {
    return <canvas className={cx(canvas)} ref={_ref => this.canvas = _ref} />
  }
}

const mapStateToProps = createSelector([
  state => state.maze,
  state => state.stats
], (
  maze,
  stats
) => ({
  maze,
  stats
}))

export default connect(mapStateToProps)(Maze)
