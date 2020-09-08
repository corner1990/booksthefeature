import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { connect } from 'react-redux'
import { setTab } from '../../../store/actions/global'
import Backhistory from '../../../components/backhistory'

import './index.scss'

const mapState = state => state.global
class Index extends Component {

  state={
    navHeight:80
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  clickLeft = () => {
    this.props.setTab(2)
  }
  getHeadHeight = num=>{
    this.setState({navHeight:num})
  }

  render() {
    let src = 'https://ipxcdn.jfshare.com/ipxmall/avatar/1124addfcd0cec4ae8db434154d8162a.jpg'
    let srcLogo = 'https://ipxcdn.jfshare.com/ipxmall/6ce565e43f93c837395add8da8334012'
    let {navHeight}=this.state

    return (
      <View className='endorsement'>
        <Backhistory title='代言中心' clickLeft={this.clickLeft} isFixed={true} getHeight={this.getHeadHeight}></Backhistory>
        <View className='content'>
          <View className='endorsement-conent' style={{paddingTop:navHeight+10}}>
            <View className='header'>
              <View className='header-icon-wrap'>
                <Image src={src} className='avatar' />
              </View>
              <View className='logo-text-wrap'>
                <Image src={srcLogo} className='logo' />
                <View className='line'></View>
                <View className='logo-text'>开启时尚女性的生活态度</View>
              </View>
            </View>

            <View className='money-wrap'>
              <View className='money-title'>
                <Text className='my-money'>可提现金额</Text>
                <Text className='money-num'>￥688.88</Text>
              </View>
              <View className='money-btn'>去提现</View>
            </View>

            <View className='income-wrap'>
              <View className='income-item'>
                <View>累计收益</View>
                <View className='income-num'>￥888.88</View>
              </View>
              <View className='income-item'>
                <View>待结算</View>
                <View className='income-num'>￥888.88</View>
              </View>
            </View>

            <View>
              <View className='me'>
                <View className='bookcase'>
                  <View>66</View>
                  <View>推广订单</View>
                </View>
                <View className='line'></View>
                <View className='magazine'>
                  <View>168</View>
                  <View>绑定客户</View>
                </View>
              </View>
            </View>

            <View className='link-wrap'>
              <AtIcon value='shopping-bag' size='24'></AtIcon>
              <View className='info-wrap'>
                <View className='text-title'>推广商品中心</View>
                <View className='text-des'>对外分享商品，赚取推广提成</View>
              </View>
              <AtIcon value='chevron-right' size='22' className='arrow' ></AtIcon>
            </View>

            <View className='link-wrap'>
              <AtIcon value='shopping-bag' size='24'></AtIcon>
              <View className='info-wrap'>
                <View className='text-title'>邀请下级推广员</View>
                <View className='text-des'>邀请好友成为下级推广员，赚取邀请奖励</View>
              </View>
              <AtIcon value='chevron-right' size='22' className='arrow' ></AtIcon>
            </View>
          </View>

        </View>
      </View>
    )
  }
}

export default connect(mapState, { setTab })(Index)
