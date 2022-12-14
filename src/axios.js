import axios from 'axios'
import Element from 'element-ui'
import router from './router/router'
axios.defaults.baseURL = 'http://localhost:8081'
// 设置拦截器，对登录返回的结果进行分析
const request = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})
request.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  // 请求头带上token
  return config
})
request.interceptors.response.use(response => {
  const res = response.data
  console.log('response ->' , res)
  if (res.code === 200){
    return response
  } else {
    Element.Message.error(!res.msg ? '系统异常！' : res.msg)
    return Promise.reject(response.data.msg)
  }
}, error => {
  // if (error.response.data) {
  //   error.massage = error.response.data.msg
  // }
  if (error.response.status === 401) {
    router.push('/login')
  }
  Element.Message.error(error.message, { duration: 3 * 1000 })
  return Promise.reject(error)
})
export default request
