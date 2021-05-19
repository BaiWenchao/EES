<template>
  <div>
        <div>
            <el-button type="text" icon="el-icon-search" style="float:right;margin-right:10px" @Click="searchDialogVisible=true">高级筛选</el-button>
            <el-button type="text" icon="el-icon-refresh-left" style="float:right;margin-right:5px" @click="filterList=reportInfo">取消筛选</el-button>
        <el-input size="mini" placeholder="输入关键字搜索" style="width:20%;float:right;margin-top:5px;" v-model="key">
            <template #append><el-button icon="el-icon-search" @click="key=''"></el-button></template>
            </el-input>
        </div>

        <el-table :data="filterList" style="width: 100%" stripe>
            <el-table-column type="expand">
            <template #default="props">
                <div style="display:flex;justify-content:space-around">
                    <span><span style="color: #99a9bf;">流程创建者: </span> {{ props.row.processCreater }}</span>
                    <span><span style="color: #99a9bf;">流程创建时间: </span> {{ props.row.processCreateTime }}</span>
                </div>
                <div style="display:flex;justify-content:space-around;margin-top:30px;">
                    <span><span style="color: #99a9bf;">最后更新者编号: </span>{{ props.row.updaterNumber }}</span>
                    <span><span style="color: #99a9bf;">最后更新时间: </span>{{ props.row.updateTime }}</span>
                </div>
            </template>
            </el-table-column>
            <el-table-column prop="id" label="ID" width="120"></el-table-column>
            <el-table-column prop="eventName" label="事件名称" width="150"></el-table-column>
            <el-table-column prop="number" label="代码" width="150"></el-table-column>
            <el-table-column prop="processNumber" label="流程编号" width="150"></el-table-column>
            <el-table-column prop="callerName" label="报警人" width="150"></el-table-column>
            <el-table-column prop="callerTelephone" label="报警人电话" width="150"></el-table-column>
            <el-table-column prop="callTime" label="接报时间" width="150"></el-table-column>
            <el-table-column prop="state" label="账号状态" width="120">
                <template #default="scope"> <el-tag size="medium" :type="mapStateToTag(scope.row.state)" @click="stateFilter(scope.row.state)" style="cursor:pointer">{{ scope.row.state }}</el-tag></template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template #default="scope">
                  <el-button size="mini" type="text" icon="el-icon-document" @click="$router.push('/commander/approval')">详情</el-button>
                  <el-button size="mini" type="text" icon="el-icon-warning-outline" :disabled="!(scope.row.state==='通过')" @click="$router.push('/commander/emergencyhandle')">处理</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination" style="margin-top:5px;">
            <el-pagination
            :current-page="1"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, prev, pager, next, jumper"
            :total="400">
            </el-pagination>
        </div>
  </div>

  <el-dialog title="高级筛选" v-model="searchDialogVisible" width="40%" center top="5vh">
      <el-form :model="advancedSearchForm" label-width="80px" label-position="left">
          <el-form-item label="ID">
              <el-input v-model="advancedSearchForm.id"></el-input>
          </el-form-item>
          <el-form-item label="事件名称">
              <el-input v-model="advancedSearchForm.eventname"></el-input>
          </el-form-item>
          <el-form-item label="代码">
              <el-input v-model="advancedSearchForm.number"></el-input>
          </el-form-item>
          <el-form-item label="流程编号">
              <el-input v-model="advancedSearchForm.processNumber"></el-input>
          </el-form-item>
          <el-form-item label="报警人">
              <el-input v-model="advancedSearchForm.callerName"></el-input>
          </el-form-item>
          <el-form-item label="报警电话">
              <el-input v-model="advancedSearchForm.callerTelephone"></el-input>
          </el-form-item>
          <el-form-item label="接报时间">
              <el-date-picker v-model="advancedSearchForm.time">
                  <template #prepend>
                      <el-select v-model="advancedSearchForm.regular" style="width:100px;">
                          <el-option label="大 于" value=">"></el-option>
                          <el-option label="等 于" value="="></el-option>
                          <el-option label="小 于" value="<"></el-option>
                      </el-select>
                  </template>
              </el-date-picker>
          </el-form-item>
          <el-form-item label="状态">
              <el-select v-model="advancedSearchForm.state">
                  <el-option :value="'pending'" :label="'未处理'"></el-option>
                  <el-option :value="'rejected'" :label="'驳回'"></el-option>
                  <el-option :value="'allowed'" :label="'通过'"></el-option>
              </el-select>
          </el-form-item>
      </el-form>
      <template #footer>
          <span class="dialog-footer">
              <el-button @click="searchDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="searchDialogVisible = false">筛 选</el-button>
          </span>
      </template>
  </el-dialog>
</template>

<script>
import { reportInfo } from '../../mockData/index.js'
export default {
  data () {
    return {
      key: '',
      reportInfo: reportInfo,
      filterList: [],
      searchDialogVisible: false,
      advancedSearchForm: {
        id: '',
        eventName: '',
        number: '',
        processNumber: '',
        callerName: '',
        callerTelephone: '',
        callTime: '',
        type: '',
        state: ''
      }
    }
  },
  methods: {
    mapStateToTag (state) {
      switch (state) {
        case '通过':
          return 'success'
        case '待审批':
          return 'warning'
        case '驳回':
          return 'danger'
        default:
          return ''
      }
    },
    stateFilter (state) {
      this.filterList = this.reportInfo.filter((item) => { return item.state === state })
    }
  },
  created () {
    this.filterList = this.reportInfo
  }
}
</script>

<style>

</style>
