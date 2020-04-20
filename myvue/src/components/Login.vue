<template>
  <div>
    <div class="regedit">
      <!-- 选项卡 -->
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label" class="titlte">注册</span>
          <!-- 注册 -->
          <!-- 选项卡 -->
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rls"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model.number="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="submitForm('ruleForm')">注册</el-button>
              <el-button @click.native="resetForm('ruleForm')">重置</el-button>
              <!-- <el-button plain @click.native="open1" id="rerror"></el-button> -->
            </el-form-item>
          </el-form>
          <!-- 注册 -->
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" class="titlte">登录</span>
          <!-- 登录 -->
          <el-form status-icon :rules="rls" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名">
              <el-input type="text" v-model.number="ruleForm.username" id="uname"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model.number="ruleForm.password" id="pass"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native="login">登录</el-button>
              <el-button @click.native="resetForm">重置</el-button>
              <!-- <el-button plain @click.native="open1" id="lerror"></el-button> -->
            </el-form-item>
          </el-form>
          <!-- 登录 -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
// import Head from "../../components/common/Head";
import axios from "axios";
// import Qs from "qs";
// import router from "../../router/router.js";
export default {
  //   components: {
  //     Head
  //   },
  data() {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        console.log("value");
        console.log(value);
        //   var user = Object.create(null)
        axios
          .get("http://localhost:8004/user/findUserByUserName", {
            username: value
          })
          .then(res => {
            console.log("res");
            console.log(res.data.code);
            if (res.data.code == 204) {
              return callback(new Error("该用户名已经注册"));
            }
          });
        callback();
      }
    };
    var vapass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var varepass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        checkPass: "",
        username: ""
      },
      rls: {
        password: [{ validator: vapass, trigger: "blur" }],
        checkPass: [{ validator: varepass, trigger: "blur" }],
        username: [{ validator: checkUser, trigger: "blur" }]
      }
    };
  },
  methods: {
    //注册
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          /*在这里进行跨域请求*/
          this.axios({
            method: "post",
            url: "http://localhost:8004/auth/register",
            // data: Qs.stringify(this.ruleForm)
            data: {
              username: this.ruleForm.username,
              password: this.ruleForm.password
            }
          })
            .then(function(res) {
              console.log("登录返回")
              console.log(res.data)
              if (res.data.code == 250) {
                //提示信息
                alert("用户名已经存在")
                //将输入框清空
                
                //提示信息
              } else {
                //跳转到首页
                this.$router.push("/home");
              }
            })
            .catch(function(err) {
              console.log(err);
            });
          /*在这里进行跨域请求*/
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      //   this.$refs[formName].resetFields();
      this.ruleForm.username = "";
      this.ruleForm.password = "";
      this.ruleForm.checkPass = "";
    },
    open1() {
      this.$notify.error({
        title: "错误",
        message: "用户名已存在，换一个试试吧"
      });
    },
    login() {
      //登录，把表单的数据传过来
      var uname = document.getElementById("uname").value;
      var pass = document.getElementById("pass").value;
      let data = {
        username: uname,
        password: pass
      };
      /*在这里进行跨域请求*/
      this.axios({
        method: "post",
        url: "http://localhost:8004/auth/login",
        data: {
          username: uname,
          password: pass
        }
      })
        .then(res => {
          console.log("登录返回信息");
          console.log(res.data);
          if (res.data.status != "200") {
            //提示信息
            alert("用户名或密码输入不正确");
            //提示信息
          } else {
            //把用户名、登录身份、头像存储起来
            localStorage.setItem("uid", res.data.uid);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username",res.data.username)
            // if (res.data == "" || res.data == null) {
            //   localStorage.setItem("logo", "../../img/my.png");
            // } else {
            //   localStorage.setItem("logo", res.data);
            // }
            //刷新界面
            // window.reload();
            //跳转到首页
            this.$router.push("/home");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      /*在这里进行跨域请求*/
      //登录，把表单的数据传过来
    }
  }
};
</script>
<style>
.regedit {
  width: 50%;
  height: 40%;
  margin-left: 33%;
}
.titlte {
  font-size: 30px;
}
</style>