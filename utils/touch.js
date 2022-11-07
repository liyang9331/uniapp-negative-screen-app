/**
 * 判断滑动方向
	* @params { String } endX 结束x
	* @params { String } endY 结束y
	* @params { Number } startX 开始x
	* @params { Object } startY 开始y
 */
export const touchDirection = (endX, endY, startX, startY) => {
  let turn = ''
  if (endX - startX > 50 && Math.abs(endY - startY) < 50) {
    turn = 'right'
  } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {
    turn = 'left'
  }
  return turn
}