<template>
  <el-container>
    <el-aside width="200px">
      <!--      使用抽取的组件-->
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header>
        <strong>在线教育管理系统</strong>
        <div class="header-avater">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="medium"></el-avatar>
          <el-dropdown>
              <span class="el-dropdown-link">{{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <Tabs></Tabs>
<!--        上下为0，左右偏移15px-->
        <div style="margin: 0 15px"><router-view/></div>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import SideMenu from './inc/SideMenu'
import Tabs from './inc/Tabs'
export default {
  // 父级路由
  name: 'Home',
  // 声明index要使用的组件
  components: {
    SideMenu, Tabs
  },
  data () {
    return {
      userInfo: {
        id: '',
        username: ''
      }
    }
  },
  //  获取用户信息
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.$axios.get('/sys/userInfo').then(res => {
        this.userInfo = res.data.data
      })
    },
    logout () {
      this.$axios.post('/logout').then(res => {
        localStorage.clear()
        sessionStorage.clear()
        this.$store.commit('resetState')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-container {
    padding: 0;
    margin: 0;
    height: 100%;
  }
  .header-avater {
    float: right;
    display: flex;
    width: 120px;
    justify-content: space-around;
    align-items: center;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    line-height: 60px;

  }
  .el-main {
    background-color: #fff;
    padding: 0;
    text-align: left;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-submenu {
    text-align: left;
  }
</style>
