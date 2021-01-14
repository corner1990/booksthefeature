import React, { useState } from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtProgres, AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
// import None from '../../components/none'
import PickerDate from '../../components/picker-date'
import { getPubTaskList, createTaskOrder } from './api'
import { dateFormat } from '../../utils/utils'
import { setTab } from '../../store/actions/global'
import './index.scss'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
const TaskDetail = props => {
  let title = '创建计划'
  let {
    task_id= '2'
  } =  Taro.Current.router
  let [ firstLoad, setFirstLoad ] = useState(true)
  let [info, setInfo] = useState({})
  let [ startDate, setStartDate ] = useState([])
  let [ price, setPrice ] = useState('')
  let [ reward, setReward ] = useState('')
  let user_remark = ''
  let {
    display_max_amount = '*',
    display_min_amount = '*'
  } = info
  const backHistory = () => {
    Taro.navigateBack()
  }
  /**
   * @desc 获取订单约束时间
   * @return { Date } 处理日期初始化时间 
   */
  const getStart = () => {
    // 处理时间 12:00 之前的第二天送货 12:00 之后后天送货
    // 节假日提前三天送货
    let time = new Date()
    let deathLine = new Date()
    deathLine.setHours(12)
    deathLine.setMinutes(0)
    deathLine.setSeconds(0)
    deathLine.setMilliseconds(0)
    let num = 1
    // if (time.getTime() > deathLine.getTime()) {
    //   num = 3
    // }
    time.setDate(time.getDate() + num)
    return time
  }
  /**
   * @desc 时间变化
   * @param {string} date 
   */
  const startTimeChange = date => {
    let value = date.detail.value
    setStartDate(value)
  }
  
  /**
   * @desc 加载数据
   */
  const loadInfo = async () => {
    let { errorCode, data } = await getPubTaskList({ task_id })
    if (errorCode == 0) {
      setInfo(data)
      firstLoad && setFirstLoad(false)
    } 
  }
  /**
   * @desc 用户备注
   * @param {*} e 
   */
  const remarkChange = e => {
    user_remark = e.detail.value
  }
  /**
   * @desc 金额变动
   * @param {@} e 
   */
  const pirceInput = e => {
    let { value } = e.detail
    let reg = /^\d+$/;
    if (!value || !reg.test(value)) {
      setReward('')
      setPrice('')
      Taro.showToast({
        icon: 'none',
        title: '请输入合法的金额'
      })
      return false
    }
    
    if (!reg.test(value)) {
      value = 0
    }
    display_max_amount -= 0
    display_min_amount -= 0
    value -= 0
    value = value > display_max_amount ? display_max_amount : value
    value = value < display_min_amount ? display_min_amount : value
    
    setPrice(value)
    setReward(value * 0.8)
  }
  // 首次加载
  if (firstLoad) {
    loadInfo()
  }

  let start = getStart()
  /**
   * @desc 创建几乎
   */
  const createTask = () => {
    let reg = /^\d+$/;
    if (!reg.test(price)) {
      Taro.showToast({
        icon: 'none',
        title: '请输入正确的梦想基金金额'
      })
      return false
    }
    display_max_amount -= 0
    display_min_amount -= 0
    if (price > display_max_amount || price < display_min_amount) {
      Taro.showToast({
        icon: 'none',
        title: `梦想金额应该在${display_min_amount} - ${display_max_amount} 之间`
      })
      return false
    }
    let params = {
      user_remark,
      bet_amount: price,
      start_date: startDate.replace(/\-/g, ''),
      task_id
    }
    setCreateReq(params)
  }
  /**
   * @desc 发送请求
   * @param {*} params 
   */
  const setCreateReq = async params => {
    let { errorCode, data } = await createTaskOrder(params)
    if (errorCode == 0) {
      let { task_order_sn } = data
      props.setTab(2)
      Taro.navigateTo({url: '/pages/index/index'})
    }
  }

  // placholer
  let placeholder = `请输入${display_min_amount} - ${display_max_amount} 元梦想基金`
  return <View className='create-task-wrap'>
     <CustomNavBar
        title={title}
        clickLeft={backHistory}
      />
    <View className='content'>
      <View className='line'>
        <View className='line-title'>计划名称</View>
        <View className='line-input-wrap'>
          {/* <Input className='input'
            placeholder='请输入计划名称'
            value={}
            readonly
          /> */}
          <View className='taskTitle'>{info.task_name}</View>
        </View>
      </View>
      <View className='line'>
        <View className='line-title'>计划描述</View>
        <View className='line-input-wrap'>
          {/* <Textarea className='input textarea' placeholder='请输入计划描述' /> */}
          <View className='taskDesc'>
            { info.task_desc }
          </View>
        </View>
      </View>
      <View className='line'>
        <View className='line-title'>计划备注</View>
        <View className='line-input-wrap'>
          <Textarea
            className='input textarea'
            placeholder='请输入计划描述'
            onChange={remarkChange}
          />
        </View>
      </View>
      <View className='line'>
        <View className='line-title'>计划时间周期</View>
        <View className='line-input-wrap line-time-wrap'>
          <PickerDate
            onChange={startTimeChange}
            start={dateFormat(start, 'YYYY-mm-dd')} 
            value={start}
          />
          开始时间：
          <Input
            className='input'
            placeholder='请输选择开始时间'
            readonly
            value={startDate}
          />
        </View>
        {/* <View className='line-input-wrap line-time-wrap'>
        <PickerDate
            onChange={endTimeChange}
            start={dateFormat(start, 'YYYY-mm-dd')} 
            value={endDate}
          />
          终止时间：<Input className='input' placeholder='请输选择终止时间' readonly />
        </View> */}
      </View>
      <View className='line'>
        <View className='line-title'>梦想基金</View>
        <View className='line-input-wrap line-time-wrap'>
          梦想金额：
          <Input
            className='input'
            placeholder={placeholder}
            onInput={pirceInput}
            value={price}
          />
        </View>
        <View className='line-input-wrap line-time-wrap'>
          预估奖励：<View className='input'>{reward ? `预计可的奖励${reward}元` : ''}</View>
        </View>
      </View>
    </View>
    <View className='AddBtnWrap'>
      <AtButton type='primary' onClick={createTask}>创建计划</AtButton>
    </View>
  </View>
}


export default connect(mapState, { setTab })(TaskDetail)
