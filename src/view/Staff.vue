<template>
<el-row class="container">
    <!-- 左侧导航栏 -->
    <el-col :span="3" class="container_left" :style="styleObject">
        <el-menu default-active="1" class="menu" router>
            <el-menu-item index="1" class="menu_item">
                <i class="el-icon-document-copy"></i>
                <template #title>事件管理</template>
            </el-menu-item>
            <el-menu-item index="/staff/eventmaintain" class="menu_item">
                <i class="el-icon-document-checked"></i>
                <template #title>事件维护</template>
            </el-menu-item>
            <el-menu-item index="/staff/materialmaintain" class="menu_item">
                <i class="el-icon-box"></i>
                <template #title>物资信息</template>
            </el-menu-item>
            <el-menu-item index="/staff/materialLocation" class="menu_item">
                <i class="el-icon-location-outline"></i>
                <template #title>物资点信息</template>
            </el-menu-item>
            <el-menu-item index="/staff/processmaintain" class="menu_item">
                <i class="el-icon-user-solid"></i>
                <template #title>流程维护</template>
            </el-menu-item>
            <el-menu-item index="/staff/enterprisemaintain" class="menu_item">
                <i class="el-icon-school"></i>
                <template #title>风险企业维护</template>
            </el-menu-item>
            <el-menu-item index="7" class="menu_item">
                <i class="el-icon-office-building"></i>
                <template #title>城市信息维护</template>
            </el-menu-item>
            <el-menu-item index="8" class="menu_item">
                <i class="el-icon-guide"></i>
                <template #title>交通情况管理</template>
            </el-menu-item>
            <el-menu-item index="9" class="menu_item">
                <i class="el-icon-phone-outline"></i>
                <template #title>接报维护</template>
            </el-menu-item>
        </el-menu>
    </el-col>
    <!-- 右侧主内容 -->
    <el-col :span="21" class="container_right" :style="styleObject">
        <router-view></router-view>
    </el-col>
</el-row>
</template>

<script>
export default {
  name: 'staff',
  data () {
    return {
      styleObject: {}
    }
  },
  mounted () {
    this.styleObject.height = (Math.max(document.querySelector('body').getBoundingClientRect().height, window.innerHeight) - this.$el.getBoundingClientRect().top) + 'px'
  }
}
</script>

<style lang="less" scoped>
.container{
    width:100%;
    .container_left{
        background-color: rgba(231, 231, 231, 0.993);
        .menu{
            border-right: initial;
            background-color: rgba(219, 217, 217, 0.993);
            .menu_item{
                border-bottom: 1px solid rgba(231, 231, 231, 0.993);
            }
        }
    }
    .container_right{
        border-left:2px solid white;
    }
}
</style>
