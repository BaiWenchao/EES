<template>
<div>
<el-tabs type="border-card" editable @edit="handleTabsEdit" v-model="editableTabsValue">
  <el-tab-pane :key="item.name" v-for="(item) in editableTabs" :label="item.title" :name="item.name">
    <div>
        <div style="border-bottom:1px solid rgb(245, 245, 245)">
            <el-button type="text" icon="el-icon-document-add" style="margin-left:10px;margin-right:10px;" @click="current=item.name;newDialogVisible=true">新增</el-button>
            <el-button type="text" icon="el-icon-search" style="float:right;margin-right:10px" @Click="searchDialogVisible=true;current=item.name">高级筛选</el-button>
            <el-button type="text" icon="el-icon-refresh-left" style="float:right;margin-right:5px" @click="handelCancel">取消筛选</el-button>
            <el-input size="mini" placeholder="输入关键字搜索" style="width:20%;float:right;margin-top:5px;" v-model="searchKey">
                <template #append><el-button icon="el-icon-search" @click="current=item.name;handleSearch()"></el-button></template>
            </el-input>
        </div>

        <el-table :data="filterList[item.name]" style="width: 100%" stripe>
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="disasterName" label="灾害名称"></el-table-column>
            <el-table-column prop="disasterLevel" label="灾害等级"></el-table-column>
            <el-table-column prop="remarks" label="备注"></el-table-column>
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
                <el-form-item label="灾害名称" required>
                    <el-input v-model="editForm.disasterName"></el-input>
                </el-form-item>
                <el-form-item label="灾害等级" required>
                    <el-input v-model="editForm.disasterLevel"></el-input>
                </el-form-item>
                <el-form-item label="备注" required>
                    <el-input v-model="editForm.remarks"></el-input>
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
                        <el-form-item label="灾害名称" required>
                            <el-input v-model="advancedSearchForm.disasterName"></el-input>
                        </el-form-item>
                        <el-form-item label="灾害等级" required>
                            <el-input v-model="advancedSearchForm.disasterLevel"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" required>
                            <el-input v-model="advancedSearchForm.remarks"></el-input>
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
                    <el-input v-model="advancedSearchForm.disasterName"></el-input>
                </el-form-item>
                <el-form-item label="事件等级">
                    <el-input v-model="advancedSearchForm.disasterLevel"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="advancedSearchForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="searchDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleAdvancedSearch">筛 选</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
  </el-tab-pane>
</el-tabs>
</div>
</template>

<script>
import { eventMaintainInfo } from '../../mockData/index.js'
export default {
  data () {
    return {
      searchKey: '',
      current: '',
      searchDialogVisible: false,
      editableTabsValue: 'humanDisaster',
      editableTabs: [
        {
          name: 'naturalDisaster',
          title: '自然灾害'
        },
        {
          name: 'humanDisaster',
          title: '人为事故'
        },
        {
          name: 'publicDisaster',
          title: '公共卫生事件'
        }
      ],
      eventMaintainInfo: eventMaintainInfo,
      editDialogVisible: false,
      editForm: {
        id: '',
        disasterName: '',
        disasterLevel: '',
        remarks: ''
      },
      newDialogVisible: false,
      advancedSearchForm: {
        id: '',
        disasterName: '',
        disasterLevel: '',
        remarks: ''
      },
      filterList: {}
    }
  },
  created () {
    this.filterList = JSON.parse(JSON.stringify(eventMaintainInfo))
  },
  methods: {
    handleNew () {
      if (this.advancedSearchForm.id === '') {
        this.$message({ type: 'error', message: '请填写ID!' })
        return
      }
      if (this.advancedSearchForm.disasterName === '') {
        this.$message({ type: 'error', message: '请填写名称!' })
        return
      }
      if (this.advancedSearchForm.disasterLevel === '') {
        this.$message({ type: 'error', message: '请填写等级!' })
        return
      }
      if (this.advancedSearchForm.remarks === '') {
        this.$message({ type: 'error', message: '请填写备注!' })
        return
      }
      this.filterList[this.current].unshift(this.advancedSearchForm)
      this.advancedSearchForm = {
        id: '',
        disasterName: '',
        disasterLevel: '',
        remarks: ''
      }
      this.newDialogVisible = false
      this.$message({ type: 'success', message: '新建成功!' })
    },
    handleSearch () {
      this.filterList[this.current] = this.filterList[this.current].filter((item) => {
        return item.id.includes(this.searchKey) ||
        item.remarks.includes(this.searchKey) || item.disasterName.includes(this.searchKey) || item.disasterLevel.includes(this.searchKey)
      })
      this.searchKey = ''
    },
    handleEdit (row) {
      this.editDialogVisible = true
      for (const i in this.editForm) {
        this.editForm[i] = row[i]
      }
    },
    handelCancel () {
      this.filterList = JSON.parse(JSON.stringify(eventMaintainInfo))
    },
    handleAdvancedSearch () {
      this.filterList[this.current] = this.filterList[this.current].filter((item) => {
        return this.advancedSearchForm.id === item.id
      })
      this.advancedSearchForm = {
        id: '',
        account: '',
        password: '',
        sex: '',
        age: '',
        staffNumber: '',
        type: '',
        state: ''
      }
      this.searchDialogVisible = false
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该灾害( ID：' + row.id + ' ), 是否继续?', '提示', {
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
    },
    handleTabsEdit (targetName, action) {
      if (action === 'add') {
        this.$prompt('请输入灾害分类名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.editableTabs.push({
            title: value,
            name: value
          })
          this.editableTabsValue = value
          this.$message({
            type: 'success',
            message: '新建成功'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消！'
          })
        })
      }
      if (action === 'remove') {
        const tabs = this.editableTabs
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.editableTabsValue = activeName
        this.$confirm('此操作将永久删除该分类！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.editableTabs = tabs.filter(tab => tab.name !== targetName)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消!'
          })
        })
      }
    }
  }
}
</script>

<style>
.el-tabs__new-tab {
    float:left !important;
    margin-right:10px !important;
}
</style>
