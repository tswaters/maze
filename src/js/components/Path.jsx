
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {NORTH, SOUTH, EAST, WEST} from '../lib/maze'
import {canvas} from '../../less/canvas'

class Path extends Component {

  static propTypes = {
    path: PropTypes.array,
    start: PropTypes.object,
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
    const {start, path, stats: {width, height, padding, windowWidth, windowHeight, offsetX, offsetY}} = this.props
    this.canvas.width = windowWidth + padding
    this.canvas.height = windowHeight + padding

    const ctx = this.canvas.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(start.x * width + width / 2 + offsetX, start.y * height + height / 2 + offsetY)
    ctx.strokeStyle = 'red'
    for (const {x, y, direction} of path) {
      const xpos = x * width + offsetX
      const ypos = y * height + offsetY
      switch (direction) {
        case NORTH: ctx.lineTo(xpos + width / 2, ypos); break
        case SOUTH: ctx.lineTo(xpos + width / 2, ypos + height); break
        case EAST: ctx.lineTo(xpos + width, ypos + height / 2); break
        case WEST: ctx.lineTo(xpos, ypos + height / 2); break
      }
    }
    ctx.stroke()
  }

  render () {
    return <canvas className={cx(canvas)} ref={_ref => this.canvas = _ref} />
  }
}

const mapDispatchToProps = createSelector([
  state => state.path,
  state => state.start,
  state => state.stats
], (
  path,
  start,
  stats
) => ({
  path,
  start,
  stats
}))

export default connect(mapDispatchToProps)(Path)
