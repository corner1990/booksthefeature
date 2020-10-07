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
import { updateUserInfo, getOssSign } from '../index/user/api'
import md5 from '../../utils/md5'
import Crypto from '../../utils/crypto'
import Base64 from '../../utils/Base64'
// import HMAC from '../../utils/hmac' 
// import SHA1 from '../../utils/sha1'
import OSS from '../../utils/aliyun-oss'


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
    src: 'http://tmp/wxd8da991442b718a4.o6zAJszqCflfJiHlT5y2….iWjZtk9KF6Zm6b0b4c5442bf25717733aa59d441620b.png',
    showCropper: false,
    sign: null,
    timeout: 87600,
    client: null,
    showEditNickName: true
  }
  componentDidMount() {
    this.props.getUserINfo()

    this.getOssSignFn()
  }
  /**
   * @desc 获取上传凭证
   */
  getOssSignFn = async () => {
    let { errorCode, data } = await getOssSign()
    if (errorCode === 0) {
      let {
        securityToken,
        accessKeyId,
        accessKeySecret,
        bucket,
        endpoint
      } = data
      // 创建实例
      let client  = new OSS({
        endpoint,
        accessKeyId,
        accessKeySecret,
        bucket,
        stsToken: securityToken
      })
      this.setState({
        sign: data,
        client
      })
    }
  }
  /**
   * @desc 返回上一页
   */
  backHistory = () => Taro.navigateBack()

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
  getPolicyBase64 = function () {
    let date = new Date();
    let { timeout } = this.state
    date.setHours(date.getHours() + timeout);
    let srcT = date.toISOString();
    const policyText = {
      expiration: srcT, // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
      conditions: [
        ['content-length-range', 0, 5 * 1024 * 1024], // 设置上传文件的大小限制,5mb
      ],
    };
    const policyBase64 = Base64.encode(JSON.stringify(policyText));
    return policyBase64;
  };
  
  getSignature = policyBase64 => {
    let { sign } = this.state
    console.log('sign', sign)
    const accessKey = sign.accessKeySecret;
    console.log('accessKey', accessKey, Crypto)
    const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
      asBytes: true
    });
    console.log('bytes', bytes)
    const signature = Crypto.util.bytesToBase64(bytes);
    console.log('signature', signature)
    return signature;
  };
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
    // console.log('123', img)
    let self = this
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
    console.log('123', src)
    // let dir = `/ipxmall/${src.replace('wxfile://', '')}` //在手机上检测  注意
    // let aliyunFileKey = `/ipxmall/${src.replace('http://', '')}`  //在开发者工具里检测  注意
    let {
      sign: {
        accessKeyId
      },
      client
    } = this.state
    let suffix = src.substring(src.lastIndexOf('.') + 1)
    let imgKey = `ipxmall/${md5(src)}`
    let self = this
    const getBase64ImageUrl = (res, suffix) => {
      /// 获取到base64Data
      var base64Data = res;
      /// 通过微信小程序自带方法将base64转为二进制去除特殊符号，再转回base64
      base64Data = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(base64Data));
      /// 拼接请求头，data格式可以为image/png或者image/jpeg等，看需求
      // let base64ImgUrl = this.data.base64ImgUrl;
      // let WorkingCard = this.data.WorkingCard;    //需要赋值的图片base64字段
      let base64Url = `data:image/${suffix};base64, ${base64Data}`;
      // base64ImgUrl.push(base64Url);   //用来显示在页面上的base64路径（数组）
      // WorkingCard = base64Url;
      // 获取文件(图片)MD5
      // let dealToMD5 = sMD5.hexMD5(base64Url);   //（var sMD5 = require('../../utils/common/spark-md5.js')）
      /// 刷新数据
      // console.log(base64ImgUrl, '===========')
      // console.log('WorkingCard', WorkingCard)
      console.log('base64ImgUrl', base64Url)
      const formData = new OSS.Buffer(base64Url)
      // let formData = new FormData();
      // formData.append("file", base64Url);
      
      client.put(imgKey, formData)
        .then(response => {
          // 上传完毕回调
          let res = response.res
          if (res.status === 200) {
            
            console.log('ok', res)
            
          } else {
            console.log('err', res)
          }
          // 图片前缀
        })
          
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
          let imgKey = `ipxmall/${md5(src)}`
          // const data = new OSS.Buffer(src)
          // let formData = new FormData();
          // formData.append("file", file);
          
          // client.put(imgKey, formData)
          //   .then(response => {
          //     // 上传完毕回调
          //     let res = response.res
          //     if (res.status === 200) {
                
          //       console.log('ok', res)
                
          //     } else {
          //       console.log('err', res)
          //     }
          //     // 图片前缀
          //   })
          
          self.cancelSetAvatar()
          console.log('234', file)
        }
      });
    }
    transformBase(src)
    // const aliyunFileKey = `/ipxmall/${md5(src)}.${src.substring(src.lastIndexOf('.') + 1)}`;
    // const aliyunServerURL = 'https://ipxmall.oss-cn-zhangjiakou.aliyuncs.com';
    // const accessid = accessKeyId;
    // const policyBase64 = this.getPolicyBase64();
    // const signature = this.getSignature(policyBase64);

    // console.log('999', aliyunFileKey, aliyunServerURL, accessid, policyBase64, signature)
    // console.log('src', src, md5(src))
    // Taro.uploadFile({
    //   url: 'https://oss-cn-zhangjiakou.aliyuncs.com', //仅为示例，非真实的接口地址
    //   filePath: '/ipxmall/',
    //   name: 'file',
    //   formData: {
    //     key: aliyunFileKey,
    //     'policy': policyBase64,
    //     'OSSAccessKeyId': accessid,
    //     'signature': signature,
    //     'success_action_status': '200'
    //   },
    //   success (res){
    //     const data = res.data
    //     console.log('3434', res)
    //     //do something
    //   }
    // })
  
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
        src='https://ipxcdn.jfshare.com/scrape/avatars/15520.jpg'
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
        click={ () => changeShowGender(true)}
      />
      <DatePicker change={setBrithday} />
      <Item
        title='生日'
        subTitle={this.getBrithday()}
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