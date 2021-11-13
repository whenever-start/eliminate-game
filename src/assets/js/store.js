const localStorage = window.localStorage

export const get = (key, def = '') => {
  let value = deserialize(localStorage.getItem(key))
  return value === undefined ? def : value
}

export const set = (key, value) => {
  if (value === undefined) {
    return this.remove(key)
  }
  localStorage.setItem(key, serialize(value))
}

export const remove = (key) => {
  localStorage.removeItem(key)
}

export const clear = () => {
  localStorage.clear()
}

function serialize(value) {
  return JSON.stringify(value)
}

function deserialize(value) {
  if (typeof value !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(value)
  } catch (e) {
    return value || undefined
  }
}

export default localStorage
