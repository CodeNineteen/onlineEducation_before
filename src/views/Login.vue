<template>
  <div class="login_container ">
    <div class="login_box ">
<!--      头像区域-->
      <div class="avater_box">
           <img src="../assets/logo.png" alt="">
      </div>
<!--   登录表单区域     -->
<!--   ref将FORM表单注册成一个实例-->
      <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
<!--  用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
<!--  密码-->
        <el-form-item prop="password" >
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>

        <el-form-item prop="code" >
          <el-input v-model="loginForm.code"  style="width: 70%; float:left" ></el-input>
          <el-image :src="captchaImg"  class="captchaImg"  @click="getCaptcha"></el-image>
        </el-form-item>
<!--  按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login ('loginForm')">登录</el-button>
          <el-button type="info" @click="resetLoginForm ('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'Login',
  data () {
    return {
      // 登陆表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '111111',
        code: '',
        token: ''
      },
      // 表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        // required表示是必填项
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '长度为5个字符', trigger: 'blur' }
        ]
      },
      captchaImg: null
    }
  },

  methods: {
    // 点击重置按钮。重置登录表单
    resetLoginForm (formName) {
      console.log(this)
      this.$refs[formName].resetFields()
    },
    // 登录组件根据预验证是否发起请求
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login?'+ qs.stringify(this.loginForm)).then(res => {
            const jwt = res.headers['authorization']
            // 将jwt存储到应用store中
            this.$store.commit('SET_TOKEN', jwt)
            //验证通过转入index页面
            this.$router.push("/index")
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCaptcha () {
      this.$axios.get('/captcha').then(res => {
        console.log('/captcha')
        console.log(res)
        this.loginForm.token = res.data.data.token
        this.captchaImg = res.data.data.captchaImg
        this.loginForm.code =''
      })
    }
  },
  created () {
    this.getCaptcha()
  }
}
</script>
<style  lang="less" scoped>
  .login_container {
    background-color: #F2F2F2;
    height: 100% ;
  }
  .login_box {
    width: 450px;
    height: 400px;
    background-color: #E6E6E6;
    border-right: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    /*头像设置*/
    .avater_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;

      }
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .captchaImg {
    float: left;
    margin-left: 5px;
    border-radius:4px ;
    width: 28%;
  }
.btns {
  display: flex;
  justify-content: flex-end;
}

</style>
