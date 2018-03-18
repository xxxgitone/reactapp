// 根据用户信息,返回跳转地址
export const getRedirectPath = ({type, avatar}) => {
  let url = (type === 'boss') ? '/boss' : '/genius'
  // 没有头像的话去完善信息
  if (!avatar) {
    url += 'info'
  }
  return url
}
