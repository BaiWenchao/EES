<template>
  <div>
    <el-breadcrumb style="font-size:18px;margin-top:10px;margin-left:10px;margin-bottom:10px;" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>城市信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
        <el-button type="text" icon="el-icon-document-add" style="margin-left:10px;margin-right:10px;" @click="newDialogVisible=true">新增</el-button>
        <el-button type="text" icon="el-icon-search" style="float:right;margin-right:10px" @Click="searchDialogVisible=true">高级筛选</el-button>
        <el-button type="text" icon="el-icon-refresh-left" style="float:right;margin-right:5px" @click="filterList=reportInfo">取消筛选</el-button>
        <el-input size="mini" placeholder="输入关键字搜索" style="width:20%;float:right;margin-top:5px;" v-model="key">
            <template #append><el-button icon="el-icon-search" @click="key=''"></el-button></template>
        </el-input>
    </div>

    <el-table :data="cityMaintainInfo" style="width: 100%" stripe>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="cityName" label="城市名称"></el-table-column>
        <el-table-column prop="cityNumber" label="城市编号"></el-table-column>
        <el-table-column prop="province" label="省份"></el-table-column>
        <el-table-column prop="people" label="救援人数"></el-table-column>
        <el-table-column prop="vehicle" label="救援车辆数"></el-table-column>
        <el-table-column align="center" label="操作" width="300px">
            <template #default="scope">
                <el-button size="mini" type="text" icon="el-icon-document" @click="handleEdit(scope.row)">修改</el-button>
                <el-button size="mini" type="text" icon="el-icon-warning-outline" @click="handleDelete(scope.row)">删除</el-button>
                <el-button size="mini" type="text" icon="el-icon-document" @click="$router.push('/staff/transportmaintain')">交通情况</el-button>
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
        <el-form :model="editForm" label-width="120px" label-position="left">
            <el-form-item label="ID" required>
                <el-input v-model="editForm.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="城市名称" required>
                <el-input v-model="editForm.cityName"></el-input>
            </el-form-item>
            <el-form-item label="城市编号" required>
                <el-input v-model="editForm.cityNumber"></el-input>
            </el-form-item>
            <el-form-item label="省份" required>
                <el-input v-model="editForm.province"></el-input>
            </el-form-item>
            <el-form-item label="救援人数" required>
                <el-input v-model="editForm.people"></el-input>
            </el-form-item>
            <el-form-item label="救援车辆数" required>
                <el-input v-model="editForm.vehicle"></el-input>
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
                <el-form :model="advancedSearchForm" label-width="120px" label-position="left">
                    <el-form-item label="ID" required>
                        <el-input v-model="advancedSearchForm.id"></el-input>
                    </el-form-item>
                    <el-form-item label="城市名称" required>
                        <el-input v-model="advancedSearchForm.cityName"></el-input>
                    </el-form-item>
                    <el-form-item label="城市编号" required>
                        <el-input v-model="advancedSearchForm.cityNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="省份" required>
                        <el-input v-model="advancedSearchForm.province"></el-input>
                    </el-form-item>
                    <el-form-item label="救援人数" required>
                        <el-input v-model="advancedSearchForm.people"></el-input>
                    </el-form-item>
                    <el-form-item label="救援车辆数" required>
                        <el-input v-model="advancedSearchForm.vehicle"></el-input>
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
import { cityMaintainInfo } from '../../mockData/index.js'
export default {
  data () {
    return {
      key: '',
      cityMaintainInfo: cityMaintainInfo,
      editDialogVisible: false,
      editForm: {
        id: '',
        cityName: '',
        cityNumber: '',
        province: '',
        people: '',
        vehicle: ''
      },
      newDialogVisible: false,
      searchDialogVisible: false,
      advancedSearchForm: {
        id: '',
        cityName: '',
        cityNumber: '',
        province: '',
        people: '',
        vehicle: ''
      }
    }
  },
  methods: {
    handleNew () {
      if (this.advancedSearchForm.id === '') {
        this.$message({ type: 'error', message: '请填写完整!' })
        return
      }
      this.newDialogVisible = false
      this.$message({ type: 'success', message: '新建成功!' })
      this.advancedSearchForm = {
        id: '',
        cityName: '',
        cityNumber: '',
        province: '',
        people: '',
        vehicle: ''
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
