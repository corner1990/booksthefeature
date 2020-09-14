import React from 'react';
import { View } from '@tarojs/components';
import './filterBar.scss';

const FilterBar = props => {
  let filters = [
    {
      label: '综合',
      key: 0
    },
    {
      label: '新品',
      key: 1
    },
    {
      label: '价格',
      key: 2,
      icons: []
    }
  ]
  /**
   * @desc 切换active
   * @param {*} item 
   */
  const setActive = (key) => {
    let { update, active, priceSort } = props
    if (key !== active) {
      update('filterActive', key)
      return false
    }
    // 处理价格箭头
    if (key === 2) {
      let sort = priceSort === 0 ? 1 : 0
      update('priceSort', sort)
    }
    
  }
  /**
   * @desc 获取icon
   * @param {*} item 
   */
  const getIcon = item => {
    if(item.key !== 2) return ''
    // 处理价格三角箭头的class
    let { priceSort, active } = props
    let priceClass = ''
    if (active === 2) {
      priceClass = priceSort ? 'down' : 'up'
    }
    return (<View
      className={[
        'iconPriceWrap',
        priceClass
      ]}
    >
    </View>)
  }
  /**
   * @desc 处理列表
   */
  const getFilterItem = () => {
    let { active } = props
    return filters.map(item => (
      <View
        className={['filterBarItem', (item.key === active ? 'active' : '')]}
        key={item.key}
        onClick={() =>setActive(item.key) }
      >
        {item.label}
        { getIcon(item) }
      </View>
    ))
  }
  
  // console.log('props', props)
  return <View className='filterBar'>
    { getFilterItem() }
  </View>
}

export default FilterBar