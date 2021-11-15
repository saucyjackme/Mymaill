//防抖函数
export function debounce(func,delay){
  let timer = null;
  return function(...args){
    if(timer) clearTimeout
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}

export function formatDate(date, fmt) {
  //获取年份，+(1或多）;*(0或多);?(0或1）
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //月份记得要加1
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  //不足两位，补齐两位
  return ('00' + str).substr(str.length);
}
