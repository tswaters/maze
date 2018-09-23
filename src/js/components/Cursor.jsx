
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {canvas} from '../../less/canvas'

class Cursor extends Component {

  static propTypes = {
    cursor: PropTypes.object,
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
    const {cursor, stats: {width, height, padding, windowWidth, windowHeight, offsetX, offsetY}} = this.props
    this.canvas.width = windowWidth + padding
    this.canvas.height = windowHeight + padding
    const ctx = this.canvas.getContext('2d')
    const xpos = cursor.x * width + offsetX + width / 2
    const ypos = cursor.y * height + offsetY + height / 2
    ctx.font = `${height / 2}px sans-serif`
    ctx.textAlign= 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('\uD83C\uDFC3', xpos, ypos, width - 4)
  }

  render () {
    return <canvas className={cx(canvas)} ref={_ref => this.canvas = _ref} />
  }
}

const mapDispatchToProps = createSelector([
  state => state.cursor,
  state => state.stats
], (
  cursor,
  stats
) => ({
  cursor,
  stats
}))

export default connect(mapDispatchToProps)(Cursor)
