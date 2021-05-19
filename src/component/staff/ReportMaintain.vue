<template>
  <div>
        <div>
            <el-button type="text" icon="el-icon-document-add" style="margin-left:10px;margin-right:10px;" @click="newDialogVisible=true">新增</el-button>
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
            <el-table-column prop="state" label="状态" width="120">
                <template #default="scope"> <el-tag size="medium" :type="mapStateToTag(scope.row.state)" @click="stateFilter(scope.row.state)" style="cursor:pointer">{{ scope.row.state }}</el-tag></template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template #default="scope">
                  <el-button size="mini" type="text" icon="el-icon-document" @click="handleEdit(scope.row)">修改</el-button>
                  <el-button size="mini" type="text" icon="el-icon-warning-outline" @click="handleDelete(scope.row)">删除</el-button>
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
              <el-button type="primary" @click="handleAdvancedSearch">筛 选</el-button>
          </span>
      </template>
  </el-dialog>

    <el-dialog title="修正接报内容" v-model="editDialogVisible" width="40%" center>
    <el-form :model="editForm" label-width="80px" label-position="left">
          <el-form-item label="ID">
              <span>{{editForm.id}}</span>
          </el-form-item>
          <el-form-item label="事件名称">
              <span>{{editForm.eventName}}</span>
          </el-form-item>
          <el-form-item label="代码">
              <span>{{editForm.number}}</span>
          </el-form-item>
          <el-form-item label="流程编号">
              <span>{{editForm.processNumber}}</span>
          </el-form-item>
          <el-form-item label="报警人">
              <span>{{editForm.callerName}}</span>
          </el-form-item>
          <el-form-item label="报警电话">
              <span>{{editForm.callerTelephone}}</span>
          </el-form-item>
          <el-form-item label="接报时间">
              <span>{{editForm.callTime}}</span>
          </el-form-item>
          <el-form-item label="修改内容">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="editTextarea" resize="none"></el-input>
          </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editDialogVisible = false ;$message({type: 'success',message: '编辑成功!'})">确 定</el-button>
        </span>
    </template>
    </el-dialog>

    <el-dialog title="新增" v-model="newDialogVisible" width="40%" center top="5vh">
      <el-form :model="advancedSearchForm" label-width="80px" label-position="left">
          <el-form-item label="创建者">
              <span>王鑫</span>
          </el-form-item>
          <el-form-item label="事件名称" required>
              <el-input v-model="advancedSearchForm.eventName"></el-input>
          </el-form-item>
          <el-form-item label="报警人" required>
              <el-input v-model="advancedSearchForm.callerName"></el-input>
          </el-form-item>
          <el-form-item label="报警电话" required>
              <el-input v-model="advancedSearchForm.callerTelephone"></el-input>
          </el-form-item>
          <el-form-item label="接报时间" required>
              <el-date-picker v-model="advancedSearchForm.time"></el-date-picker>
          </el-form-item>
            <el-form-item label="具体内容" required>
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="editTextarea" resize="none"></el-input>
          </el-form-item>
      </el-form>
      <template #footer>
          <span class="dialog-footer">
              <el-button @click="newDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleNew">新 增</el-button>
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
      newDialogVisible: false,
      editDialogVisible: false,
      editForm: {
        id: '',
        eventName: '',
        number: '',
        processNumber: '',
        callerName: '',
        callerTelephone: '',
        callTime: '',
        type: '',
        state: ''
      },
      editTextarea: '今天早上我走在大街上，感觉到地摇动了一下，可能地震了',
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
    handleAdvancedSearch () {
      this.filterList = this.filterList.filter((i) => i.id === this.advancedSearchForm.id)
      this.advancedSearchForm = {
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
      this.searchDialogVisible = false
    },
    handleNew () {
      if (this.advancedSearchForm.eventName === '') {
        this.$message({ type: 'error', message: '请填写名称!' })
        return
      }
      this.filterList.unshift(this.advancedSearchForm)
      this.advancedSearchForm = {
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
      this.newDialogVisible = false
      this.$message({ type: 'success', message: '新建成功!' })
    },
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
    },
    handleEdit (row) {
      this.editDialogVisible = true
      for (const i in this.editForm) {
        this.editForm[i] = row[i]
      }
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该接报( ID：' + row.id + ' ), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.filterList = this.reportInfo
  }
}
</script>

<style>

</style>
