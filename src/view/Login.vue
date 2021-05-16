<template>
<el-row type="flex" justify="space-between" align=middle class="login_box" :style="styleObject">
    <el-col :span="9" :xs="{span:0}">
        <div class="login_box_left">
            <img style="height:100%" src="https://pass.neu.edu.cn/tpass/comm/neu/image/login-pic-04.png"/>
        </div>
    </el-col>
    <el-col :span="8" :xs="{span:18,offset:5}">
        <div class="login_box_right">
            <el-form :model="loginForm" :rules="loginRules" label-width="80px" class="login_form" v-show="!isFindPassword">
                <p class="login_title">Login</p>
                <el-form-item prop="account" label="账号" class="login_form_item">
                    <el-input v-model="loginForm.account" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码" class="login_form_item">
                    <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login_form_button" @click="login">登录</el-button>
                </el-form-item>
                <el-button type="text" style="float:right;margin-right:30px;" @click="isFindPassword=!isFindPassword">忘记密码</el-button>
            </el-form>

            <el-form :model="findPasswordForm" :rules="findPasswordRules" label-width="80px" class="login_form" v-show="isFindPassword">
                <p class="login_title">Find Password</p>
                <el-form-item prop="account" label="账号" class="login_form_item">
                    <el-input v-model="findPasswordForm.account" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱" class="login_form_item">
                    <el-input v-model="findPasswordForm.email" prefix-icon="el-icon-message"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login_form_button" @click="confirmFind">确认提交</el-button>
                </el-form-item>
                <el-button type="text" style="float:right;margin-right:30px;" @click="isFindPassword=!isFindPassword">去登录</el-button>
            </el-form>
      </div>
    </el-col>
</el-row>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  name: 'Login',
  data () {
    return {
      styleObject: {},
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      isFindPassword: false,
      findPasswordForm: {
        account: '',
        email: ''
      },
      findPasswordRules: {
        account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
      }
    }
  },
  methods: {
    confirmFind () {
      if (this.findPasswordForm.account === '' || this.findPasswordForm.email === '') {
        ElMessage.error({
          message: '请填写账号和邮箱',
          type: 'error'
        })
      } else {
        this.findPasswordForm.account = ''
        this.findPasswordForm.email = ''
        ElMessage.success({
          message: '提交成功',
          type: 'success'
        })
        this.isFindPassword = !this.isFindPassword
      }
    },
    login () {
      if (this.loginForm.account === '1') {
        this.$router.push('/admin')
      }
      switch (this.loginForm.account) {
        case '1':
          this.$router.push('/admin')
          this.$store.commit('login', { type: 'admin' })
          break
        case '2':
          this.$router.push('/staff')
          this.$store.commit('login', { type: 'staff' })
          break
        case '3': this.$router.push('/commander/reporthandle')
          this.$store.commit('login', { type: 'commander' })
          break
        case '4': this.$router.push('/expert/reporthandle')
          this.$store.commit('login', { type: 'expert' })
          break
      }
    }
  },
  mounted () {
    this.styleObject.height = (window.innerHeight - this.$el.getBoundingClientRect().top) + 'px'
    console.log(this.isFindPassword)
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
