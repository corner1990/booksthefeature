import React, { Component } from 'react'
import { View, Picker } from '@tarojs/components'
import { AtIcon, AtFloatLayout, AtList, AtListItem } from 'taro-ui'
import districts from './districts'
import './index.scss'

/**
 * @desc 地址选择控件
 */
class Address extends Component{
  state = {
    province: '100000',
    city: '110000',
    area: '110100',
    selected: ''
  }
  pickerChange = e => {
    let {
      value
    } = e.detail
    let { city, area } = this.state
    let [provIndex, cityIndex, areaIndex] = value
    let provStr = Object.values(districts['100000'])[provIndex]
    let cityStr = Object.values(districts[city])[cityIndex]
    let areaStr = Object.values(districts[area])[areaIndex]
    let selected = `${provStr} ${cityStr} ${areaStr}`
    this.setState({ selected })
  }
  update = (key, val) => {
    this.setState({
      [key]: val
    })
  }
  /**
   * @desc 处理列数据
   */
  getCloumns = () => {
    let { province, city, area } = this.state
    let provinceColumns = districts[province]
    let cityColumns = districts[city]
    let areaColumns = districts[area] 

    provinceColumns = provinceColumns ? Object.values(provinceColumns) : []
    cityColumns = cityColumns ? Object.values(cityColumns) : []
    areaColumns = areaColumns ? Object.values(areaColumns) : []

    return [provinceColumns, cityColumns, areaColumns]
  }
  /**
   * @desc 处理数据
   * @param {*} e 
   */
  columnChange = e => {
    let {
      detail: {
        column,
        value
      }
    } = e
    if(column === 2) return false

    let params = {}
    if (column === 0) { // 省级变动时修改市和区的列选项
      let provKeys = Object.keys(districts['100000'])
      let cityKeys = Object.keys(districts[provKeys[value]])
      params.city = provKeys[value]
      params.area = cityKeys[0]
    } else { // 市级变动时修改区的列选项
      let { province } = this.state
      let cityKeys = Object.keys(districts[province])[value]
      params.area = Object.keys(districts[cityKeys])[0]
    }
    this.setState({
      ...params
    })
  }
  getIcon = () => {
    if (this.state.selected) return {}
    return {
      arrow: 'right'
    }
  }
  render() {
    // let { update } = this
    let {
      style = {
        height: 48,
        width: 336
      }
    } = this.props
    return (<View className='address-wrap'>
      
      <Picker
        mode='multiSelector'
        className='address-picker'
        style={style}
        range={this.getCloumns()}
        onChange={this.pickerChange}
        onColumnChange={this.columnChange}
        hasBorder={false}
      >
        <AtList>
          <AtListItem
            title='国家地区'
            extraText={this.state.selected}
            {...this.getIcon()}
          />
        </AtList>
      </Picker>
    </View>)
  }
}

export default Address