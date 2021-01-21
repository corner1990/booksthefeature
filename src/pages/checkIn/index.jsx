import React, { useState } from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtProgres, AtButton, AtImagePicker } from 'taro-ui'
import Taro, { render } from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import TaskInfo from './components/taskInfo'
// import None from '../../components/none'
import './index.scss'
import { getTaskInfo } from '../taskDetail/api'
import { checkIn } from './api'
import Event from '../../utils/event'
// import { uploadBase64Image } from '../index/user/api'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
class TaskDetail extends React.Component {
  state = {
    files: [],
    info: {},
    sign_content: '',
    loading: false
  }
  componentDidMount() {
    this.loadInfo()
  }
  /**
   * @desc 返回
   */
  backHistory = () => {
    Event.trigger('refresh')
    Taro.navigateBack()
  }
   /**
   * @desc 首次加载
   */
  loadInfo = async () => {
    let { params } = Taro.Current.router
    let { errorCode, data } = await getTaskInfo(params)
    
    if (errorCode == 0) {
      // setInfo(data)
      this.setState({info: data})
    }
  }

  /**
   * @desc 上传头像
   * @param {*} src 
   */
  toBase64 = file => {
    let { uploadImg } = this
    let src = file.compressUrl
    let suffix = src.substring(src.lastIndexOf('.') + 1)
    if (file.base64Url) {
      uploadImg(file)
      return false
    }
    // 判断 如果已经转锅 不继续
    const getBase64ImageUrl = (res, suffix) => {
      /// 获取到base64Data
      var base64Data = res;
      /// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
      base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
      /// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
      let base64Url = `data:image/${suffix};base64, ${base64Data}`;
      // base64ImgUrl.push(base64Url);   //用来显示在页面上的base64路径（数组）
      file.base64Url = base64Url
      /// 刷新数据
      uploadImg(file)
      // self.uploadImg(base64Url)
          
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
         
          // self.cancelSetAvatar()
          // console.log('234', file)
        }
      });
    }
    transformBase(src)
  
  }
  /**
   * @desc 获取上传凭证
   */
  uploadImg = async file => {
    // let file_base_64 = file.file
    // 上传完成不继续执行业务
    if (file.upload) {
      return false
    }
    Taro.uploadFile({
      url: 'http://47.115.3.230/system/media/uploadImage',
      filePath: file.compressUrl,
      name: 'file',
      success({ statusCode, data }) {
        if (statusCode == 200) {
          data = JSON.parse(data)
          if (data.errorCode == 0) {
            file.link = data.data
            file.upload = true
          } 

        }
      }
    })
    // let { errorCode, data } = await uploadBase64Image({file: file_base_64})
    // if (errorCode === 0) {
    //   file.upload = true
    //   file.link = data
    //   // this.updateAvatar(data)
    // }
  }
  /**
   * @desc 打卡
   */
  setCheckIn = async () => {
    let {
      sign_content,
      loading,
      files
    } = this.state
    let { task_order_sn } = Taro.Current.router.params
    if (loading) return false // 防止多次提交
    if (files.length <= 0) {
      return Taro.showToast({
        icon: 'none',
        title: '请选择图片'
      })
    }
    
    // let arr = files.map(item => {

    // })
    let data_list = files.map(item => {
      return {
        data_link: item.link,
        data_type: 'image'
      }
    })
    let params = {
      sign_content,
      task_order_sn,
      sign_data_detail: {
        data_list
      }
    }
    loading = true
    let { errorCode } = await checkIn(params)
    Event.trigger('refresh')
    loading = false
    if (errorCode == 0) {
      Taro.navigateBack()
    }
  }
  /**
   * @desc 文件该拜年
   * @param {} files 
   * @param {*} action 
   */
  fileChange = (files, action) => {
    
    files.map(file => {
      if (file.compressUrl) {
        this.uploadImg(file)
        return false
      }
      wx.compressImage({
        src: file.url, // 图片路径
        quality: 76, // 压缩质量
      }).then(({ errMsg, tempFilePath }) => {
        if (errMsg == 'compressImage:ok'){
          file.compressUrl = tempFilePath
          this.uploadImg(file)
        }
        
      })
    })
    // setFiles(files)
    this.setState({ files })
  }
  /**
   * @desc desc change
   * @param {*} e 
   */
  descChange = e => {
    let { value } = e.detail
    // sign_content = value
    // setSignInfo(value)
    this.setState({ sign_content: value })
  }
  onImageClick = () => {}
  render() {
    let title = '执行日志'
    let { info, files,  } = this.state
    return (<View className='create-task-wrap'>
     <CustomNavBar
        title={title}
        clickLeft={this.backHistory}
      />
    <View className='content'>
      <TaskInfo info={info} />
      <View className='line'>
        <View className='line-title'>打卡描述</View>
        <View className='line-input-wrap'>
          <Textarea
            className='input textarea'
            placeholder='请输入计划描述'
            onInput={this.descChange}
          />
        </View>
      </View>
      <View className='line'>
        <View className='line-title'>任务图片</View>
        <View className='line-input-wrap'>
          <AtImagePicker
            length={5}
            sizeType={['compressed']}
            multiple
            files={files}
            onChange={this.fileChange}
            // onFail={this.onFail.bind(this)}
            onImageClick={this.onImageClick}
          />
        </View>
      </View>
    </View>
    <View className='AddBtnWrap'>
      <AtButton type='primary' onClick={this.setCheckIn}>打卡</AtButton>
    </View>
  </View>)
  }
}


export default connect(mapState)(TaskDetail)
