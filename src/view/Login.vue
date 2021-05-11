<template>
<el-row type="flex" justify="space-between" align=middle class="login_box" :style="styleObject">
    <el-col :span="9" :xs="{span:0}">
        <div class="login_box_left">
            <img style="height:100%" src="https://pass.neu.edu.cn/tpass/comm/neu/image/login-pic-04.png"/>
        </div>
    </el-col>
    <el-col :span="8" :xs="{span:18,offset:5}">
        <div class="login_box_right">
            <el-form :model="loginForm" :rules="loginRules" label-width="80px" class="login_form">
                <p class="login_title">Login</p>
                <el-form-item prop="username" label="账号" class="login_form_item">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码" class="login_form_item">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login_form_button">登录</el-button>
                </el-form-item>
                <el-button type="text" style="float:right;margin-right:30px;">忘记密码</el-button>
            </el-form>
      </div>
    </el-col>
</el-row>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      styleObject: {},
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.styleObject.height = (window.innerHeight - this.$el.getBoundingClientRect().top) + 'px'
  }
}
</script>

<style lang="less" scoped>
.login_box{
    min-width:780px;
    .login_left_box{
        height:60vh
    }
    .login_box_right{
        width:100%;
        height:60vh;
        position:relative;
        background-color: rgba(238, 238, 238, 0.993);
        border-radius: 4px;
        border: 1px solid rgba(247, 247, 247, 0.993);
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        .login_form{
            .login_title{
                font-size: 30px;
                color:gray;
                font-family: fangsong;
                margin-bottom: 30px;
                margin-top:120px;
            }
            text-align: center;
            width:100%;
            position:absolute;
            top:40%;
            transform:translateY(-50%);
            .login_form_item{
                width:85%
            }
            .login_form_button{
                margin-right: 80px;
                margin-top: 20px;
                width:50%;
                word-spacing: 50px;
            }
        }
    }
}
</style>
