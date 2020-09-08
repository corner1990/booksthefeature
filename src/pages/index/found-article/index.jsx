'use strict'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import CustomNavbar from '../../../components/navbar'
import Slogin from './slogn'
import ContentType1 from './content-type1'
import IndexCard from './components/index-card'
import { setTab } from '../../../store/actions/global'
import list from './article-list'

import './index.scss'

const mapState = state => state.global
/**
 * @desc 发现文章页
 */
class FoundArticle extends Component {
  clickLeft = () => {
    this.props.setTab(1)
  }
  /**
   * @desc 处理内容展示
   * @param {*} info 
   */
  initConent = (info, key) => {
    if(info.type === 1) return <ContentType1 info={info} key={key}></ContentType1>
    if(info.type === 2) return <IndexCard {...info} key={key} />
  }
  render() {
    let info = list[0]
    return (<View className='found-article'>
      <CustomNavbar title='发现' color='#333' clickLeft={this.clickLeft}></CustomNavbar>
      <View className='found-article-content'>
        <View className='found-article-title'>{info.title}</View>
        <Slogin></Slogin>
        {
          info.content.map((item, key) => this.initConent(item, key))
        }
      </View>
    </View>)
  }
}

export default connect(mapState, { setTab })(FoundArticle)
