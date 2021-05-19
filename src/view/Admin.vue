<template>
<el-row class="admin_container">
    <el-col :span="3" class="admin_container_left" :style="styleObject">
        <el-menu default-active="1" class="menu">
            <el-menu-item index="1" class="menu_item">
                <i class="el-icon-user-solid"></i>
                <template #title>人员维护</template>
            </el-menu-item>
        </el-menu>
    </el-col>

    <el-col :span="21" class="admin_container_right" :style="styleObject">
        <div>
            <el-button type="text" icon="el-icon-document-add" style="margin-left:10px;margin-right:10px;" @click="newDialogVisible=true">新增</el-button>
            <el-upload style="display:inline-block;">
                <el-tooltip content="只能导入excel文件，且不超过500kb" placement="top">
                    <el-button type="text" icon="el-icon-upload">批量导入</el-button>
                </el-tooltip>
            </el-upload>
            <el-button type="text" icon="el-icon-search" style="float:right;margin-right:10px" @Click="searchDialogVisible=true">高级筛选</el-button>
            <el-button type="text" icon="el-icon-refresh-left" style="float:right;margin-right:5px" @click="filterList=userInfo">取消筛选</el-button>
            <el-input size="mini" placeholder="输入关键字搜索" style="width:20%;float:right;margin-top:5px;" v-model="searchKey">
                <template #append><el-button icon="el-icon-search" @click="handleSearch"></el-button></template>
            </el-input>
        </div>

        <el-table :data="filterList" style="width: 100%" stripe>
            <el-table-column prop="id" label="ID" width="120"></el-table-column>
            <el-table-column prop="account" label="账号" width="150"></el-table-column>
            <el-table-column prop="password" label="密码" width="150"></el-table-column>
            <el-table-column prop="sex" label="性别" width="120">
                <template #default="scope"> <el-tag size="medium" @click="sexFilter(scope.row.sex)" :type="mapSexToTag(scope.row.sex)" style="cursor:pointer">{{ scope.row.sex }}</el-tag></template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="120"></el-table-column>
            <el-table-column prop="staffNumber" label="人员编号" width="120"></el-table-column>
            <el-table-column prop="type" label="人员类型" width="120">
                <template #default="scope"> <el-tag size="medium" :type="mapTypeToTag(scope.row.type)" style="cursor:pointer">{{ scope.row.type }}</el-tag></template>
            </el-table-column>
            <el-table-column prop="state" label="账号状态" width="120">
                <template #default="scope"> <el-tag size="medium" :type="mapStateToTag(scope.row.state)" style="cursor:pointer">{{ scope.row.state }}</el-tag></template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template #default="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination
            :current-page="1"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, prev, pager, next, jumper"
            :total="400">
            </el-pagination>
        </div>

        <el-dialog title="高级筛选" v-model="searchDialogVisible" width="40%" center>
            <el-form :model="advancedSearchForm" label-width="80px" label-position="left">
                <el-form-item label="ID">
                    <el-input v-model="advancedSearchForm.id"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="advancedSearchForm.account"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="advancedSearchForm.password"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="advancedSearchForm.sex">
                        <el-option :value="'男'" :label="'男'"></el-option>
                        <el-option :value="'女'" :label="'女'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="advancedSearchForm.age">
                        <template #prepend>
                            <el-select v-model="advancedSearchForm.regular" style="width:100px;">
                                <el-option label="大 于" value=">"></el-option>
                                <el-option label="等 于" value="="></el-option>
                                <el-option label="小 于" value="<"></el-option>
                            </el-select>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="员工编号">
                    <el-input v-model="advancedSearchForm.staffNumber"></el-input>
                </el-form-item>
                <el-form-item label="员工类型">
                    <el-select v-model="advancedSearchForm.type">
                        <el-option :value="'staff'" :label="'工作人员'"></el-option>
                        <el-option :value="'admin'" :label="'管理员'"></el-option>
                        <el-option :value="'commander'" :label="'指挥员'"></el-option>
                        <el-option :value="'expert'" :label="'专家'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="advancedSearchForm.state">
                        <el-option :value="'normal'" :label="'正常'"></el-option>
                        <el-option :value="'disabled'" :label="'停用'"></el-option>
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

        <el-dialog title="新建用户" v-model="newDialogVisible" width="40%" center>
            <el-form :model="newForm" label-width="80px" label-position="left">
                <el-form-item label="账号" required>
                    <el-input v-model="newForm.account"></el-input>
                </el-form-item>
                <el-form-item label="密码" required>
                    <el-input v-model="newForm.password"></el-input>
                </el-form-item>
                <el-form-item label="性别" required>
                    <el-select v-model="newForm.sex">
                        <el-option :value="'男'" :label="'男'"></el-option>
                        <el-option :value="'女'" :label="'女'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" required>
                    <el-input v-model="newForm.age"></el-input>
                </el-form-item>
                <el-form-item label="员工编号" required>
                    <el-input v-model="newForm.staffNumber"></el-input>
                </el-form-item>
                <el-form-item label="员工类型" required>
                    <el-select v-model="newForm.type">
                        <el-option :value="'staff'" :label="'工作人员'"></el-option>
                        <el-option :value="'admin'" :label="'管理员'"></el-option>
                        <el-option :value="'commander'" :label="'指挥员'"></el-option>
                        <el-option :value="'expert'" :label="'专家'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" required>
                    <el-select v-model="newForm.state">
                        <el-option :value="'normal'" :label="'正常'"></el-option>
                        <el-option :value="'disabled'" :label="'停用'"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="newDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleNew">新 建</el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog title="编辑" v-model="editDialogVisible" width="40%" center>
            <el-form :model="editForm" label-width="80px" label-position="left">
                <el-form-item label="ID" required>
                    <el-input v-model="editForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="账号" required>
                    <el-input v-model="editForm.account" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" required>
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
                <el-form-item label="性别" required>
                    <el-select v-model="editForm.sex">
                        <el-option :value="'男'" :label="'男'"></el-option>
                        <el-option :value="'女'" :label="'女'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" required>
                    <el-input v-model="editForm.age"></el-input>
                </el-form-item>
                <el-form-item label="员工编号" required>
                    <el-input v-model="editForm.staffNumber"></el-input>
                </el-form-item>
                <el-form-item label="员工类型" required>
                    <el-select v-model="editForm.type">
                        <el-option :value="'staff'" :label="'工作人员'"></el-option>
                        <el-option :value="'admin'" :label="'管理员'"></el-option>
                        <el-option :value="'commander'" :label="'指挥员'"></el-option>
                        <el-option :value="'expert'" :label="'专家'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" required>
                    <el-select v-model="editForm.state">
                        <el-option :value="'normal'" :label="'正常'"></el-option>
                        <el-option :value="'disabled'" :label="'停用'"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editDialogVisible = false ;$message({type: 'success',message: '编辑成功!'})">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </el-col>
