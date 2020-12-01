import React from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro';
import { AtTextarea, AtAccordion } from 'taro-ui'
import { connect } from 'react-redux'
import CustomNavBar from '../../components/navbar'
import ItemWrap from './components/item-card'
// import Address from '../../components/address'
import AddressCard from './components/address-card'
import PickerDate from '../../components/picker-date'
import PickerTime from '../../components/picker-time'
import ProductCard from './components/product-card'
import Switch from '../../components/switch'
import UseCoupon from './components/use-coupon'
import PriceDetail from './components/price-detail'
import Footer from './components/footer'
import { getShippingAddressList } from '../address/api';
import { setShipping, update } from '../../store/actions/shopping-cart'

import './index.scss'
import { calculateOrderPrice, createOrder, createOrderPayInfo } from './api';
import { removeFromCart } from '../shopping-cart/api';
import { dateFormat } from '../../utils/utils'
import Event from '../../utils/event'

/**
 * @desc 确认订单
 */
class ConfirmOrder extends React.Component {
  state = {
    date: '请选择配送日期',
    priceInfo: {
      discount_price: '',
      pay_price: '',
      product_total_price: '',
      shipping_price: ''
    },
    anonymous: false,
    bless: '',
    voucher_code: '',
    delivery_time_range: '请选择配送时间',
    timeList: []
    // showTimeTip: false
  }
  componentDidMount() {

    this.loadAddress()
    // 重新选择地址后更新价格
    Event.listen('calculatePrice', () => {
      this.calculatePrice()
    })
    // this.calculatePrice()
  }

  timer = 0
  backHistory = () => Taro.navigateBack()
  /**
   * @desc switch change
   * @param  {...any} args 
   */
  switchChange = (anonymous) => {
    this.setState({ anonymous })
  }
  /**
   * @desc 跳转到我的地址列表
   */
  jumpToAddress = () => {
    Taro.navigateTo({
      url: '/pages/address/index'
    })
  }
  /**
   * @desc 时间变化
   * @param {string} date 
   */
  dateChange = date => {
    let value = date.detail.value
    // let value = '2020-12-22'
    if (this.isHoliday(value)) {
      let target = new Date(`${value} 0:00:00`)
      let now = new Date('2020-12-22')
      now.setHours(0)
      now.setDate(now.getDate() + 3)
      now.setMinutes(0)
      now.setSeconds(0)
      now.setMilliseconds(0)
      // 判断时间
      if (target < now) {
        Taro.showToast({
          icon: 'none',
          title: '节假日需要提前三天预定鲜花'
        })
        return false
      }
    }
  
    this.setState({
      date: date.detail.value
    })
  }
  /**
   * @desc 时间变化
   * @param {string} date 
   */
  timeChange = (time) => {
    let { value } = time.detail
    let {  timeList } = this.state
    
    this.setState({
      delivery_time_range: timeList[value]
    })
  }
  /**
   * 
   */
  loadAddress = async () => {
    let { errorCode, data: { shipping_address_list:list=[]  }} = await getShippingAddressList()
    
    if (errorCode === 0) { 
      let addr = list.find(item => item.is_default === '1') || list[0]
      if (addr) this.props.setShipping(addr)
    }
    // 计算价格 依赖地址信息 
    this.calculatePrice()
  }
  /**
   * @desc 处理地址
   */
  getAddr = () => {
    let {
      shipping
    } = this.props
    if (shipping.province) {
      return (<AddressCard info={shipping} />)
    }
    return (<ItemWrap
      title='收获地址'
      subTitle=''
      click={this.jumpToAddress}
    />)
  }
  /**
   * @desc 计算价格
   */
  calculatePrice = async () => {
    let { product_array, shipping } = this.props
    let { voucher_code } = this.state
    product_array = product_array.map(info => {
      let { count, item_id } = info
      return { count, item_id  }
    })
    let { errorCode, data } = await calculateOrderPrice({
      product_array,
      voucher_code,
      shipping_id: shipping.id
    })
    if (errorCode === 0) {
      this.setState({
        priceInfo: data,
        timeList: data.delivery_time_range_list
      })
    }
  }
  /**
   * @description 创建订单
   */
  crateOrderFn = async () => {
    this.delSelectArr()
    let { product_array, shipping } = this.props
    let {
      voucher_code,
      date,
      anonymous,
      bless,
      delivery_time_range
    } = this.state
    if ( !shipping || !shipping.id) {
      Taro.showToast({
        icon: 'none',
        title: '请选择收获地址'
      })

      return false
    }
    if (date.includes('日期')) {
      Taro.showToast({
        icon: 'none',
        title: '请选择配送日期'
      })

      return false
    }
    if (delivery_time_range.includes('时间')) {
      Taro.showToast({
        icon: 'none',
        title: '请选择配送时间'
      })

      return false
    }
    if (this.execDate(date, delivery_time_range)) {
      Taro.showToast({
        icon: 'none',
        title: '送达时间不能早于下单时间'
      })

      return false
    }
    let anonymous_status = anonymous ? 1 : 0
    product_array = product_array.map(info => {
      let { count, item_id } = info
      return { count, item_id  }
    })
    
    date = this.getDate(date, delivery_time_range)
    
    let params = {
      product_array,
      voucher_code,
      shipping_id: shipping.id,
      delivery_timestamp: date,
      bless,
      anonymous_status,
      delivery_time_range
    }
    console.log('suhmit', params)
   
    let { errorCode, data } = await createOrder(params)
    if (errorCode === 0) {
      this.toPay(data)
    }
  }

