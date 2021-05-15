<template>
<header>
    <el-menu mode="horizontal" class="nav_menu">
        <!--LOGO -->
        <div class="logo_box">
            <img src="./assets/react.png" class="logo_img"/>
            <span class="logo_text">环保应急管理系统</span>
        </div>
        <!--用户submenu -->
        <el-submenu index="1" class="user_submenu">
            <template #title><i class="el-icon-s-custom"></i><span>{{type}}</span></template>
            <el-menu-item index="1" class="user_submenu_item" @click="$store.commit('exit');$router.push('/')">{{subMenuItem1}}</el-menu-item>
        </el-submenu>
    </el-menu>
</header>

<main>
    <div><router-view></router-view></div>
</main>
</template>

<script>

export default {
  name: 'App',
  computed: {
    type () {
      switch (this.$store.state.userInformation.type) {
        case 'admin':
          return '管理员'
        case 'staff':
          return '工作员'
        case 'commander':
          return '指挥员'
        case 'expert':
          return '专家'
        default:
          return '访客'
      }
    },
    subMenuItem1 () {
      return this.type === '访客' ? '登录' : '退出'
    }
  }
}
</script>

<style lang="less">
header{
    .nav_menu{
        height:8vh;
        .logo_box{
            float:left;
            height:8vh;
            line-height:8vh;
            .logo_img{
                height:80%;
                vertical-align: middle;
                margin-left: 10px;
                margin-right: 10px;
            }
            .logo_text{
                font-family:fangsong;
                font-size:large;
                color:gray;
                vertical-align: middle;
                font-weight: bold;
            }
        }
        .user_submenu{
            float:right;
        }
    }
}

main{
    background-color: rgb(245, 245, 245);
}
</style>
