import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import { AtAccordion } from 'taro-ui'
import './index.scss'
/**
 * @desc 头部
 */
const MainProductdetail = props => {
  
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen({ open: !open })
  }
  const getDetail = () => {
    let info = props.info

    if (!info.detail) return ''

    let tems = info.detail.detail_list.map((item, key) => {
      if(item.type === 'text') {
        return (<View className='textContent' key={key}>{ item.content }</View>)
      }
      return (<Image
        src={item.content}
        key={key}
        mode='aspectFill'
        className='DetailImage'
      />)
    })
    return tems
  }

  return (<View className='MainProductdetail'>
    <View className='DetailTitle'>商品详情</View>
    { getDetail() }
    <View className='white-space'></View>
    <AtAccordion
      hasBorder={false}
      open={open}
      onClick={handleClick}
      title='规格参数'
      className='InfoAccordion'
    >
      <View>1212222</View>
    </AtAccordion>
  </View>)
  
}

export default MainProductdetail
