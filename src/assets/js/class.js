/*
 * @Description: class 对象
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-12 09:17:31
 * @LastEditTime: 2021-11-20 00:41:49
 */
import { base, compares, comparesSrc } from '../../config'

export class Block {
  constructor(x, y) {
    this.elBlock = document.createElement('div')
    this.elBlock.className = 'block'
    this.elBlock.x = x
    this.elBlock.y = y
    this.elBlock.posX = x * base.size + x * 2 * base.gap
    this.elBlock.posY = y * base.size + y * 2 * base.gap
    this.elBlock.style.top = this.elBlock.posY + 'px'
    this.elBlock.style.left = this.elBlock.posX + 'px'
    this.elBlock.style.width = base.size + 'px'
    this.elBlock.style.height = base.size + 'px'
    this.elBlock.compare = null
    // this.elBlock.innerHTML = x + ' ' + y

    this.elBlock.setCompare = () => {
      let idx = random(0, base.picsLen)
      // this.elBlock.style.backgroundImage = `url(${compares[idx]})`
      this.elBlock.compare = compares[idx]
      this.elBlock.style.backgroundImage = `url(${comparesSrc[compares[idx]]})`
    }

    // this.elBlock.getCompare = () => {
    //   // return this.elBlock.style.backgroundImage
    //   return this.elBlock.compare
    // }

    this.elBlock.setPos = (x, y) => {
      this.elBlock.x = x
      this.elBlock.y = y
      this.elBlock.posX = x * base.size + x * 2 * base.gap
      this.elBlock.posY = y * base.size + y * 2 * base.gap
      this.elBlock.style.top = this.elBlock.posY + 'px'
      this.elBlock.style.left = this.elBlock.posX + 'px'
    }
  }
}

function random(min, max) {
  return parseInt(Math.random() * max) + min
}
