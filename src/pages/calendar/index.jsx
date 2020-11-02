import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import Header from './components/header'
import Calendar from './components/calendar'
import ProductList from './components/product-list'
import { getUserFlowerCalendar } from './api'
import './index.scss'


/**
 * @desc 日历页面
 */
class CalendarWrap extends Component {
  state = {
    list: [],
    title: `${new Date().getFullYear()}.${new Date().getMonth()+1}`,
    selected: ''
  }
  componentDidMount() {
    this.loadInfo()
  }
  /**
   * @desc 返回
   */
  backHistory = () => Taro.navigateBack()
  /**
   * @desc 获取数据
   */
  loadInfo = async () => {
    let { errorCode, data } = await getUserFlowerCalendar()
    if (errorCode === 0) {
      this.setState({
        list: data.calendar_list
      })
    }
  }
  /**
   * @desc 设置日期
   * @param { string } date 时间字符串
   */
  setDate = date => {
    let arr = date.split('-')
    let title = `${arr[0]}.${parseInt(arr[1])}`
    this.setState({
      title
    })
  }
  /**
   * @desc 更新数据
   * @param {*} params 
   */
  update = params => {
    this.setState(params)
  }
  render() {
    let { setDate } = this
    let { title, list, selected } = this.state
    return (<View className='CalendarWrap'>
      <CustomNavBar
        title='收花日历'
        clickLeft={this.backHistory}
      />
      <Header
        title={title}
      />
      <Calendar
        setDate={setDate}
        update={this.update}
        list={list}
      />
      <ProductList selected={selected} />
      {/* // TODO: 需要添加一个tag提示 */}
    </View>)
  }
}

export default CalendarWrap