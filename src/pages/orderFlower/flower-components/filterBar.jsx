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
      key: 2
    }
  ]
  const getFilterItem = () => {
  return filters.map(item => (
    <View
      className={['filterBarItem', (item.key === 0 ? 'active' : '')]}
      key={item.key}>
      {item.label}
    </View>
  ))
  }
  console.log('props', props)
  return <View className='filterBar'>
    { getFilterItem() }
  </View>
}

export default FilterBar