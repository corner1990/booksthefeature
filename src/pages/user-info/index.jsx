import React, { useState } from 'react'
import { View } from '@tarojs/components'
import CustomNavBar from '../../components/navbar'
import Item from '../../components/item'
import EditGender from './components/edit-gender'

import './index.scss'
/**
 * @desc 我的信息
 */
const UserInfo = () => {
  /**
   * @desc 返回上一页
   */
  const backHistory = () => {}

  let genderList = ['男', '女']
  const [showGender, setShowGender] = useState(false)
  /**
   * desc 设置性别
   * @param {*} props 
   */
  let setGender = props => {
    console.log('setGender', props)
    setShowGender(false)
  }
  return (<View className='UserInfoWrap'>
    <CustomNavBar
      title='个人资料'
      clickLeft={backHistory}
    />
    <Item
      title='修改头像'
      src='https://ipxcdn.jfshare.com/scrape/avatars/15520.jpg'
    />
    <Item
      title='修改昵称'
    />
    <Item
      title='性别'
      click={ () => setShowGender(true)}
    />
    <Item
      title='生日'
    />
    <EditGender
      setGender={setGender}
      list={genderList}
      close={() => setShowGender(false)}
      cancel={() => setShowGender(false)}
      open={showGender}
    />
  </View>)
}

export default UserInfo