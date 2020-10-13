'use strict';
import {
  ADDSHOPPINGCART,
  DELSHOPPINGCART,
  UPDATESHOPPINGCART,
  SHOPPINGCARTSELECTED,
  CANCELSHOPPINGCARTSELECTED,
  SETPRODUCTARRAY,
  SETSHIPPING
} from '../types'
// 初始化状态
const initState = {
  info: [],
  selected: [], // 选中的列表
  product_array: [
    {
      "base_info": {
          "product_name": "枪炮玫瑰弗洛伊德33支鲜花七夕情人节礼物",
          "summary": "气味芬芳 持久留香",
          "stock": 23,
          "sale": 13,
          "sale_price": 40000,
          "format_sale_price": "400.00",
          "original_price": 60000,
          "format_original_price": "600.00",
          "item_id": 269,
          "sku_id": null,
          "main_image": "https://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2397897588/O1CN01CNtYlV25vLvfsKqyr_!!0-item_pic.jpg_460x460Q90.jpg_.webp"
      },
      "specifications": "[{\"尺寸\":\"60cm\"},{\"花语\":\"表达爱意\"},{\"鲜花绿植工艺\":\"鲜切花\"},{\"鲜花主色\":\"分红色\"}]",
      "brand_story": "近似于黑夜的包装,拥有寂寞与星河.搭配纯正粉玫瑰,这份剩余你与TA的星辰之歌,赠与你的心上之人",
      "care_instructions": "·请打开包装,将花逐枝从盒中取出;\n·您可以把配套的水管拔出后,根据您瓶子的高度,以45°修建根部,自由发挥,插入花器;\n·放在花瓶中的水,请每天剪根换水,确保花枝浸润在水中;",
      "special_note": "鲜花是季节性产商品,某些花材可能由于天气、运输等突发情况缺货。此时，花艺师将在不影响花艺整体效果的情况下,用等值或高于原花材价格的新花材进行创作。",
      "logistics_desc": "订单付款后48小时内发出,鲜花产品将使用联邦24小时送达,港澳台地区不配送,偏远地区视情况而定",
      "after_sale_instructions": "因鲜花商品的特殊属性,将不接受退货,如有质量问题,请在收货后24小时内联系客服。",
      "detail": {
          "detail_list": [
              {
                  "type": "image",
                  "content": "https://img.alicdn.com/imgextra/i3/2397897588/O1CN01FhzlWV25vLvmE1j9J_!!2397897588.jpg"
              },
              {
                  "type": "image",
                  "content": "https://img.alicdn.com/imgextra/i1/2397897588/O1CN017FiMj225vLvmE1raV_!!2397897588.jpg"
              }
          ]
      }
}
  ],
  shipping: ''
}
/**
 * @desc 购物车store
 * @param {*} state 
 * @param {*} actions 
 */
const ShoppingCart = (state = initState, action) => {
  
  switch(action.type) {
    // 添加
    case ADDSHOPPINGCART:
      return {
        ...state,
      }
      break;
      // 选中
    case SHOPPINGCARTSELECTED:
      return {
        ...state,
        selected: action.payload
      }
      // 取消选中
    case CANCELSHOPPINGCARTSELECTED:
      return {
        ...state,
        selected: [
          ...state.selected.filter(item => item.item_id !== action.payload.item_id)
        ]
      }
    case DELSHOPPINGCART:
      break;
    // 购买商品列表
    case SETPRODUCTARRAY:
      return {
        ...state,
        product_array: action.payload
      }
    case SETSHIPPING:
      return {
        ...state,
        shipping: action.payload
      }
    // 更新
    case UPDATESHOPPINGCART:
      let { key, val } = action.payload

      return {
        ...state,
        [key]: val
      }

    default:
      return state

  }
}

export default ShoppingCart