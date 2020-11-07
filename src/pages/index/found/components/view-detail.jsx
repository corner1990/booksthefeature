import React from 'react'
import { View, Image } from '@tarojs/components'
import { AtModal, AtModalContent } from "taro-ui"
import './index.scss'

/**
 * @desc 查看详情
 * @param {*} props 
 */
const  ViewDetail = props =>{
  let { open, update, info } = props
  const hide = () => {
    update({ info: {}, open: false })
  }
  
  return (
    <View className='ViewDetail'>
      <AtModal
        isOpened={open}
        onCancel={hide}
      >
      <AtModalContent>
        <Image
          src={info.feed_detail.image_list[0].image}
          class='detail-img'
          mode='scaleToFill'
        />
        <View className='DetailText'>{ info.feed_detail.description }</View>
      </AtModalContent>
    </AtModal>
    </View>
  )

}

export default ViewDetail