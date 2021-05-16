<template>
  <div>
    <div>
        <el-button type="text" icon="el-icon-document-add" style="margin-left:10px;margin-right:10px;" @click="newDialogVisible=true">新增</el-button>
        <el-button type="text" icon="el-icon-search" style="float:right;margin-right:10px" @Click="searchDialogVisible=true">高级筛选</el-button>
        <el-button type="text" icon="el-icon-refresh-left" style="float:right;margin-right:5px" @click="filterList=reportInfo">取消筛选</el-button>
        <el-input size="mini" placeholder="输入关键字搜索" style="width:20%;float:right;margin-top:5px;">
            <template #append><el-button icon="el-icon-search"></el-button></template>
        </el-input>
    </div>

    <el-table :data="materialLocationInfo" style="width: 100%" stripe>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="locationName" label="物资点名称"></el-table-column>
        <el-table-column prop="locationDirector" label="物资点负责人"></el-table-column>
        <el-table-column prop="address" label="物资点地址"></el-table-column>
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
            <el-form-item label="物资点名称" required>
                <el-input v-model="editForm.locationName"></el-input>
            </el-form-item>
            <el-form-item label="物资点负责人" required>
                <el-input v-model="editForm.locationDirector"></el-input>
            </el-form-item>
            <el-form-item label="物资点地址" required>
                <el-input v-model="editForm.address"></el-input>
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
                        <el-input v-model="advancedSearchForm.id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="物资点名称" required>
                        <el-input v-model="advancedSearchForm.locationName"></el-input>
                    </el-form-item>
                    <el-form-item label="物资点负责人" required>
                        <el-input v-model="advancedSearchForm.locationDirector"></el-input>
                    </el-form-item>
                    <el-form-item label="物资点地址" required>
                        <el-input v-model="advancedSearchForm.address"></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="newDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="newDialogVisible = false;$message({type: 'success',message: '新建成功!'})">新 建</el-button>
                    </span>
                </template>
            </el-dialog>
  </div>
</template>

<script>
import { materialLocationInfo } from '../../mockData/index.js'
export default {
  data () {
    return {
      materialLocationInfo: materialLocationInfo,
      editDialogVisible: false,
      editForm: {
        id: '',
        locationName: '',
        locationDirector: '',
        address: ''
      },
      newDialogVisible: false,
      advancedSearchForm: {
        id: '',
        locationName: '',
        locationDirector: '',
        address: ''
      }
    }
  },
  methods: {
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
