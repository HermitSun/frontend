<template>
    <div class="wrapper">
        <el-table :data="messages" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60"></el-table-column>
            <el-table-column type="index" width="80"></el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <span>{{ props.row.content }}</span>
                </template>
            </el-table-column>
            <el-table-column label="消息 MESSAGE" min-width="200" prop="title"></el-table-column>
            <el-table-column label="时间 TIME" prop="releasedTime" sortable></el-table-column>
            <!--<el-table-column label="操作" width="180">-->
            <!--<template slot-scope="scope">-->
            <!--<el-button size="small" @click="editMessage(scope.$index,scope.row)">编辑</el-button>-->
            <!--<el-button type="danger" size="small" @click="deleteMessage(scope.$index)">删除</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->
        </el-table>
        <!--编辑-->
        <el-dialog title="编辑" :visible.snyc="editFormVisible" :before-close="handleEditClose">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="主题" prop="name">
                    <el-input v-model="editForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="editForm.content"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { adminGetMessage } from 'utils/api'

  @Component({})
  export default class ViewMessage extends Vue {
    messages: any = []
    selections: any = []
    editForm: any = {
      index: '',
      title: '',
      content: ''
    }
    editFormRules: any = {
      title: [
        { required: true, message: '请填写标题', trigger: 'blur' }
      ],
      content: [
        { required: true, message: '请填写内容', trigger: 'blur' }
      ]
    }
    editFormVisible: boolean = false

    mounted () {
      adminGetMessage()
        .then((res) => {
          if (res.data) {
            res.data.forEach((datum) => {
              datum.releasedTime = datum.releasedTime.split('T')[0]
              this.messages.push(datum)
            })
          } else {
            this.$message({
              message: '读取失败',
              type: 'error'
            })
          }
        })
        .catch((err) => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
    }

    handleSelectionChange (val) {
      this.selections = val
    }

    editMessage (index, row) {
      this.editFormVisible = true
      this.editForm = {
        index: index,
        title: row.title,
        content: row.content
      }
    }

    deleteMessage (index) {
      this.$confirm('确认删除？')
        .then(() => {
          this.messages.splice(index, 1)
        })
        .catch(() => {
        })
    }

    // editSubmit () {
    //   this.messages[this.editForm.index].title = this.editForm.title
    //   this.messages[this.editForm.index].content = this.editForm.content
    //   adminUpdateMessage({
    //     messages: this.messages
    //   }).then((res) => {
    //     if (res.data.succeed) {
    //       this.$message.success('编辑成功')
    //     } else {
    //       this.$message.error(res.data.msg)
    //     }
    //   }).catch((err) => {
    //     this.$message.error('编辑失败')
    //   })
    // }

    handleEditClose () {
      this.$confirm('确认关闭？')
        .then(() => {
          this.editFormVisible = false
        })
        .catch(() => {
        })
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        margin: 20px 20px 0 20px;
        height: 100% !important;
    }
</style>
