import React, { useState } from 'react'
import { View, Input } from '@tarojs/components'
import { AtActionSheet, AtButton } from 'taro-ui'


import './index.scss'
/**
 * @desc 修改性别
 */
const EditNickName = props => {
  let [ newName, setName ] = useState('');

  let {
    open = false,
    name='',
    title = '修改昵称',
    cancel = () => {},
    ok = () => {}
  } = props

  /**
   * @desc 处置
   * @param {*} e 
   */
  const inputChange = e => {
    setName(e.target.value)
  }

  return (<View className='EditNickNameWrap'>
    <AtActionSheet
      title={title}
      isOpened={open}
      onCancel={() => cancel(false)}
    >
      <View className='NickNameInputWrao'>
        <Input className='NickNameInput' placeholder={name} onInput={inputChange} />
      </View>
      <View className='ButtonWrap'>
        <AtButton onClick={() => cancel(false)}>取消</AtButton>
        <AtButton type='primary' onClick={() =>ok(newName)}>保存</AtButton>
      </View>
    </AtActionSheet>
  </View>)
}

export default EditNickName