<template>
  <div v-show="isStep1">
        <el-breadcrumb style="font-size:18px;margin-top:10px;margin-left:10px" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/expert/reporthandle' }">接报管理</el-breadcrumb-item>
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
      <div>
        <el-steps :active="0" finish-status="success" space="20vw" style="margin-left:15vw;margin-top:20px;">
            <el-step title="流程 1"></el-step>
            <el-step title="流程 2"></el-step>
        </el-steps>
      </div>
      <el-row>
            <el-col :span="12" class="left">
              <div class="left_container">
                <h3>接报具体信息:</h3>
                <div><h5 style="display:inline-block;margin-top:60px;">灾害名称：</h5><span style="display:inline-block;margin-top:50px;">地震</span></div>
                <div><h5 style="display:inline-block;margin-top:60px;">灾害发生地点：</h5><span style="display:inline-block;margin-top:50px;">沈阳市和平区</span></div>
                <div><h5 style="display:inline-block;margin-top:60px;">灾害发生时间：</h5><span style="display:inline-block;margin-top:50px;">2021年5月1日</span></div>
              </div>
            </el-col>
            <el-col :span="12" class="right">
              <div class="right_container">
                <h3>接报具体内容:</h3>
                <p style="margin-top:20px;margin-right:10vw;height:80%;overflow:auto;line-height:2">
                  5月13日，两名巴勒斯坦男子在加沙城查看以军空袭造成的破坏情况。以色列总理内塔尼亚胡13日表示，以色列将继续对加沙地带进行军事打击。
                  5月10日至13日，以色列与加沙地带武装爆发严重冲突。加沙地带武装人员向以方发射1600余枚火箭弹，以军展开报复行动，
                  空袭加沙地带武装组织约600个军事目标，并打死哈马斯多名高级指挥官。
                  目前，双方冲突已导致以方7人死亡、100多人受伤，加沙地带67人死亡、近400人受伤。新华社发（里泽克·阿卜杜勒·贾瓦德摄）
                </p>
              </div>
            </el-col>
      </el-row>
      <div class="suggestion_container">
        <h3>审批建议：</h3>
        <div style="margin-right:10vw;margin-top:20px;"><el-input type="textarea" :rows="3" placeholder="请输入内容" resize="none"></el-input></div>
        <div style="margin-top:20px;margin-right:10vw;">
          <el-button type="primary" style="float:right;margin-right:10px;" @click="handleContinue">继续</el-button>
          <el-button type="danger" style="float:right;margin-right:10px;" @click="handleReject">驳回</el-button>
        </div>
      </div>
  </div>
  <div v-show="!isStep1">
        <el-breadcrumb style="font-size:18px;margin-top:10px;margin-left:10px" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/expert/reporthandle' }">接报管理</el-breadcrumb-item>
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-steps :active="1" finish-status="success" space="20vw" style="margin-left:15vw;margin-top:20px;">
            <el-step title="流程 1"></el-step>
            <el-step title="流程 2"></el-step>
        </el-steps>
        <div>
          <el-row>
            <el-col :span="14">
              <h3>灾害现场：</h3>
              <el-carousel trigger="click" height="60vh" indicator-position="outside">
                <el-carousel-item style="width:40vw;left:5vw;top:10px;">
                  <img style="width:100%" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp2.itc.cn%2Fq_70%2Fimages03%2F20200611%2Ffb06243a3016400bb9443de0aff3dded.jpeg&refer=http%3A%2F%2Fp2.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623636617&t=e85c495cfee4d43dc4d8e9dbfeb6f83d"/>
                </el-carousel-item >
                <el-carousel-item style="width:40vw;left:5vw;top:10px;">
                  <img style="width:100%" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cgs.gov.cn%2Fgzdt%2Fzsdw%2F202007%2FW020200710501172603275.jpg&refer=http%3A%2F%2Fwww.cgs.gov.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623637346&t=c42a9a7edcbaafe762e62cf72c761c64"/>
                </el-carousel-item>
                <el-carousel-item style="width:40vw;left:5vw;top:10px;">
                  <img style="width:100%" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3192595487,3508694680&fm=26&gp=0.jpg"/>
                </el-carousel-item>
              </el-carousel>
            </el-col>
            <el-col :span="10" style="border-left: 1px solid gray;">
              <h3 style="margin-left:20px;">审批建议：</h3>
              <div style="margin-left:20px;margin-right:5vw;margin-top:20px;"><el-input type="textarea" :rows="13" placeholder="请输入内容" resize="none"></el-input></div>
              <div style="margin-top:40px;margin-right:5vw;">
                <el-button type="primary" style="float:right;margin-left:10px;" @click="handleAllow">通过</el-button>
                <el-button type="danger" style="float:right;margin-left:10px;" @click="handleReject">驳回</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isStep1: true
    }
  },
  methods: {
    handleContinue () {
      this.$confirm('是否确定通过此流程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '通过!'
        })
        this.isStep1 = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消！'
        })
      })
    },
    handleReject () {
      this.$confirm('是否确定驳回该接报?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已驳回!'
        })
        this.$router.push('/expert/reporthandle')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消！'
        })
      })
    },
    handleAsk () {
      this.$confirm('是否确定询问专家?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已通知专家!'
        })
        this.$router.push('/expert/reporthandle')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消！'
        })
      })
    },
    handleAllow () {
      this.$confirm('是否确定通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已通过!'
        })
        this.$router.push('/expert/reporthandle')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消！'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.left{
  border-right: 1px solid gray;
  height: 40vh;
  margin-top:2vh;
  .left_container{
    height:100%;
    margin-left:15vw;
  }
}
.right{
  height: 40vh;
  margin-top:2vh;
  .right_container{
    height:100%;
    margin-left:5vw;
  }
}
.suggestion_container{
  margin-left:15vw;
  margin-top:5vh;
}

</style>
