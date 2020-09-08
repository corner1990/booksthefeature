import React, { Component } from 'react'
import { View } from '@tarojs/components'
// import CustomNavBar from '../../../components/navbar'
// import SearchBar from './found/searchBar'
import Card from './card'
import './index.scss'


export default class Index extends Component {
  state = {
    data: [
      {
      textTitle: "名称",
      textMark: "文章描述",
      month: "07",
      day: '03',
      show: false,
      id: 0
    }, {
      textTitle: "名称",
      textMark: "文章描述",
      month: "08",
      day: '08',
      show: false,
      id: 1
    },
    {
      textTitle: "名称",
      textMark: "文章描述",
      month: "01",
      day: '02',
      show: false,
      id: 2
    },
    {
      textTitle: "名称",
      textMark: "文章描述",
      month: "10",
      day: '08',
      show: false,
      id: 3
    }]
  }
  index = 0
  timer = 0
  isfirst = true
  componentDidMount () {
    let { data } = this.state
    
    setTimeout(() => {
      data.map((item, index) => {
        wx.createIntersectionObserver()
          .relativeToViewport({ top: 40, bottom: 20 })
          .observe('.found-card-' + index, () => {
          this.showItem(item)
        })
      })
    }, 20)
  }

  showItem = info => {
    let time = 200
    if (!this.isfirst) {
      time = 500
    }
    clearTimeout(this.timer)
    
    let { data } = this.state
    let subIndex = data.findIndex(item => item.id === info.id)
    setTimeout(() => {
      
      data[subIndex] = {...info, show: true}
      this.setState({
        data
      })
    }, this.index * time)
    this.index += 1

    this.timer = setTimeout(() => {
      this.index = 0
      this.isfirst = false
    }, 100)
  }

  render () {
    let { data } = this.state
    return (
      <View className='found' >
        {/* <CustomNavBar title='发现' /> */}
        {/* <SearchBar className='found-search' /> */}
        {
          data.map((item, index)=> 
            ( <Card key={index} index={index} { ...item } />) 
          )
        }
      </View>
    )
  }
}
