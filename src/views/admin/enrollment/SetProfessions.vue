<template>
    <div class="wrapper">
        <!--列表-->
        <el-table :data="professions" :highlight-current-row="true" v-loading="listLoading" ref="table"
                  @selection-change="handleCurrentChange">
            <el-table-column type="selection" width="55" fixed="left"></el-table-column>
            <el-table-column prop="id" label="#" width="80"></el-table-column>
            <el-table-column prop="name" label="招生专业（类）" width="160"></el-table-column>
            <el-table-column prop="time" label="学制" width="60"></el-table-column>
            <el-table-column prop="acceptArt" label="选考科目要求" width="140" sortable></el-table-column>
            <el-table-column prop="comment" label="所在（含）一流学科名称" min-width="120"></el-table-column>
            <el-table-column prop="college" label="所在院系" min-width="120"></el-table-column>
            <!--<el-table-column prop="stuNum" label="招生人数" min-width="120"></el-table-column>-->
            <el-table-column label="操作" width="180" fixed="right">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
                    <el-button type="danger" size="small" @click="handleRemove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--批量删除和添加-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" size="small" @click="batchRemove" :disabled="selected.length===0">
                批量删除
            </el-button>
            <el-button type="primary" size="small" @click="addFormVisible=true">添加数据</el-button>
        </el-col>
        <!--编辑-->
        <el-dialog title="编辑" :visible.snyc="editFormVisible" :before-close="handleDialogClose">
            <el-form :model="editForm" ref="editForm">
                <el-form-item label="招生专业（类）" :label-width="this.editFormWidth">
                    <el-input v-model="editForm.name" size="small" placeholder="名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="学制" :label-width="this.editFormWidth">
                    <el-input v-model="editForm.time" size="small" placeholder="学制" clearable></el-input>
                </el-form-item>
                <el-form-item label="选考科目要求" :label-width="this.editFormWidth">
                    <el-radio v-model="editForm.acceptArt" :label="'仅限理科'">仅限理科</el-radio>
                    <el-radio v-model="editForm.acceptArt" :label="'文理兼收'">文理兼收</el-radio>
                </el-form-item>
                <el-form-item label="所在（含）一流学科名称" :label-width="this.editFormWidth">
                    <el-input v-model="editForm.comment" size="small" placeholder="一流学科" clearable></el-input>
                </el-form-item>
                <el-form-item label="所在院系" :label-width="this.editFormWidth">
                    <el-input v-model="editForm.college" size="small" placeholder="院系" clearable></el-input>
                </el-form-item>
                <!--<el-form-item label="招生人数" :label-width="this.editFormWidth">-->
                <!--<el-input v-model="editForm.stuNum" size="small" placeholder="人数" clearable></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible=false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
        <!--新增-->
        <el-dialog title="新增" :visible.snyc="addFormVisible" :before-close="handleDialogClose">
            <el-form :model="addForm" ref="addForm" :rules="addFormRules">
                <el-form-item label="招生专业（类）" :label-width="this.addFormWidth">
                    <el-input v-model="addForm.name" size="small" placeholder="名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="学制" :label-width="this.addFormWidth">
                    <el-input v-model="addForm.time" size="small" placeholder="学制" clearable></el-input>
                </el-form-item>
                <el-form-item label="选考科目要求" :label-width="this.addFormWidth">
                    <el-radio v-model="addForm.acceptArt" :label="'仅限理科'">仅限理科</el-radio>
                    <el-radio v-model="addForm.acceptArt" :label="'文理兼收'">文理兼收</el-radio>
                </el-form-item>
                <el-form-item label="所在（含）一流学科名称" :label-width="this.addFormWidth">
                    <el-input v-model="addForm.comment" size="small" placeholder="一流学科" clearable></el-input>
                </el-form-item>
                <el-form-item label="所在院系" :label-width="this.addFormWidth">
                    <el-input v-model="addForm.college" size="small" placeholder="院系" clearable></el-input>
                </el-form-item>
                <!--<el-form-item label="招生人数" :label-width="this.editFormWidth">-->
                <!--<el-input v-model="addForm.stuNum" size="small" placeholder="人数" clearable></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible=false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { addMajor, changeMajor, deleteMajor, getMajors } from 'utils/api'

  @Component({})
  export default class SetProfessions extends Vue {
    professions: any = []
    selected: any = []
    listLoading: boolean = false

    editFormVisible: boolean = false // 是否显示编辑界面
    editLoading: boolean = false
    editForm: any = {
      name: '',
      time: '',
      acceptArt: '',
      comment: '',
      college: '',
      stuNum: ''
    }
    editFormWidth: string = '120px'

    addFormVisible: boolean = false // 是否显示新增界面
    addLoading: boolean = false
    addForm: any = {
      name: '',
      time: '',
      acceptArt: '',
      comment: '',
      college: '',
      stuNum: ''
    }
    addFormRules: any = {
      name: [
        { required: true, message: '请输入招生专业（类）名称', trigger: 'change' }
      ],
      time: [
        { required: true, message: '请输入学制', trigger: 'change' }
      ],
      comment: [
        { required: true, message: '请输入所含一流学科名称', trigger: 'change' }
      ],
      college: [
        { required: true, message: '请输入所属院系', trigger: 'change' }
      ],
      stuNum: [
        { required: true, message: '请输入招生人数', trigger: 'change' }
      ]
    }
    addFormWidth: string = '180px'

    mounted () {
      this.$nextTick(() => {
        this.getProfessions()
      })
    }

    getProfessions () {
      // 获取招生专业
      getMajors()
        .then(res => {
          this.professions = res.data
          this.professions.forEach(major => {
            major.acceptArt = major.acceptArt ? '文理兼收' : '仅限理科'
          })
        })
        .catch(err => {
          this.$message({
            message: err.toString(),
            type: 'error'
          })
        })
    }

    handleEdit (row: any) {
      // 编辑
      this.editFormVisible = true
      this.editForm = (<any> Object).assign({}, row)
    }

    editSubmit () {
      let form = this.editForm
      form.majorid = form.id
      form.acceptArt = form.acceptArt === '文理兼收'
      changeMajor(form)
        .then(res => {
          if (res.data.succeed) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.editFormVisible = false
            this.getProfessions()
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
        .catch(err => {
          this.$message({
            message: err.toString(),
            type: 'error'
          })
        })
    }

    addSubmit () {
      // 新增
      let form = this.addForm
      form.acceptArt = form.acceptArt === '文理兼收'
      addMajor(form)
        .then(res => {
          if (res.data.succeed) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.addFormVisible = false
            this.getProfessions()
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
        .catch(err => {
          this.$message({
            message: err.toString(),
            type: 'error'
          })
        })
    }

    handleRemove (row: any) {
      // 删除
      this.$confirm('确认删除？')
        .then(() => {
          deleteMajor({
            majorid: row.id
          }).then(res => {
            if (res.data.succeed) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getProfessions()
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          }).catch(err => {
            this.$message({
              message: err.toString(),
              type: 'error'
            })
          })
        })
        .catch(() => {
        })
    }

    batchRemove () {
      // 批量删除
      this.$confirm('确认删除？')
        .then(() => {
          this.selected.forEach(major => {
            deleteMajor({
              majorid: major.id
            }).then(res => {
              if (res.data.succeed) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
                this.getProfessions()
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            }).catch(err => {
              this.$message({
                message: err.toString(),
                type: 'error'
              })
            })
          })
        }).catch(() => {
      })
    }

    handleCurrentChange (val) {
      this.selected = val
    }

    handleDialogClose () {
      let _this: any = this
      _this.$confirm('确认关闭？')
        .then(() => {
          this.editFormVisible = false
          this.addFormVisible = false
        })
        .catch(() => {
        })
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        .toolbar {
            margin-top: 10px;
        }
    }
</style>