  async toPay(params) {
    let url = `/pages/order-result/index?order_sn=${params.order_sn}`
  
    let { errorCode, data} = await  createOrderPayInfo({order_id: params.order_sn, 'pay_type': 5, ...params})
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
  /**
   * @desc 判断送货时间是否小于下单时间
   * @param {*} date 
   * @param {*} timeStr 
   */
  execDate(date, timeStr) {
    let time = new Date(date + ' ' + timeStr.split('-')[1]).getTime()
    let current = new Date().getTime()
    return current > time
  }
  /**
   * @desc 处理日期
   * @param {*} date 
   * @param {*} timeStr 
   */
  getDate = (date, timeStr) => {
    let time = new Date(date + ' ' + timeStr.split('-')[1])
    let timeOrigin = new Date(date)
    // 设置时间为18:00
    let deathLine = new Date()
    deathLine.setHours(18)
    deathLine.setMinutes(0)
    deathLine.setSeconds(0)
    deathLine.setMilliseconds(0)

    let deathLineTime = deathLine.getTime()
    let timer = time.getTime()
    let today = new Date(new Date().toLocaleDateString())
    let day = 86400000 * 2
    // 如果货时间选择的后天 不需要修改时间
    if (today.getTime + day === timeOrigin.getTime) {
      console.log('正常发货')
      return date
    } 
    // 松后时间是当前18点之前  顺延一天
    let d = 0
    if (timer > deathLineTime) {
      // 如果son过时间是今天， 
      d = 1
    }
    time = time.setDate(time.getDate() + d)
    
    let res = dateFormat(time, 'YYYYmmdd')
    return res
  }
  /**
   * @desc 删除购物车
   */
  delSelectArr = async () => {
    let { selected } = this.props
    if (selected.length === 0) return false
    selected = selected.map(item => item.item_id)
    let { errorCode } = await removeFromCart(selected)
    if(errorCode === 0) {
      this.props.update({key: '', val: []})
    }
  }
  /**
   * @desc 设置优惠码
   * @param {*} voucher_code 
   */
  setConpon = voucher_code => {
    this.setState({ voucher_code })
    clearTimeout(this.timer)
    this.timer = setTimeout( this.calculatePrice, 800)
    // this.calculatePrice()
  }
  blessChange = bless => {
    this.setState({ bless })
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
    if (time.getTime() > deathLine.getTime()) {
      num = 2
    }
    time.setDate(time.getDate() + num)
    return time
  }
  /**
   * @desc 判断是否是节假日
   * @param { string } str date string
   * @return { boolean } true | false
   */
  isHoliday(str) {
    let time = new Date(str)
    let month = time.getMonth()
    let date = time.getDate()
    let res = false
    if ((month == 0) && (date == 1)) {
      res = true
      console.log("元旦");
    }
    if ((month == 1) && (date ==13 )) {
      res = true
      console.log("除夕");
    }
    if ((month == 1) && (date ==14 )) {
      res = true
      console.log("春节/情人节");
    }
    // if ((month == 2) && (date == 1)) console.log("国际海豹日");
    // if ((month == 2) && (date == 8)) {
    //   res = true
    //   console.log("国际劳动妇女节/中国保护母亲河日");
    // }
    if ((month == 4) && (date == 20)) {
      res = true
      console.log("5 20");
    }
    // if ((month == 2) && (date == 12)) console.log("植树节");
    // if ((month == 3) && (date == 1)) console.log("愚人节");
    // if ((month == 3) && (date == 5)) console.log("清明节");
    // if ((month == 4) && (date == 1)) console.log("国际劳动节");
    if ((month == 4) && (date == 9)) {
      res = true
      console.log("母亲节");
    }
    
    // if ((month == 5) && (date == 1)) console.log("国际儿童节");
    // if ((month == 5) && (date == 26)) console.log("国际禁毒日");
    // if ((month == 7) && (date == 1)) console.log("建军节");
    // if ((month == 7) && (date == 15)) console.log("日本无条件投降日/世纪婚纱日");
    if ((month == 7) && (date == 16)) {
      res = true
      console.log("七夕情人节");
    }
    if ((month == 11) && (date == 24)) {
      res = true
      console.log("平安夜");
    }
    if ((month == 11) && (date == 25)) {
      res = true
      console.log("圣诞节");
    }
    return res
  }
  render() {
    let {
      backHistory,
      switchChange,
      dateChange,
      timeChange,
      crateOrderFn,
      setConpon
    } = this
    let {
      product_array: list
    } = this.props
    let {
      date,
      priceInfo,
      anonymous,
      voucher_code,
      delivery_time_range,
      timeList,
      // showTimeTip
    } = this.state
    let start = this.getStart()
    // TODO: 价格参数报错
    // TODO: 补充一个结果页， 直接跳转
    /*
      品牌故事
      AS Flower  Boutique 主要以花艺设计为主，为顾客定制属于自己的的专属花礼。创始人力求精致和品味，从花材的挑选、搭配、制作到包装，无一不注重细节

      AS Flower  Boutique环绕花卉与绿植，引入与自然相关的产品，提倡一种接近自然的生活方式，推出与花艺植物相关的课程和产品，并承接各种商务活动花艺布置。

      购买须知

      1:鲜花是季节性商品，某些花材可能由于天气、运输等突发状况而出现缺货，特殊造型的花材和设计款花束是无法复制的，因为花材一直在变化，花材的大小曲线也是不同的，只能做相同色系风格，不能保证一模一样，如果图片花材已经下市或者缺货我们会用相同色系风格的花材代替。

      2:节日和恶劣天气的情况下不支持指定时间配送，建议自行下单或自取。

      3:下单请务必保证收件人电话接听畅通，地址不详，电话无人接通，再次配送需要买家承担相关费用。

      4:客服时间：10:00-18:00，非本时间段内的留言我们将在工作时的第一件回复处理。



      保养说明
      花束养护方法：花束收到后需要当天拆包装修根水养，水位10cm-20cm左右，尽量放在常温通风的地方
      
      前期-每天或者隔天换水修根一次，修根需要冲洗一下杆子，水一定要保持干净哦～水脏容易滋生细菌，杆子生病腐烂不吸水就造成了花的枯萎。
      
      中期-因为每一种甚至每一朵花的生命周期都不太一样，有的叶片会先枯萎，我们需要把不好的叶片处理掉，如果有花的花边碰撞损坏或者发霉就把不好的花瓣拔掉，避免感染好的，养护的得好是可以延长花期呢

      尾期：开始发现鲜花精神状态不佳之后继续剪根还能维持一段时间，越短越好，剪短之后不能维持原本的造型了可以分放置小杯子或者小瓶子里面，小小的几只放在洗手台、床头柜、窗户旁也是很可爱的～请务必让她们绽放到最后！
      运输说明
      专人配送，一个师傅只送一束花。

      退换货说明

      因鲜花商品的特殊属性，将不接受退货，如有质量问题，请在收货后24小时联系客服。


    */
    return (<View className='ConfirmOrderWrap'>
      <CustomNavBar
        title='确认订单'
        clickLeft={backHistory}
      />
      <View className='ConfirmOrderContentWrap'>
        {/* <Address title='添加收获地址' /> */}
        { this.getAddr() }
        <PickerDate 
          change={dateChange}
          start={dateFormat(start, 'YYYY-mm-dd')} 
          value={start} 
        />
        <ItemWrap
          title='配送日期'
          subTitle={date}
        />
        {/* <AtAccordion
          hasBorder={false}
          open={showTimeTip}
          className='TimeTipWrap'
          onClick={() => this.setState({ showTimeTip: !showTimeTip })}
          title='配送日期规则'
        >
          
        </AtAccordion> */}
        <View className='TimeTip'>
        {/* 我们的花礼采用新鲜花材，采购、运输、制作、配送均需时间， */}
        为保证新鲜美好的花礼完美的送到您手上，
        请提前预定下单。正常12:00之前的订单可预约次日送达，
        12:00之后的订单后天送达，下单前请先联系客服确定是否有货，
        急单将收取10%的调度费。节假日需要提前三天以上预定，如有疑问请联系客服。
        </View>
        
        <PickerTime change={timeChange} list={timeList} />
        <ItemWrap
          title='配送时间'
          subTitle={delivery_time_range}
        />
        <View className='ProductList'>
          { list.map((info, key) => (<ProductCard key={key} info={info} />)) }
        </View>
        <UseCoupon setConpon={setConpon} coupon={voucher_code} />
        <View className='BlessCard'>
          <View className='BlessTitle'>祝福卡</View>
          <AtTextarea
            className='BlessTextarea'
            maxLength={50}
            count={false}
            value={this.state.bless}
            onChange={this.blessChange}
            placeholder='给ta说点什么把！'
          />
        </View>
        <Switch
          title='匿名送达'
          checked={anonymous}
          change={switchChange}
        />
        <PriceDetail info={priceInfo} />
      </View>
      <Footer info={priceInfo} submit={crateOrderFn} />
    </View>)
  }
}

export default connect(
  state => {
    return state.shoppingCart
  },
  { setShipping, update }
)(ConfirmOrder)
