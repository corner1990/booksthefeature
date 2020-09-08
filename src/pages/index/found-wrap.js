import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import CustomNavBar from '../../components/navbar'
// import SearchBar from './found/searchBar'
import Found from './found/found'
import Article from './article' // 文章列表页


export default class Index extends Component {
  state= {
    current: 0,
    tabList: [
      {
        title: '发现'
      },
      {
        title: '秒杀'
      },
      {
        title: '直播'
      },
      {
        title: '文章'
      },
      {
        title: '积分'
      }
    ]
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  /**
   * @desc 切换tab
   * @param {*} current 
   */
  tabChange = current => {
    this.setState({
      current
    })
    
  }
  render () {
    let { current, tabList } = this.state
    let { tabChange } = this
    return (
      <View className='found-wrap'>
        <CustomNavBar title='发现' />
        {/* <SearchBar className='found-search' /> */}
        
        <AtTabs
          current={current}
          tabList={tabList}
          onClick={tabChange}
        >
          <AtTabsPane current={this.state.current} index={0} >
            <Found></Found>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>秒杀的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>直播的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <Article></Article>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={4}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>积分的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
