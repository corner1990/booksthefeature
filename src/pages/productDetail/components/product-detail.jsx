import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import { AtAccordion } from 'taro-ui'
import './index.scss'
/**
 * @desc 头部
 */
const MainProductdetail = props => {
  let { info = {
    care_instructions: ''
  } } = props
  let { specifications=[] } = info
  const [open, setOpen] = useState(false)
  // brand_story
  const [brand_story, setbrand_story] = useState(false)
  // care_instructions
  const [care_instructions, setcare_instructions] = useState(false)
  // logistics_desc
  const [logistics_desc, setlogistics_desc] = useState(false)
  const [purchase_note, setpurchase_note] = useState(false)
  // logistics_desc
  const [after_sale_instructions, setafter_sale_instructions] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }
  /**
   * @desc 处理图片
   */
  const getDetail = () => {
    if (!info.detail) return ''
    let list = info.detail.detail_list || []
    let tems = list.map((item, key) => {
      if(item.type === 'text') {
        return (<View className='textContent' key={key}>{ item.content }</View>)
      }
      return (<Image
        src={item.content}
        key={key}
        mode='widthFix'
        className='DetailImage'
      />)
    })
    return tems
  }
  const  getSpecifications = () => {
    if (!Array.isArray(specifications)) {
      specifications = JSON.parse(specifications)
    }
    // 处理报错
    if (!specifications) {
      specifications = []
    }
    
    return specifications.map((item, key) => {
      let itemKey = Object.keys(item)[0]
      return (<View className='line' key={key}>
      <View clssName='lineTitle'>{itemKey}</View>
    <View className='lineVal'>{item[itemKey]}</View>
    </View>)
    })
    
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
      { getSpecifications() }
    </AtAccordion>
    <AtAccordion
      hasBorder={false}
      open={brand_story}
      className='InfoAccordion'
      onClick={() => setbrand_story(!brand_story)}
      title='品牌故事'
    >
      <View className='wrap'>
        {
          info.brand_story ? info.brand_story.split('\n').map((item, key) => {
            return (<View key={key}>{item}</View>)
          }) : ''
        }
      </View>
    </AtAccordion>
    <AtAccordion
      hasBorder={false}
      open={purchase_note}
      className='InfoAccordion'
      onClick={() => setpurchase_note(!purchase_note)}
      title='购买须知'
    >
      <View className='wrap'>
        {
          info.purchase_note ? info.purchase_note.split('\n').map((item, key) => {
            return (<View key={key}>{item}</View>)
          }) : ''
        }
      </View>
    </AtAccordion>
    <AtAccordion
      hasBorder={false}
      open={care_instructions}
      className='InfoAccordion'
      onClick={() => setcare_instructions(!care_instructions)}
      title='保养说明'
    >
      <View className='wrap'>
        {
          info.care_instructions ? info.care_instructions.split('\n').map((item, key) => {
            return (<View className='line' key={key}>{item}</View>)
          }) : ''
        }
      </View>
    </AtAccordion>
    <AtAccordion
      hasBorder={false}
      open={logistics_desc}
      className='InfoAccordion'
      onClick={() => setlogistics_desc(!logistics_desc)}
      title='运输说明'
    >
      <View className='wrap'>
        {info.logistics_desc ? info.logistics_desc.split('\n').map((item, key) => {
            return (<View className='line' key={key}>{item}</View>)
          }) : ''
        }
      </View>
    </AtAccordion>
    <AtAccordion
      hasBorder={false}
      open={after_sale_instructions}
      className='InfoAccordion'
      onClick={() => setafter_sale_instructions(!after_sale_instructions)}
      title='退换货说明'
    >
      <View className='wrap'>
        {
        info.after_sale_instructions ? info.after_sale_instructions.split('\n').map((item, key) => {
          return (<View className='line' key={key}>{item}</View>)
        }) : ''
        }
      </View>
    </AtAccordion>
  </View>)
  
}

export default MainProductdetail
