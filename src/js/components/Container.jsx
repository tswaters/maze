
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {connect} from 'react-redux'

import {NORTH, SOUTH, EAST, WEST} from '../lib/maze'
import {container} from '../../less/container'
import Header from './Header'
import Maze from './Maze'
import Cursor from './Cursor'
import Path from './Path'
import End from './End'

class Container extends Component {

  static propTypes = {
    resize: PropTypes.func.isRequired,
    moveUp: PropTypes.func.isRequired,
    moveDown: PropTypes.func.isRequired,
    moveLeft: PropTypes.func.isRequired,
    moveRight: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.attached = false
    this.handleWindowResize = this.handleWindowResize.bind(this)
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleWindowResize)
    document.addEventListener('keydown', this.handleDocumentKeyDown)
    this.attached = true
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
    document.removeEventListener('keydown', this.handleDocumentKeyDown)
  }

  handleDocumentKeyDown (ev) {
    switch (ev.keyCode) {
      case 38: case 87: return this.props.moveUp()
      case 40: case 83: return this.props.moveDown()
      case 37: case 65: return this.props.moveLeft()
      case 39: case 68: return this.props.moveRight()
    }
  }

  handleWindowResize () {
    this.props.resize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    })
  }

  render () {
    return (
      <div className={cx(container)}>
        <Header />
        <Maze />
        <Cursor />
        <End />
        <Path />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  resize: ({width, height}) => dispatch({type: 'resize', width, height}),
  moveUp: () => dispatch({type: 'move', direction: NORTH}),
  moveDown: () => dispatch({type: 'move', direction: SOUTH}),
  moveLeft: () => dispatch({type: 'move', direction: WEST}),
  moveRight: () => dispatch({type: 'move', direction: EAST})
})

export default connect(null, mapDispatchToProps)(Container)
