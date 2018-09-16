
import React, {Component} from 'react'
import cx from 'classnames'
import {container} from '../../less/container'

class Container extends Component {
  render () {
    return (
      <div className={cx(container)}>
        <p>Hello World!</p>
      </div>
    )
  }
}

export default Container
