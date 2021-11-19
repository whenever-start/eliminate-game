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
    lenY: 6,
    lenX: 6,
    count: 10,
    time: 60,
    step: 30,
    task: [
      {
        compare: 0,
        count: 20
      },
      {
        compare: 1,
        count: 20
      }
    ]
  },
  {
    label: 2,
    lenY: 6,
    lenX: 5,
    count: 10,
    time: 60
  },
  {
    label: 3,
    lenY: 6,
    lenX: 6,
    count: 10,
    time: 60
  },
  {
    label: 4,
    lenY: 6,
    lenX: 6,
    count: 10,
    time: 60
  },
  {
    label: 5,
    lenY: 7,
    lenX: 6,
    count: 10,
    time: 60
  },
  {
    label: 6,
    lenY: 7,
    lenX: 6,
    count: 10,
    time: 60
  },
  {
    label: 7,
    lenY: 8,
    lenX: 6,
    count: 10,
    time: 60
  },
  {
    label: 8,
    lenY: 8,
    lenX: 6,
    count: 10,
    time: 60
  },
  {
    label: 9,
    lenY: 8,
    lenX: 7,
    count: 10,
    time: 60
  },
  {
    label: 10,
    lenY: 8,
    lenX: 7,
    count: 10,
    time: 60
  }
]

export const base = {
  defaultColor: '#03a9f4',
  size: 40,
  gap: 2,
  picsLen: 3
}

export const compares = [
  require('assets/img/0.png'),
  require('assets/img/1.png'),
  require('assets/img/2.png'),
  require('assets/img/3.png')
]

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
