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

    <el-table :data="processMaintainInfo" style="width: 100%" stripe>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="processName" label="名称"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="typeNumber" label="类型编码"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
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
            <el-form-item label="名称" required>
                <el-input v-model="editForm.processName"></el-input>
            </el-form-item>
            <el-form-item label="类型" required>
                <el-input v-model="editForm.type"></el-input>
            </el-form-item>
            <el-form-item label="类型编号" required>
                <el-input v-model="editForm.typeNumber"></el-input>
            </el-form-item>
            <el-form-item label="内容" required>
                <el-input v-model="editForm.content"></el-input>
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
        <el-form :model="editForm" label-width="80px" label-position="left">
            <el-form-item label="ID" required>
                <el-input v-model="editForm.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="名称" required>
                <el-input v-model="editForm.processName"></el-input>
            </el-form-item>
            <el-form-item label="类型" required>
                <el-input v-model="editForm.type"></el-input>
            </el-form-item>
            <el-form-item label="类型编号" required>
                <el-input v-model="editForm.typeNumber"></el-input>
            </el-form-item>
            <el-form-item label="内容" required>
                <el-input v-model="editForm.content"></el-input>
            </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="10">
            <el-table style="width: 100%" stripe border :data="stepsTable" highlight-current-row @current-change="handleCurrentRowChange">
              <el-table-column prop="step" label="步骤"></el-table-column>
            </el-table>
           <el-button type="text" @click="deleteStep">删除步骤</el-button>
          </el-col>
          <el-col :span="10" :offset="4">
            <div>
              <h4 style="height:30px;">步骤内容</h4>
              <el-input type="textarea" :rows="3" placeholder="请输入步骤内容" v-model="newStep" resize="none"></el-input>
              <el-button type="text" style="float:right" @click="addStep">增加步骤</el-button>
            </div>
          </el-col>
        </el-row>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="newDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="newDialogVisible = false ;$message({type: 'success',message: '新增成功!'})">确 定</el-button>
            </span>
        </template>
    </el-dialog>
  </div>
</template>

<script>
import { processMaintainInfo } from '../../mockData/index.js'
export default {
  data () {
    return {
      newDialogVisible: false,
      processMaintainInfo: processMaintainInfo,
      editDialogVisible: false,
      editForm: {
        id: '',
        processName: '',
        type: '',
        typeNumber: '',
        content: ''
      },
      newStep: '',
      stepsTable: [
        {
          step: '吃一个香蕉'
        },
        {
          step: '睡一会'
        }
      ],
      currentRow: ''
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
    },
    addStep () {
      this.stepsTable.push({ step: this.newStep })
      this.newStep = ''
    },
    handleCurrentRowChange (current) {
      this.currentRow = current
    },
    deleteStep () {
      this.stepsTable = this.stepsTable.filter((item) => item.step !== this.currentRow.step)
    }
  }
}
</script>

<style>

</style>
