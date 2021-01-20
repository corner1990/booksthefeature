import React from 'react'
import { View, Image } from '@tarojs/components'
import { AtModal, AtModalContent } from "taro-ui"
import './index.scss'

/**
 * @desc 查看详情
 * @param {*} props 
 */
const  ViewDetail = props =>{
  let { open, update, info={
    sign_data_detail: {
      data_list: [{}]
    }
  } } = props
  const hide = () => {
    update(false)
  }
  console.log('info', info)
  return (
    <View className='ViewDetail'>
      <AtModal
        isOpened={open}
        onCancel={hide}
      >
      <AtModalContent>
        <Image
          src={info.sign_data_detail.data_list[0].data_link}
          class='detail-img'
          mode='scaleToFill'
        />
        <View className='DetailText'>{ info.sign_content }</View>
      </AtModalContent>
    </AtModal>
    </View>
  )

}

export default ViewDetail