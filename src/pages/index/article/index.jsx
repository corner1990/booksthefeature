import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from 'react-redux'
import ArticleItem from './components/article-item'
import { setTab } from '../../../store/actions/global'


import './index.scss'

const mapState = state => state.global
class Index extends Component {

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    clickLeft = () => {
      this.props.setTab(2)
    }

    toDetail = () => {
      Taro.navigateTo({ url: '/pages/articleDetail/index'})
    }

    createItem() {
      let arr = []
      for (let i = 0; i < 7; i++) {
        arr.push(<ArticleItem key={i} />)
      }
      return arr
    }

    render() {
        let src = 'https://wx3.sinaimg.cn/mw690/008b8TwTgy1giboq2g2lmj30qk0aw16s.jpg'
        let src2 = 'https://wx3.sinaimg.cn/mw690/008b8TwTgy1gibp9swnntj302a029jrn.jpg'
        
        return (
          <View className='article'>
            {/* <CustomNavBar title='发现' /> */}
            {this.createItem()}
          </View>
        )
    }
}

export default connect(mapState, { setTab })(Index)
