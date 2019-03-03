<template>
    <div class="wrapper">
        <!--列表-->
        <el-table :data="professions" :highlight-current-row="true" v-loading="listLoading" ref="table"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" fixed="left"></el-table-column>
            <el-table-column prop="id" label="#" width="80"></el-table-column>
            <el-table-column prop="account" label="招生专业（类）" min-width="120"></el-table-column>
            <el-table-column prop="contact" label="学制" min-width="120"></el-table-column>
            <el-table-column prop="year" label="选考科目要求" min-width="120"></el-table-column>
            <el-table-column prop="name" label="所在（含）一流学科名称" min-width="120"></el-table-column>
            <el-table-column prop="name" label="所在院系" min-width="120"></el-table-column>
            <el-table-column label="操作" width="180" fixed="right">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
                    <el-button type="danger" size="small" @click="handleRemove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--批量删除和添加-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" size="small" @click="batchRemove" :disabled="allSelected.length===0">
                批量删除
            </el-button>
            <el-button type="primary" size="small" @click="addFormVisible=true">添加数据</el-button>
        </el-col>
        <!--编辑-->
        <el-dialog title="编辑" :visible.snyc="editFormVisible" :before-close="handleDialogClose">
            <el-form :model="editForm" ref="editForm">
                <el-form-item label="招生专业名称" :label-width="this.editFormWidth">
                    <el-input v-model="editForm.name" size="small" placeholder="名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="科类" :label-width="this.editFormWidth">
                    <el-input v-model="editForm.class" size="small" placeholder="科类" clearable></el-input>
                </el-form-item>
                <el-form-item label="专业分流方向" :label-width="this.editFormWidth">
                    <el-input v-model="editForm.direction" size="small" placeholder="方向" clearable></el-input>
                </el-form-item>
                <el-form-item label="所属院系" :label-width="this.editFormWidth">
                    <el-input v-model="editForm.department" size="small" placeholder="院系" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible=false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
        <!--新增-->
        <el-dialog title="新增" :visible.snyc="addFormVisible" :before-close="handleDialogClose">
            <el-form :model="addForm" ref="addForm" :rules="addFormRules">
                <el-form-item label="招生专业名称" :label-width="this.addFormWidth" prop="name">
                    <el-input v-model="addForm.name" size="small" placeholder="名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="科类" :label-width="this.addFormWidth" prop="class">
                    <el-input v-model="addForm.class" size="small" placeholder="科类" clearable></el-input>
                </el-form-item>
                <el-form-item label="专业分流方向" :label-width="this.addFormWidth" prop="direction">
                    <el-input v-model="addForm.direction" size="small" placeholder="方向" clearable></el-input>
                </el-form-item>
                <el-form-item label="所属院系" :label-width="this.addFormWidth" prop="department">
                    <el-input v-model="addForm.department" size="small" placeholder="院系" clearable></el-input>
                </el-form-item>
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

  @Component({})
  export default class SetProfessions extends Vue {
    professions: any = []
    selected: any = []
    listLoading: boolean = false

    editFormVisible: boolean = false // 是否显示编辑界面
    editLoading: boolean = false
    editForm: any = {
      name: '',
      class: '',
      direction: '',
      department: ''
    }
    editFormWidth: string = '100px'

    addFormVisible: boolean = false // 是否显示新增界面
    addLoading: boolean = false
    addForm: any = {
      name: '',
      class: '',
      direction: '',
      department: ''
    }
    addFormRules: any = {
      name: [
        { required: true, message: '请输入招生专业（类）名称', trigger: 'change' }
      ],
      class: [
        { required: true, message: '请输入科类', trigger: 'change' }
      ],
      direction: [
        { required: true, message: '请输入专业分流方向', trigger: 'change' }
      ],
      department: [
        { required: true, message: '请输入所属院系', trigger: 'change' }
      ]
    }
    addFormWidth: string = '120px'

    mounted () {
      this.$nextTick(() => {
        this.getProfessions()
      })
    }

    getProfessions () {
      // 获取招生专业
    }

    handleEdit (row: any) {
      // 编辑
      this.editFormVisible = true
      this.editForm = (<any> Object).assign({}, row)
    }

    addSubmit () {
      // 新增
    }

    handleRemove (row: any) {
      // 删除
    }

    batchRemove () {
      // 批量删除
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
          //
        })
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
