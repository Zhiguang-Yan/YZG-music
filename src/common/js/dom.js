// 这里封装一些对DOM操作的函数
//添加class
export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }

    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}
//  先判断是否有className
export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

// 在这里封装一个获取data-index 的方法
export function getData(el, name, val) {
    const prefix = 'data-'
    name = prefix + name
    if (val) {
        return el.setAttribute(name, val)
    } else {
        return el.getAttribute(name, val)
    }
}
//js自动补齐 这里封装一些对js的写CSS前缀，关于CSS我们在写时有插件自动帮我们添加前缀，但是js却没有，我们可以自己封装一个
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()
export function prefixStyle (style) {
    if (vendor === false) {
      return false
    }
    // 如果是标准的话
    if (vendor === 'standard') {
      return style
    }
    // 否则返回前缀，并且style的第一个字母大写
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
  }