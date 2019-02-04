<template>
    <el-main>
        <!--查询-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getStudents">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="students" :highlight-current-row="true" v-loading="listLoading"
                  @selection-change="handleSelectionChange" style="width: 100%;">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="table-expand">
                        <el-form-item label="学生姓名">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="填报志愿">
                            <span>{{ props.row.wishes }}</span>
                        </el-form-item>
                        <el-form-item label="接受调剂">
                            <span>{{ props.row.adjust }}</span>
                        </el-form-item>
                        <el-form-item label="成绩详情">
                            <span>{{ props.row.scores }}</span>
                        </el-form-item>
                        <el-form-item label="获得奖项">
                            <span>{{ props.row.awards }}</span>
                        </el-form-item>
                        <el-form-item label="个人陈述">
                            <span>{{ props.row.states }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="120" sortable>
            </el-table-column>
            <el-table-column prop="score" label="总级分" width="120" sortable>
            </el-table-column>
            <el-table-column prop="school" label="就读高中" min-width="180" sortable>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handlePass(scope.$index, scope.row)">通过</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--导出和页码-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchExport">批量导出</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="15"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <!--编辑-->
        <el-dialog title="编辑" :visible.snyc="editFormVisible" :before-close="handleEditClose">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.gender">
                        <el-radio class="radio" :label="'男'">男</el-radio>
                        <el-radio class="radio" :label="'女'">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="总级分">
                    <el-input-number v-model="editForm.score" :min="0" :max="72"></el-input-number>
                </el-form-item>
                <el-form-item label="就读高中">
                    <el-input v-model="editForm.school"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </el-main>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  import {checkStuList} from '../../../assets/utils/api'

  @Component({})
  export default class AllStudents extends Vue {

    filters = {name: ''}
    students = []
    selected = []

    total: number = 0
    page: number = 1
    listLoading: boolean = false

    editFormVisible: boolean = false//是否显示编辑界面
    editLoading: boolean = false
    editFormRules = {
      name: [
        {required: true, message: '请输入姓名', trigger: 'blur'}
      ]
    }
    editForm = {
      id: 0,
      name: '',
      gender: '',
      score: 0,
      school: ''
    }

    mounted () {
      this.getStudents()
    }

    handleSelectionChange (selected) {
      this.selected = selected
    }

    getStudents () {
      let params = {
        page: this.page,
        name: this.filters.name
      }
      this.listLoading = true
      checkStuList(params)
        .then((res) => {
          this.total = res.data.total
          this.students = res.data.stuList
          this.listLoading = false
        })
        .catch(() => {
        })
    }

    handleEdit (index, row) {
      this.editFormVisible = true
      this.editForm = (<any> Object).assign({}, row)
      console.log(this.editForm)
    }

    handleEditClose () {
      this.$confirm('确认关闭？')
        .then(() => {
          this.editFormVisible = false
        })
        .catch(() => {
        })
    }

    handlePass () {

    }

    editSubmit () {
      //   this.$refs.editForm.validate((valid) => {
      //     if (valid) {
      //       this.$confirm('确认提交吗？', '提示', {}).then(() => {
      //         this.editLoading = true
      //         //NProgress.start();
      //         let para = Object.assign({}, this.editForm)
      //         para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
      //         editUser(para).then((res) => {
      //           this.editLoading = false
      //           //NProgress.done();
      //           this.$message({
      //             message: '提交成功',
      //             type: 'success'
      //           })
      //           this.$refs['editForm'].resetFields()
      //           this.editFormVisible = false
      //           this.getUsers()
      //         })
      //       })
      //     }
      //   })
    }

    batchExport () {
      let ids = this.selected.map(item => item.id).toString()
      this.$confirm('确认导出选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // let para = {ids: ids}
        // batchRemoveUser(para).then((res) => {
        //   this.listLoading = false
        //   //NProgress.done();
        //   this.$message({
        //     message: '导出成功',
        //     type: 'success'
        //   })
        //   this.getStudents()
        // })
      }).catch(() => {
      })
    }

    handleCurrentChange (val) {
      this.page = val
      this.getStudents()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    .table-expand {
        font-size: 0;

        label {
            width: 90px;
            color: #99a9bf !important;
        }

        .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
        }
    }

    .el-table {
        .el-table-column {
            height: 40px !important;
            line-height: 40px !important;
        }
    }
</style>
