import React from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './newProductList.scss'

class Welcome extends React.Component {
  constructor() {
    super()
    // Taro.removeStorageSync('$well')
    let isShow = Taro.getStorageSync('$well')
    let styleStr = isShow ? 'hide clear' : ''
    this.state = {
      styleStr
    }
    if(!isShow) {
      this.hide()
    }
  }
  // 隐藏
  hide = () => {
    setTimeout(() => {
      this.setState({
        styleStr: 'hide'
      })
      Taro.setStorageSync('$well', '1')
    }, 4000)
    setTimeout(() => {
      this.setState({
        styleStr: 'hide clear'
      })
      Taro.setStorageSync('$well', '1')
    }, 5000)
  }
  render() {
    let { styleStr } = this.state
    return (<View class={['WelComeWrap', styleStr]}>
      <Image
        className='welcomeImg'
        src='https://ipxcdn.jfshare.com/system/admin/9754ed4793a864cce854404b623c36dd.png'
        mode='aspectFill'
      />
    </View>)
    }
  }

export default Welcome
