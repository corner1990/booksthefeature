import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image,  } from '@tarojs/components'
import { AtIcon, AtToast } from 'taro-ui'
import { connect } from 'react-redux'
import CustomNavBar from '../../components/navbar'
import { setTab } from '../../store/actions/global'

import HomePageComponents from './user/homePageComponents'
import './user/index.scss'

const mapState = state => state.global

class Index extends Component {

  state = {
    isOpened: false,
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  toEndorsement = () => {
    this.props.setTab(3)
  }

  toOrderList = ()=>{
    Taro.navigateTo({ url: '/pages/orderList/index'})
  }

  toCollection =()=>{
    Taro.navigateTo({ url: '/pages/collection/index'})
  }

  toSubscribe =()=>{
    Taro.navigateTo({ url: '/pages/subscribe/index'})
  }


  handleToast=()=>{
    this.setState({ isOpened:true })
  }

  render() {
    let src = 'https://ipxcdn.jfshare.com/ipxmall/avatar/1124addfcd0cec4ae8db434154d8162a.jpg'
    let srcLogo = 'https://ipxcdn.jfshare.com/ipxmall/6ce565e43f93c837395add8da8334012'

    let {isOpened}=this.state;

    return (
      <View className='my'>
        <CustomNavBar title='我的' />
        <View className='header'>
          <View className='header-icon-wrap'>
            <Image src={src} className='avatar' />
          </View>
          <View className='header-text-wrap'>
            <View>
              <View className='info-num'>110</View>
              <View className='info-text'>代言</View>
            </View>
            <View>
              <View className='info-num'>4000</View>
              <View className='info-text'>积分</View>
            </View>
            <View>
              <View className='info-num'>0.00</View>
              <View className='info-text'>钱包</View>
            </View>
          </View>
        </View>

        <View className='clear'>
          <View className='logo-text-wrap'>
            <Image src={srcLogo} className='logo' />
            <View className='line'></View>
          </View>
        </View>

        <View className='order-wrap'>
          <View className='order-title'>
            <Text className='my-order'>我的订单</Text>
            <Text className='my-wallet'>我的钱包 ></Text>
          </View>
          <View className='order-centent'>
            <View className='icon-wrap'>
              <AtIcon value='shopping-bag' size='24' onClick={()=>{this.handleToast()}} ></AtIcon>
              <View className='info-title'>积分兑换</View>
            </View>
            <View className='icon-wrap'>
              <AtIcon value='shopping-bag' size='24' onClick={()=>{this.handleToast()}} ></AtIcon>
              <View className='info-title'>积分支付</View>
            </View>
            <View className='icon-wrap' onClick={()=>{this.handleToast()}}>
              <AtIcon value='shopping-bag' size='24' ></AtIcon>
              <View className='info-title'>店内活动</View>
            </View>
            <View className='icon-wrap' onClick={()=>{this.toOrderList()}}>
              <AtIcon value='shopping-bag' size='24' ></AtIcon>
              <View className='info-title'>商场订单</View>
            </View>
          </View>
        </View>

        <View>
          <View className='me'>
            <View className='bookcase' onClick={()=>{this.toCollection()}}>
              <AtIcon value='shopping-bag' size='24' ></AtIcon>
              <View>我的收藏</View>
            </View>
            <View className='line'></View>
            <View className='magazine' onClick={()=>{this.toSubscribe()}}>
              <AtIcon value='folder' size='24' ></AtIcon>
              <View>我的订阅</View>
            </View>
          </View>
        </View>

        <HomePageComponents icon1='iphone' icon2='message' title1='代言中心' title2='系统设置' click1={this.toEndorsement} />

        <AtToast isOpened={isOpened} text="功能开发中，敬请期待！"></AtToast>
      </View>
    )
  }
}

export default connect(mapState, { setTab })(Index)