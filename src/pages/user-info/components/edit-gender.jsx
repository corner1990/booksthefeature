import React from 'react'
import { View } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'

import './index.scss'
/**
 * @desc 修改性别
 */
const EditGender = props => {
  let {
    open = false,
    title = '',
    cancelText='取消',
    cancel = () => {
      console.log('3333')
    },
    close = () => {
      console.log('444')
    },
    setGender = () => {},
    list = []
  } = props
  return (<View className='EditGenderWrap'>
    <AtActionSheet
      title={title}
      isOpened={open}
      onCancel={cancel}
      onClose={close}
      cancelText={cancelText}
    >
      { list.map((item, key) => (
        <AtActionSheetItem
          key={key}
          onClick={() => setGender(item)}
        >
          {item}
        </AtActionSheetItem>
      )) }
    </AtActionSheet>
  </View>)
}

export default EditGender