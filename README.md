# eliminate-game

## 知识点

### new Audio

> [HTML audio 基础 API 完全使用指南](https://www.zhangxinxu.com/wordpress/2019/07/html-audio-api-guide/)

```js
const sound = new Audio(src)
sound.play()
```

### vue-cli / webpack 中引用 src

```js
let src = require('assets/img/1.png')

el.style.backgroundImage = 'url(' + require('assets/img/1.png') + ')'
```

### 同步 delay

```js
export const wait = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

// 引用: 使用 async + await
function async click() {
  console.log(1)
  await wait(300)
  console.log(2)
}
```

### 按属性添加 transition-duration

```css
transition-property: top, left, right, bottom;
transition-duration: 0.3s;
```

## 核心算法

### 是否匹配

```js
canMatch(el){
  const match = []

  let upY = el.y - 1
  while(upY >=0 && compare(el,upEl)){
    upY--
  }
  // down left right 同上

  if(downY - upY >=  4){
    // 添加 upY - downY 之间的元素
  }

  // leftX rightX 同上

  return match.length ? match : false
}
```

### 消除

```js
eliminate(match){
  // 元素 opacity = 0
  // 元素移到当前列上方
  // 元素掉落(移到上方的元素 opacity = 1 且更换图片)
  // 更新二维素组
  // 元素所在列,从 match 中最低的元素到当前列第一个,全部再判断
  // 匹配到的所有元素合并(去重)
  // 递归
  this.eliminate(mergeMatch)
}
```

## 其它功能

- [x] 更新任务
- [ ] 更新 step
- [ ] 弹出成功
- [ ] 选择下一关
- [ ] 更新关卡
- [ ] 关卡选择
- [ ] 音效开关
- [ ] 音乐开关

```js
// 更新任务
// 更新 step
// 弹出成功
// 选择下一关
// 更新关卡
// 关卡选择
// 音效开关
// 音乐开关
```