</el-row>
</template>

<script>
import { userInfo } from '../mockData/index'

export default {
  name: 'admin',
  data () {
    return {
      searchKey: '',
      styleObject: {},
      userInfo: userInfo,
      filterList: [],
      newDialogVisible: false,
      searchDialogVisible: false,
      newForm: {
        id: '',
        account: '',
        password: '',
        sex: '',
        regular: '=',
        age: '',
        staffNumber: '',
        type: '',
        state: ''
      },
      advancedSearchForm: {
        id: '',
        account: '',
        password: '',
        sex: '',
        regular: '=',
        age: '',
        staffNumber: '',
        type: '',
        state: ''
      },
      editDialogVisible: false,
      editForm: {
        id: '',
        account: '',
        password: '',
        sex: '',
        age: '',
        staffNumber: '',
        type: '',
        state: ''
      }
    }
  },
  methods: {
    handleAdvancedSearch () {
      this.filterList = this.userInfo.filter((item) => {
        return Number(this.advancedSearchForm.id) === item.id
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
    handleNew () {
      if (this.newForm.account === '') {
        this.$message({ type: 'error', message: '请填写完整！' })
        return
      }
      this.filterList.unshift({ ...this.newForm, id: 3 })
      this.newForm = {
        id: '',
        account: '',
        password: '',
        sex: '',
        regular: '=',
        age: '',
        staffNumber: '',
        type: '',
        state: ''
      }
      this.newDialogVisible = false
      this.$message({ type: 'success', message: '新建成功!' })
    },
    handleSearch () {
      this.filterList = this.userInfo.filter((item) => {
        return item.account.includes(this.searchKey) || item.password.includes(this.searchKey) ||
        item.sex.includes(this.searchKey) || item.age.includes(this.searchKey) || item.staffNumber.includes(this.searchKey) ||
        item.type.includes(this.searchKey) || item.state.includes(this.searchKey)
      })
      this.searchKey = ''
    },
    handleEdit (row) {
      this.editDialogVisible = true
      for (const i in this.editForm) {
        this.editForm[i] = row[i]
      }
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该账号( 账号：' + row.account + ' ), 是否继续?', '提示', {
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
    sexFilter (sex) {
      this.filterList = this.userInfo.filter((item) => { return item.sex === sex })
    },
    mapTypeToTag (type) {
      switch (type) {
        case 'expert':
          return 'success'
        case 'commander':
          return 'warning'
        case 'admin':
          return 'danger'
        default:
          return ''
      }
    },
    mapStateToTag (state) {
      if (state === 'normal') return 'info'
      return 'danger'
    },
    mapSexToTag (sex) {
      if (sex === '男') return ''
      return 'success'
    }
  },
  created () {
    this.filterList = this.userInfo
  },
  mounted () {
    this.styleObject.height = (window.innerHeight - this.$el.getBoundingClientRect().top) + 'px'
  }

}
</script>

<style lang="less" scoped>
.admin_container{
    width:100%;
    .admin_container_left{
        background-color: rgba(231, 231, 231, 0.993);
        .menu{
            border-right: initial;
            background-color: rgba(219, 217, 217, 0.993);
            .menu_item{
                border-bottom: 1px solid rgba(231, 231, 231, 0.993);
            }
        }
    }
    .admin_container_right{
        border-left:2px solid white;
        .pagination{
            margin-top:5px;
        }
    }
}

</style>
