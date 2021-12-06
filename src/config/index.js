/*
 * @Description: 游戏配置
 * @Author: FXF
 * @LastEditors: FXF
 * @Date: 2021-11-12 04:38:55
 * @LastEditTime: 2021-11-20 01:45:55
 */

export const configs = [
  {
    label: 1,
    lenX: 6,
    lenY: 6,
    count: 10,
    step: 30,
    task: [
      {
        compare: 'chicken',
        count: 10
      },
      {
        compare: 'pig',
        count: 10
      }
    ]
  },
  {
    label: 2,
    lenX: 7,
    lenY: 8,
    count: 10,
    step: 30,
    task: [
      {
        compare: 'chicken',
        count: 10
      },
      {
        compare: 'pig',
        count: 10
      },
      {
        compare: 'cat',
        count: 10
      }
    ]
  },
  {
    label: 3,
    lenX: 7,
    lenY: 10,
    count: 10,
    step: 30,
    task: [
      {
        compare: 'chicken',
        count: 10
      },
      {
        compare: 'pig',
        count: 10
      },
      {
        compare: 'cat',
        count: 10
      },
      {
        compare: 'sheep',
        count: 10
      }
    ]
  }
]

export const base = {
  defaultColor: '#03a9f4',
  size: 40,
  gap: 2,
  picsLen: 4
}

export const compares = ['chicken', 'sheep', 'pig', 'cat']

export const comparesSrc = {
  chicken: require('assets/img/0.png'),
  sheep: require('assets/img/1.png'),
  pig: require('assets/img/2.png'),
  cat: require('assets/img/3.png')
}

export const eliminateSources = [
  require('assets/music/eliminate1.mp3'),
  require('assets/music/eliminate2.mp3'),
  require('assets/music/eliminate3.mp3'),
  require('assets/music/eliminate4.mp3'),
  require('assets/music/eliminate5.mp3'),
  require('assets/music/eliminate6.mp3'),
  require('assets/music/eliminate7.mp3'),
  require('assets/music/eliminate8.mp3')
]

export const matchSources = [
  require('assets/music/match3.mp3'),
  require('assets/music/match5.mp3'),
  require('assets/music/match7.mp3'),
  require('assets/music/match9.mp3'),
  require('assets/music/match11.mp3')
]

export const dropSource = require('assets/music/drop.mp3')

export const swapSource = require('assets/music/swap.mp3')

export const clickSource = require('assets/music/click.mp3')
