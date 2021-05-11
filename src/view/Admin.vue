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
            <el-button type="text" icon="el-icon-document-add" style="margin-left:10px;">新增</el-button>
            <el-button type="text" style="float:right;margin-right:10px" @Click="searchDialogVisible=true">高级筛选</el-button>
            <el-button type="text" style="float:right">取消筛选</el-button>
            <el-input size="mini" placeholder="输入关键字搜索" style="width:20%;float:right;margin-top:5px;">
                <template #append><el-button icon="el-icon-search"></el-button></template>
            </el-input>
        </div>

        <el-table :data="userInfo" style="width: 100%" stripe border>
            <el-table-column prop="id" label="ID" width="120"></el-table-column>
            <el-table-column prop="account" label="账号" width="150"></el-table-column>
            <el-table-column prop="password" label="密码" width="150"></el-table-column>
            <el-table-column prop="sex" label="性别" width="120"></el-table-column>
            <el-table-column prop="age" label="年龄" width="120"></el-table-column>
            <el-table-column prop="staffNumber" label="人员编号" width="120"></el-table-column>
            <el-table-column prop="type" label="人员类型" width="120"></el-table-column>
            <el-table-column prop="state" label="账号状态" width="120"></el-table-column>
            <el-table-column align="center" label="操作">
                <template #default="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
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
                    <el-input v-model="advancedSearchForm.age"></el-input>
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
                    <el-button type="primary" @click="searchDialogVisible = false">搜 索</el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog title="编辑" v-model="editDialogVisible" width="40%" center>
            <el-form :model="editForm" label-width="80px" label-position="left">
                <el-form-item label="ID">
                    <el-input v-model="editForm.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="editForm.account" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="editForm.sex">
                        <el-option :value="'男'" :label="'男'"></el-option>
                        <el-option :value="'女'" :label="'女'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="editForm.age"></el-input>
                </el-form-item>
                <el-form-item label="员工编号">
                    <el-input v-model="editForm.staffNumber"></el-input>
                </el-form-item>
                <el-form-item label="员工类型">
                    <el-select v-model="editForm.type">
                        <el-option :value="'staff'" :label="'工作人员'"></el-option>
                        <el-option :value="'admin'" :label="'管理员'"></el-option>
                        <el-option :value="'commander'" :label="'指挥员'"></el-option>
                        <el-option :value="'expert'" :label="'专家'"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="editForm.state">
                        <el-option :value="'normal'" :label="'正常'"></el-option>
                        <el-option :value="'disabled'" :label="'停用'"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editDialogVisible = false">搜 索</el-button>
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
      styleObject: {},
      userInfo: userInfo,
      searchDialogVisible: false,
      advancedSearchForm: {
        id: '',
        account: '',
        password: '',
        sex: '',
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
    handleEdit (row) {
      this.editDialogVisible = true
      for (const i in this.editForm) {
        this.editForm[i] = row[i]
      }
    }
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
