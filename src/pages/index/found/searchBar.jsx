import React, { Component } from 'react'
import { AtSearchBar } from 'taro-ui'

import "taro-ui/dist/style/components/search-bar.scss";
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/icon.scss";

export default class Index extends Component {
  state = {
    value: ''
  }
  
  onChange (value) {
    this.setState({
      value
    })
  }
  render () {
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <AtSearchBar
        value={this.state.value}
        onChange={this.onChange.bind(this)}
      />
    )
  }
}