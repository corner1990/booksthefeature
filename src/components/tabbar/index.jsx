import React from 'react'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
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
  const createTask = () => {
    Taro.navigateTo({ url: '/pages/taskList/index' })
  }
  /**
   * @desc 处理tab item
   */
  const getTab = () => {
    let { tabIndex } = props
    let home = tabList[0]
    let my = tabList[2]
    return [
      (<View
        key='1'
        className={['tab-item', home.active.includes(tabIndex) ? 'active' : '']}
        onClick={() => handleClick(0)} 
      >
        <AtIcon value={home.iconType} size='20' className='tab-item-icon'></AtIcon>
        <View>{ home.title }</View>
      </View>),
      (<View
        key='2'
        className={['tab-item']}
        onClick={createTask} 
      >
        <AtIcon
          value='add'
          size='20'
          color='#00b4fc'
          className='tab-item-icon tab-item-icon-add '
        ></AtIcon>
      </View>),
      (<View
        key='3'
        className={['tab-item', my.active.includes(tabIndex) ? 'active' : '']}
        onClick={() => handleClick(2)} 
      >
        <AtIcon value={my.iconType} size='20' className='tab-item-icon'></AtIcon>
        <View>{ my.title }</View>
      </View>),
    ]
    

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
    
  }
    return (
      <View className='custom-tabbar-wrap' id='custom-tabbar-wrap'>
        { getTab() }
      </View>
    )
}

export default connect(mapState, { setTab })(Index)
