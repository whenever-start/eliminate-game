/*
 * @Description: utils
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-14 00:14:06
 * @LastEditTime: 2021-11-14 00:57:11
 */

export function toggleView(className, ...views) {
  views.forEach((view) => view.classList.toggle(className))
}

export const wait = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
