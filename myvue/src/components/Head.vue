<template>
  <div id="head">
    <!-- <img src="./assets/logo.png"> -->
    <!--导航条-->
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      
    >
      <el-menu-item index="1">
        <router-link to="/home">首页</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/home">我的题库</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/addQuestion">我的工作台</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/home">学习</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/home">讨论区</router-link>
      </el-menu-item>

      <el-submenu index="6" v-if="showlogin!=null">
        <template slot="title">{{showlogin}}</template>
        <el-menu-item index="6-1">个人中心</el-menu-item>
        <el-menu-item index="6-2" @click.native="exit">退出</el-menu-item>
      </el-submenu>
      <el-menu-item index="7" v-else>
        <router-link to="/login">注册/登录</router-link>
      </el-menu-item>
      <!-- <el-menu-item index="6">
        <a href="http://www.cchbbo.cn" target="_blank">关于我们</a>
      </el-menu-item>-->
    </el-menu>

    <br />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Head",
  data(){
    return {
      showlogin:localStorage.getItem("username"),
      // showlogin: 'test',
      //有一个bug，如果刷新，不会跳转到首页但是显示却会到首页
      activeIndex:'1'
    }
  },
  methods:{
    exit(){
      //移除本地缓存
      console.log("exit")
    }
  }
};
</script>

<style>
#head {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
a {
  text-decoration: none;
}
</style>
