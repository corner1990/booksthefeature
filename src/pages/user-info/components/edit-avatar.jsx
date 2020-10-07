import React from 'react'
import { View } from '@tarojs/components'
import { TaroCropper } from 'taro-cropper3'
import { AtActionSheet } from 'taro-ui'

import './index.scss'
import { useState } from 'react'

const EditAvatar = props => {
  const [cropper, setCropper] = useState(null)
  let {
    open = false,
    title = '',
    cancel = () => {
      console.log('3333')
    },
    setAvatar= url => {
      console.log('444', url)
    },
    src = ''
  } = props
  return (<View className='EditAvatarWrap'>
    <AtActionSheet
      title={title}
      isOpened={open}
      onClose={cancel}
    >
      <TaroCropper
        height={1000}
        src={src}
        cropperWidth={400}
        cropperHeight={400}
        ref={setCropper}
        fullScreen
        themeColor='#00b799'
        onCut={setAvatar}
        hideCancelText={false}
        onCancel={cancel}
      />
    </AtActionSheet>
  </View>)
}

export default EditAvatar