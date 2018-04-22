// 自定义中间件
// 判断是否为数组的中间件
const arrayThunk = ({dispatch, getState}) => next => action => {
  if (Array.isArray(action)) {
    action.forEach(v => dispatch(v))
    return
  }
  // 如果不符合要求，直接调用下一个中间件，使用next
  // 符合条件，需要重新dispatch

  // 默认
  return next(action)
}

export default arrayThunk
