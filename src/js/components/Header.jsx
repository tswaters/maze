
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'

import {header, options, input, label, button} from '../../less/forms'

class Header extends PureComponent {

  static propTypes = {
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    restart: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      rows: props.rows,
      cols: props.cols
    }
  }

  handleChange (prop) {
    return e => this.setState({[prop]: e.target.value})
  }

  handleSubmit () {
    localStorage.setItem('rows', this.state.rows)
    localStorage.setItem('cols', this.state.cols)
    this.props.restart(this.state)
  }

  render () {

    return (
      <header>
        <h1 className={cx(header)}>{'Maze'}</h1>

        <div className={cx(options)}>
          <label className={cx(label)} htmlFor="rows">
            {'Rows'}
          </label>
          <input
            className={cx(input)}
            value={this.state.rows}
            onChange={this.handleChange('rows')}
            id="rows"
          />
          <label className={cx(label)} htmlFor="cols">
            {'Cols'}
          </label>
          <input
            className={cx(input)}
            value={this.state.cols}
            onChange={this.handleChange('cols')}
            id="cols"
          />
          <button className={cx(button)} onClick={this.handleSubmit}>
            🔄︎
          </button>
        </div>

      </header>
    )

  }
}

const mapStateToProps = createSelector([state => state.stats], stats => stats)

const mapDispatchToProps = dispatch => ({
  restart: ({rows, cols}) => dispatch({type: 'init', rows, cols})
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
