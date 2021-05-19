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

    <el-table :data="enterpriseMaintainInfo" style="width: 100%" stripe>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="enterpriseName" label="企业名称"></el-table-column>
        <el-table-column prop="enterpriseLocation" label="企业地址"></el-table-column>
        <el-table-column prop="corporate" label="法人"></el-table-column>
        <el-table-column prop="corporateTelephone" label="法人电话"></el-table-column>
        <el-table-column prop="enterpriseType" label="企业类型"></el-table-column>
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

    <el-dialog title="修改" v-model="editDialogVisible" width="40%" center>
        <el-form :model="editForm" label-width="80px" label-position="left">
            <el-form-item label="ID" required>
                <el-input v-model="editForm.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="企业名称" required>
                <el-input v-model="editForm.enterpriseName"></el-input>
            </el-form-item>
            <el-form-item label="企业地址" required>
                <el-input v-model="editForm.enterpriseLocation"></el-input>
            </el-form-item>
            <el-form-item label="法人" required>
                <el-input v-model="editForm.corporate"></el-input>
            </el-form-item>
            <el-form-item label="法人电话" required>
                <el-input v-model="editForm.corporateTelephone"></el-input>
            </el-form-item>
            <el-form-item label="企业类型" required>
                <el-input v-model="editForm.enterpriseType"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editDialogVisible = false ;$message({type: 'success',message: '编辑成功!'})">确 定</el-button>
            </span>
        </template>

        </el-dialog>
            <el-dialog title="新增" v-model="newDialogVisible" width="40%" center>
                <el-form :model="advancedSearchForm" label-width="80px" label-position="left">
                    <el-form-item label="ID" required>
                        <el-input v-model="advancedSearchForm.id"></el-input>
                    </el-form-item>
                    <el-form-item label="企业名称" required>
                        <el-input v-model="advancedSearchForm.enterpriseName"></el-input>
                    </el-form-item>
                    <el-form-item label="企业地址" required>
                        <el-input v-model="advancedSearchForm.enterpriseLocation"></el-input>
                    </el-form-item>
                    <el-form-item label="法人" required>
                        <el-input v-model="advancedSearchForm.corporate"></el-input>
                    </el-form-item>
                    <el-form-item label="法人电话" required>
                        <el-input v-model="advancedSearchForm.corporateTelephone"></el-input>
                    </el-form-item>
                    <el-form-item label="企业类型" required>
                        <el-input v-model="advancedSearchForm.enterpriseType"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="newDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="handleNew">新 建</el-button>
                    </span>
                </template>
            </el-dialog>

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
              <el-button type="primary" @click="searchDialogVisible = false">筛 选</el-button>
          </span>
      </template>
  </el-dialog>
  </div>
</template>

<script>
import { enterpriseMaintainInfo } from '../../mockData/index.js'
export default {
  data () {
    return {
      key: '',
      searchDialogVisible: false,
      enterpriseMaintainInfo: enterpriseMaintainInfo,
      editDialogVisible: false,
      editForm: {
        id: '',
        enterpriseName: '',
        enterpriseLocation: '',
        corporate: '',
        corporateTelephone: '',
        enterpriseType: ''
      },
      newDialogVisible: false,
      advancedSearchForm: {
        id: '',
        enterpriseName: '',
        enterpriseLocation: '',
        corporate: '',
        corporateTelephone: '',
        enterpriseType: ''
      }
    }
  },
  methods: {
    handleNew () {
      if (this.advancedSearchForm.id === '') {
        this.$message({ type: 'error', message: '请填写完整!' })
        return
      }
      this.enterpriseMaintainInfo.unshift(this.advancedSearchForm)
      this.newDialogVisible = false
      this.$message({ type: 'success', message: '新建成功!' })
      this.advancedSearchForm = {
        id: '',
        enterpriseName: '',
        enterpriseLocation: '',
        corporate: '',
        corporateTelephone: '',
        enterpriseType: ''
      }
    },
    handleEdit (row) {
      this.editDialogVisible = true
      for (const i in this.editForm) {
        this.editForm[i] = row[i]
      }
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该流程( ID：' + row.id + ' ), 是否继续?', '提示', {
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
  }
}
</script>

<style>

</style>
