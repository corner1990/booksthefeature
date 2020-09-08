import React from 'react'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { connect } from 'react-redux'
import './index.scss'
import { setTab } from '../../store/actions/global'

const mapState = state => state.global

const Index = props => {

  // activelist 数字对应的是index组件中components的标
  const tabList = [
    { title: '首页', iconType: 'home', active: [0]},
    { title: '发现', iconType: 'eye', active: [1, 4, 5]},
    { title: '我的', iconType: 'user', active: [ 2, 3]}
  ]
  const handleClick =  (value) => {
    props.setTab(value)
  }
  
  /**
   * @desc 处理tab item
   */
  const getTab = () => {
    let { tabIndex } = props
    return tabList.map((item, key) => {
      let title = ''
      if (item.active.includes(tabIndex)) {
        title = item.title
      }
      // 处理返回数据
      return (<View
        key={key}
        className='tab-item'
        onClick={() => handleClick(key)} 
      >
        <AtIcon value={item.iconType} size='20' color='#FFF'></AtIcon>
        { title  ? <View  className='tab-text'>{ title }</View> : null }
      </View>)

      // return (<View
      //   key={key}
      //   className='tab-item'
      //   onClick={() => handleClick(key)} 
      // >
      //   <AtIcon value={item.iconType} size='20' color='#FFF'></AtIcon>
      //   <View  className='tab-text'>
      //     { item.title }
      //   </View>
      // </View>)
    })
  }
    return (
      <View className='custom-tabbar-wrap' id='custom-tabbar-wrap'>
        { getTab() }
      </View>
    )
}

export default connect(mapState, { setTab })(Index)
