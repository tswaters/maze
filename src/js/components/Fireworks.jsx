
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Fireworks from 'fireworks-canvas'

import {fireworks} from '../../less/fireworks'

class FireworksComponent extends PureComponent {

  static propTypes = {
    active: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props)
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this)
  }

  componentDidMount () {
    this.fireworks = new Fireworks(this.container, {explosionChance: 0.02})
    document.addEventListener('keydown', this.handleDocumentKeyDown)
    this.fireworks.start()
  }

  componentDidUpdate () {
    if (this.props.active) {
      this.fireworks.start()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleDocumentKeyDown)
    this.fireworks.stop()
  }

  handleDocumentKeyDown (ev) {
    if (ev.keyCode === 27) { this.fireworks.stop() }
  }

  render () {
    return (
      <div className={cx(fireworks)} ref={_ref => this.container = _ref} />
    )
  }
}

export default FireworksComponent
