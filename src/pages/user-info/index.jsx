import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'

import CustomNavBar from '../../components/navbar'
import Item from '../../components/item'
import EditGender from './components/edit-gender'
import EditAvatar from './components/edit-avatar'
import EditNickName from './components/edit-nickname'
import DatePicker from '../../components/picker-date'
import { getUseInfo as getUserINfo } from '../../store/actions/global'
import { updateUserInfo, uploadBase64Image } from '../index/user/api'
// import md5 from '../../utils/md5'

import './index.scss'
import { dateFormat } from '../../utils/utils'
/**
 * @desc 合并state
 * @param {*} state 
 */
const mapState = state => state.global
/**
 * @desc 我的信息
 */
class UserInfo extends Component {
  state = {
    showGender: false,
    genderList: ['男', '女'],
    showCropper: false,
    showEditNickName: false
  }
  componentDidMount() {
    this.props.getUserINfo()
  
    // this.uploadImg()
  }
  /**
   * @desc 获取上传凭证
   */
  uploadImg = async (file_base_64) => {
    let { errorCode, data } = await uploadBase64Image({file_base_64})
    if (errorCode === 0) {
      this.updateAvatar(data)
    }
  }
  /**
   * @desc 返回上一页
   */
  backHistory = () => Taro.navigateBack()
  /**
   * desc 设置信息
   * @param {*} props 
   */
  updateAvatar = avatar => {
  
    this.updateInfo({avatar}, () =>  {
      this.props.getUserINfo()
    })
  }
  /**
   * desc 设置性别
   * @param {*} props 
   */
  setGender = gender => {
    let sex = gender === '男' ? 1 : 2
   
    this.updateInfo({sex}, () =>  {
      this.props.getUserINfo()
      this.changeShowGender(false)
    })
  }
  /**
   * @desc 更新用户信息
   * @param {*} info 
   * @param {*} cb 
   */
  updateInfo = async (info, cb = () => {}) => {
    let { errorCode } = await updateUserInfo(info)
    if (errorCode === 0) {
      // 回调
      cb()
    }
  }
  /**
   * @desc 获取性别
   */
  getGender = () => {
    let { 
      sex=''
     } = this.props.userInfo
    let gender = {
      1: '男',
      2: '女'
    }
    if (sex) {
      return gender[sex]
    }
  
    return ''
  }
  /**
   * @desc 获取日期
   */
  getBrithday = () => {
    let { 
      birthday=''
     } = this.props.userInfo
    
    if (birthday) {
      // dateFormat
      return dateFormat(birthday, 'YYYY-mm-dd')
    }
  
    return ''
  }
  /**
   * @desc 设置头像
   */
  setAvatar = () => {
    const success = info => {
      let { tempFiles } = info
      this.setState({
        src: tempFiles[0].path,
        showCropper: true
      })
    }
    Taro.chooseImage({
      success
    })
  }
  /**
   * @desc 关闭
   */
  cancelSetAvatar = () => {
    this.setState({
      src: '',
      showCropper: false
    })
  }
  /**
   * @desc 上传头像
   * @param {*} src 
   */
  uploadAvatar = src => {
  
    let suffix = src.substring(src.lastIndexOf('.') + 1)
 
    let self = this
    const getBase64ImageUrl = (res, suffix) => {
      /// 获取到base64Data
      var base64Data = res;
      /// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
      base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
      /// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
      let base64Url = `data:image/${suffix};base64, ${base64Data}`;
      // base64ImgUrl.push(base64Url);   //用来显示在页面上的base64路径（数组）
    
      /// 刷新数据
      // console.log('base64ImgUrl', base64Url)
      self.uploadImg(base64Url)
          
    }
    const transformBase = src => {
      var FSM = wx.getFileSystemManager();
      //循环将得到的图片转换为Base64
      FSM.readFile({
        filePath: src,
        encoding: "base64",
        success: function(data) {
          let file = data.data;
          getBase64ImageUrl(file, suffix)
         
          self.cancelSetAvatar()
          // console.log('234', file)
        }
      });
    }
    transformBase(src)
  
  }
  changeShowGender = showGender => {
    this.setState({
      showGender
    })
  }
  /**
   * @desc 修改出生日期
   * @param {*} info 
   */
  setBrithday = async info => {
    let { detail } = info
    let brith = new Date(detail.value)
    brith.setHours(0)
    brith.setMinutes(0)
    this.updateInfo({birthday: brith.getTime()}, () =>  {
      this.props.getUserINfo()
    })
  }
  /**
   * @desc 设置昵称
   * @param {*} nickName 
   */
  setNickName = async nick_name => {
    this.updateInfo({ nick_name }, () =>  {
      this.props.getUserINfo()
      this.changeNickName()
    })
    
  }
  changeNickName = (showEditNickName=false) => {
    this.setState({
      showEditNickName
    })
  }
  render() {
    let {
      backHistory,
      setGender,
      changeShowGender,
      setAvatar,
      uploadAvatar,
      cancelSetAvatar,
      setBrithday,
      setNickName,
      changeNickName
    } = this

    let {
      genderList,
      showGender,
      src,
      showCropper,
      showEditNickName
    } = this.state
    let {
      userInfo
    } = this.props
    return (<View className='UserInfoWrap'>
      <CustomNavBar
        title='个人资料'
        clickLeft={backHistory}
      />       
      <Item
        title='修改头像'
        src={userInfo.avatar}
        click={setAvatar}
      />
      <Item
        title='修改昵称'
        click={() => changeNickName(true)}
        subTitle={userInfo.nick_name}
      />
      <Item
        title='性别'
        subTitle={this.getGender()}
        click={() => changeShowGender(true)}
      />
      <DatePicker change={setBrithday} />
      <Item
        title='生日'
        subTitle={this.getBrithday()}
      />
      <Item
        title='收货地址'
        click={() => Taro.navigateTo({url: '/pages/address/index'})}
      />
      <EditGender
        setGender={setGender}
        list={genderList}
        close={() => changeShowGender(false)}
        cancel={() => changeShowGender(false)}
        open={showGender}
      />
      <EditAvatar
        src={src}
        setAvatar={uploadAvatar}
        cancel={cancelSetAvatar}
        open={showCropper}
      />
      <EditNickName
        name={userInfo.nick_name}
        ok={setNickName}
        cancel={changeNickName}
        open={showEditNickName}
      />
    </View>)
  }
}

export default connect(mapState, { getUserINfo })(UserInfo)