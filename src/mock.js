// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

const Result = {
  code: 200,
  msg: '操作成功',
  data: null
}
//  Mock.mock( url, post/get , function(options))；
//  url 表示需要拦截的 URL，
//  post/get 需要拦截的 Ajax 请求类型
//  用于生成响应数据的函数
// 获取验证码图片base64编码以及一个随机码
Mock.mock('/captcha', 'get', () => {
  Result.data = {
    // 获取一个32位的随机字符串,
    token: Random.string(32),
    captchaImg: Random.dataImage('120×40', '11111')
  }
  return Result
})

// 因为mock不认识/login?username=xxx，所以用了正则表达式
Mock.mock('/login', 'post', () => {
// 这里无法在header传入jwt
//   Result.code = 400
//   Result.msg = '验证码错误'
  return Result
})
Mock.mock('/sys/userInfo', 'get', () => {
  Result.data = {
    id: '1',
    username: 'test'
  }
  return Result
})
Mock.mock('/logout', 'post', () => {
  return Result
})

Mock.mock('/sys/menu/nav', 'get', () => {
  const nav = [
    {
      name: 'SysUser',
      title: '用户管理',
      icon: 'iconfont icon-yonghu',
      component: '',
      path: '',
      children: [
        {
          name: 'UserInfo',
          title: '用户信息',
          icon: 'iconfont  icon-liebiao',
          component: 'sys/User',
          path: '/sys/user',
          children: []
        },
        {
          name: 'SysRole',
          title: '角色管理',
          icon: 'iconfont  icon-liebiao',
          component: 'sys/Role',
          path: '/sys/role',
          children: []
        },
        {
          name: 'SysMenu',
          title: '菜单管理',
          icon: 'iconfont  icon-liebiao',
          component: 'sys/Menu',
          path: '/sys/menu',
          children: []
        }
      ]
    },
    {
      name: 'GoodsManager',
      title: '订单管理',
      icon: 'iconfont icon-yonghu',
      component: '',
      path: '',
      children: [
        {
          name: 'GoodSInfo',
          title: '订单信息',
          icon: 'iconfont  icon-liebiao',
          component: 'sys/GoodsOrder',
          path: '/sys/goodsorder',
          children: []
        }
      ]
    }
  ]
  const authoritys = []
  Result.data = {
    nav: nav,
    authoritys: authoritys
  }
  return Result
})

Mock.mock('/sys/menu/list', 'get', () => {
  let menus = [
    {
      id: 1,
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
      statu: 1,
      type: 0
    },
    {
      id: 2,
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄',
      statu: 0
    },
    {
      id: 3,
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄',
      type: 0,
      children: [{
        id: 31,
        date: '2016-05-01',
        name: '王小虎5555',
        address: '上海市普陀区金沙江路 1519 弄',
        type: 1
      },
      {
        id: 32,
        date: '2016-05-01',
        name: '王小虎5555',
        address: '上海市普陀区金沙江路 1519 弄',
        type: 2
      }]
    }
  ]
  Result.data = menus
  return Result
})

Mock.mock(RegExp('/sys/menu/info/*'),'get',() => {
  Result.data = {
    'id':3,
    'statu':1,
    'parentId':1,
    'name':'角色管理',
    'perms':'sys:role:list',
    'component':'sys/Role',
    'type':1,
    'orderNum':2
  }
  return Result
})

