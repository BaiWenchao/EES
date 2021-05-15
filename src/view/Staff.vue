<template>
<el-row class="container">
    <!-- 左侧导航栏 -->
    <el-col :span="3" class="container_left" :style="styleObject">
        <el-menu default-active="1" class="menu">
            <el-menu-item index="1" class="menu_item">
                <i class="el-icon-user-solid"></i>
                <template #title>人员维护</template>
            </el-menu-item>
        </el-menu>
    </el-col>
    <!-- 右侧主内容 -->
    <el-col :span="21" class="container_right" :style="styleObject">

    </el-col>
</el-row>
</template>

<script>
export default {
  name: 'staff',
  mounted () {
    this.styleObject.height = (Math.max(document.getBoundingClientRect().height, window.innerHeight) - this.$el.getBoundingClientRect().top) + 'px'
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
