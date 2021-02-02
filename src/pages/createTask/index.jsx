import React, { useState } from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtButton } from 'taro-ui'
import Taro, { render } from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
// import None from '../../components/none'
import PickerDate from '../../components/picker-date'
import { getPubTaskList, createTaskOrder, createOrderPayInfo } from './api'
import { dateFormat } from '../../utils/utils'
import { setTab } from '../../store/actions/global'
import './index.scss'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
class TaskDetail extends React.Component {
  
  // let [info, setInfo] = useState({})
  // let [ startDate, setStartDate ] = useState('')
  // let [ price, setPrice ] = useState('')
  // let [ card_no, setCardNo ] = useState('')
  // let [ task_order_name, setTaskOrderName ] = useState('')
  // let [ card_bank, setCardBank ] = useState('')
  // let [ card_owner, setCardOwner ] = useState('')
  // let [ reward, setReward ] = useState('')
  // let [ user_remark, setUserRemark ] = useState('')
  
  state = {
    info: {
      task_name: '',
      task_desc: ''
    },
    startDate: '',
    price: '',
    card_no: '',
    task_order_name: '',
    card_bank: '',
    reward: '',
    user_remark: ''
  }
  componentWillMount() {
    this.loadInfo()
  }
  backHistory = () => {
    Taro.navigateBack()
  }
  /**
   * @desc 获取订单约束时间
   * @return { Date } 处理日期初始化时间 
   */
  getStart = () => {
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
  startTimeChange = date => {
    let value = date.detail.value
    // setStartDate(value)
    this.setState({
      startDate: value
    })
  }
  
  /**
   * @desc 加载数据
   */
  loadInfo = async () => {
    let {
      task_id='2'
    } =  Taro.Current.router.params
    let { errorCode, data } = await getPubTaskList({ task_id })
    if (errorCode == 0) {
      this.setState({ info: data })
    } 
  }
  /**
   * @desc 用户备注
   * @param {*} e 
   */
  remarkChange = e => {
    let user_remark = e.detail.value
    this.setState({ user_remark })
    // setUserRemark(e.detail.value)
  }
  /**
   * @desc 金额变动
   * @param {@} e 
   */
  pirceInput = e => {
    let {
      display_max_amount = '0',
      display_min_amount = '0',
      reward_rate = 1
    } = this.state.info
    let { value } = e.detail
    let reg = /^\d+$/;
    if (!value || !reg.test(value)) {
      
      this.setState({
        reward: '',
        price: ''
      })
      Taro.showToast({
        icon: 'none',
        title: '请输入合法的金额'
      })
      return false
    }
    
    if (!reg.test(value)) {
      value = 0
    }
    display_max_amount = display_max_amount - 0
    display_min_amount = display_min_amount - 0
    value = value - 0
    reward_rate = (reward_rate - 0) / 100
    
    if (value > display_max_amount) {
      value = display_max_amount
    } else if (value < display_min_amount) {
      value = display_min_amount
    }
    
    this.setState({
      reward: value * reward_rate,
      price: value
    })
  }
  /**
   * @desc 创建几乎
   */
  createTask = () => {
    let {
      display_max_amount = '*',
      display_min_amount = '*',
    } = this.state.info
    let {
      task_order_name,
      startDate,
      price,
      card_bank,
      card_no,
      card_owner,
      user_remark
    } = this.state
    let {
      task_id='2'
    } =  Taro.Current.router.params

    let reg = /^\d+$/;
    if (!task_order_name) {
      Taro.showToast({
        icon: 'none',
        title: '请输入计划名称'
      })
      return false
    }
    if (!startDate) {
      Taro.showToast({
        icon: 'none',
        title: '请选择任务开始日期'
      })
      return false
    }
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
    if (!card_bank || !card_no || !card_owner) {
      Taro.showToast({
        icon: 'none',
        title: '奖金接受人信息不完整，会影响奖金领取，请补全信息'
      })
      return false
    }
    let params = {
      user_remark,
      card_bank,
      card_no,
      card_owner,
      task_order_name,
      bet_amount: price,
      start_date: startDate.replace(/\-/g, ''),
      task_id
    }
    this.setCreateReq(params)
  }

  /**
   * @desc 发送请求
   * @param {*} params 
   */
  setCreateReq = async params => {
    let { errorCode, data } = await createTaskOrder(params)
    if (errorCode == 0) {
      let { task_order_sn } = data
      this.toPay({ task_order_sn })
      // props.setTab(2)
      // Taro.navigateTo({url: '/pages/order-result/index'})
    }
  }
  /**
   * @desc 发起支付
   * @param {*} params 
   */
  toPay = async (params) => {
    let { price } = this.state
    let url = `/pages/order-result/index?task_order_sn=${params.task_order_sn}&price=${price}`
  
    let { errorCode, data} = await  createOrderPayInfo({'pay_type': 5, ...params})
    if (errorCode === 0) {
      Taro.requestPayment({
        ...data,
        signType: 'MD5',
        success () {
          url = `${url}&pay_status=1`
          Taro.navigateTo({ url })
        },
        fail () {
          url = `${url}&pay_status=0`
          Taro.navigateTo({ url })
        }
      })
    }
    
  }
  // placholer
  render() {
    let {
      
      task_order_name,
      startDate,
      price,
      reward,
      card_no,
      card_owner,
      card_bank
    } = this.state
    let { info } = this.state
    let {
      display_max_amount = '*',
      display_min_amount = '*',
    } = info
    let start = this.getStart()
    let title = '创建未来事件'
    let placeholder = `请输入${display_min_amount} - ${display_max_amount} 元梦想基金`
    return (<View className='create-task-wrap'>
      <CustomNavBar
          title={title}
          clickLeft={this.backHistory}
        />
      <View className='content'>
        <View className='line'>
          <View className='line-title'>计划模版</View>
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
          <View className='line-title'>未来计划</View>
          <View className='line-input-wrap'>
            <Input className='input'
              placeholder='请输入计划名称'
              value={task_order_name}
              onInput={e => {
                let {value} = e.detail
                this.setState({ task_order_name: value })
                // setTaskOrderName(value)
              }}
            />
          </View>
        </View>
        <View className='line'>
          <View className='line-title'>计划备注</View>
          <View className='line-input-wrap'>
            <Textarea
              className='input textarea'
              placeholder='请输入计划描述'
              onChange={this.remarkChange}
            />
          </View>
        </View>
        <View className='line'>
          <View className='line-title'>计划时间周期</View>
          <View className='line-input-wrap line-time-wrap'>
            <PickerDate
              onChange={this.startTimeChange}
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
              onInput={this.pirceInput}
              value={price}
            />
          </View>
          <View className='line-input-wrap line-time-wrap'>
            预估奖励：<View className='input' style="box-shadow: none;">{reward ? `预计可的奖励${reward}元` : ''}</View>
          </View>
        </View>
        <View className='line'>
          <View className='line-title'>奖励发放信息</View>
          <View className='line-input-wrap line-time-wrap'>
            姓名：
            <Input
              className='input'
              placeholder='请输入银行卡姓名'
              onInput={e => {
                let {value} = e.detail
                // setCardOwner(value)
                this.setState({ card_owner: value })
              }}
              value={card_owner}
            />
          </View>
          <View className='line-input-wrap line-time-wrap'>
            银行：<Input
              className='input'
              placeholder='请输入银行卡归属行'
              onInput={e => {
                let { value } = e.detail
                // setCardBank(value)
                this.setState({ card_bank: value })
              }}
              value={card_bank}
            />
          </View>
          <View className='line-input-wrap line-time-wrap'>
            卡号：<Input
              className='input'
              placeholder='请输入银行卡卡号'
              onInput={e => {
                let {value} = e.detail
                // setCardNo(value)
                this.setState({ card_no: value })
              }}
              value={card_no}
            />
          </View>
        </View>
        
      </View>
      
      <View className='AddBtnWrap'>
        <AtButton type='primary' onClick={this.createTask}>创建计划</AtButton>
      </View>
    </View>)
    }
}


export default connect(mapState, { setTab })(TaskDetail)
