<template>
  <div>
        <el-breadcrumb style="font-size:18px;margin-top:10px;margin-left:10px" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/commander/reporthandle' }">接报管理</el-breadcrumb-item>
          <el-breadcrumb-item>紧急事件处理</el-breadcrumb-item>
        </el-breadcrumb>
        <div style="margin-top:30px;">
            <span style="margin-left:30px;color:gray">当前事件名称：</span>地震
            <span style="margin-left:30px;color:gray">当前事件编号：</span>001
            <el-button type="text" icon="el-icon-search" style="float:right;margin-right:10px">高级筛选</el-button>
            <el-button type="text" icon="el-icon-refresh-left" style="float:right;margin-right:5px" @click="filterList=reportInfo">取消筛选</el-button>
            <el-input size="mini" placeholder="输入关键字搜索" style="width:20%;float:right;margin-top:5px;">
                <template #append><el-button icon="el-icon-search"></el-button></template>
            </el-input>
        </div>
        <el-table :data="materialInfo" tooltip-effect="dark" style="width: 100%" @select="handleSelect" @select-all="handleSelect">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="name" label="物资名称" width="150"></el-table-column>
          <el-table-column prop="amount" label="物资数量" width="120"></el-table-column>
          <el-table-column prop="type" label="物资类型" width="150"></el-table-column>
          <el-table-column prop="counter" label="物资清点人" width="150"></el-table-column>
          <el-table-column prop="counterTelephone" label="物资清点人电话" width="150"></el-table-column>
          <el-table-column prop="number" label="物资编号" width="150"></el-table-column>
          <el-table-column prop="countTime" label="物资清点时间" width="150"></el-table-column>
          <el-table-column prop="nearest" label="最近物资点"></el-table-column>
        </el-table>
        <div style="margin-top:10px"><el-button type="primary" style="float:right;margin-right:40px;width:100px;" @click="handleDispatch">调度</el-button></div>
        <div class="pagination">
            <el-pagination
            :current-page="1"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, prev, pager, next, jumper"
            :total="400">
            </el-pagination>
        </div>
        <el-dialog title="调度" v-model="dispatchDialogVisible" width="30%" center>
            <div v-for="item of selectedMaterial" :key="item.name" style="text-align:center;margin-bottom:20px;">
              <span style="display:inline-block;width:70px">{{item.name}}：</span><el-input style="width:60%;display:inline-block;" placeholder="请输入物资数量,默认为0"></el-input>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dispatchDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dispatchDialogVisible = false ;$message({type: 'success',message: '调度成功!'})">确 定</el-button>
                </span>
            </template>
        </el-dialog>
  </div>
</template>

<script>
import { materialInfo } from '../../mockData/index.js'
import { ElMessage } from 'element-plus'
export default {
  data () {
    return {
      materialInfo: materialInfo,
      selectedMaterial: [],
      dispatchDialogVisible: false
    }
  },
  methods: {
    handleSelect (selection) {
      const tempArr = []
      for (const i in selection) {
        tempArr.push(selection[i])
      }
      this.selectedMaterial = tempArr
    },
    handleDispatch () {
      if (this.selectedMaterial.length === 0) {
        ElMessage.error('请至少选中一个物资来进行调度！')
      } else {
        this.dispatchDialogVisible = true
      }
    }
  }
}
</script>

<style>

</style>
