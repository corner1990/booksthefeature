'use strict';
import { Events } from '@tarojs/taro'

const events = new Events()


// // 监听一个事件，接受参数
// events.on('eventName', (arg) => {
//   // doSth
// })

// // 触发事件，传入多个参数
// events.trigger('eventName', arg1, arg2, ...)

// // 取消监听一个事件某个 handler
// events.off('eventName', handler1)

// // 取消监听所有事件
// events.off()

export default events
