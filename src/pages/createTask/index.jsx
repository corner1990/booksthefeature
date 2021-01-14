import React from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtProgres, AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
// import None from '../../components/none'
import './index.scss'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
const TaskDetail = () => {
  let title = '创建计划'
  const backHistory = () => {
    Taro.navigateBack()
  }
  return <View className='create-task-wrap'>
     <CustomNavBar
        title={title}
        clickLeft={backHistory}
      />
    <View className='content'>
      <View className='line'>
        <View className='line-title'>计划名称</View>
        <View className='line-input-wrap'>
          <Input className='input' placeholder='请输入计划名称' />
        </View>
      </View>
      <View className='line'>
        <View className='line-title'>计划描述</View>
        <View className='line-input-wrap'>
          <Textarea className='input textarea' placeholder='请输入计划描述' />
        </View>
      </View>
      <View className='line'>
        <View className='line-title'>计划时间周期</View>
        <View className='line-input-wrap line-time-wrap'>
          开始时间：<Input className='input' placeholder='请输选择开始时间' readonly />
        </View>
        <View className='line-input-wrap line-time-wrap'>
          终止时间：<Input className='input' placeholder='请输选择终止时间' readonly />
        </View>
      </View>
      <View className='line'>
        <View className='line-title'>梦想基金</View>
        <View className='line-input-wrap line-time-wrap'>
          梦想金额：<Input className='input' placeholder='请输选择起始金额' />
        </View>
        <View className='line-input-wrap line-time-wrap'>
          预估奖励：<Input className='input' placeholder='' readonly />
        </View>
      </View>
    </View>
    <View className='AddBtnWrap'>
      <AtButton type='primary' onClick={() => {}}>创建计划</AtButton>
    </View>
  </View>
}


export default connect(mapState)(TaskDetail)
