<template>
    <el-main>
        <!--查询-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" size="small" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="getStudents" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="students" :highlight-current-row="true" v-loading="listLoading" ref="table"
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
            <el-table-column prop="id" label="#" width="80">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="120">
            </el-table-column>
            <el-table-column prop="score" label="总级分" width="120" :sortable="true">
            </el-table-column>
            <el-table-column prop="school" label="就读高中" min-width="180" style="max-width: 200px">
            </el-table-column>
            <el-table-column label="审核结果" width="150" :sortable="true" :sort-method="sortByResult">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.status==='通过'">通过</el-tag>
                    <el-tag type="danger" v-else>未通过</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handlePass(scope.row)">
                        {{scope.row.status==='通过'?'取消':'通过'}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--导出和页码-->
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="exportVisible=true" icon="el-icon-download"
                       :disabled="this.allSelected.length===0&&this.currentSelected.length===0">批量导出
            </el-button>
            <el-button type="danger" @click="allPass" icon="el-icon-check"
                       :disabled="this.allSelected.length===0&&this.currentSelected.length===0">一键通过
            </el-button>
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
                    <el-radio-group v-model="editForm.gender" :disabled="true">
                        <el-radio class="radio" :label="'男'">男</el-radio>
                        <el-radio class="radio" :label="'女'">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="总级分">
                    <el-input-number v-model="editForm.score" :min="0" :max="72" :disabled="true"></el-input-number>
                </el-form-item>
                <el-form-item label="就读高中" prop="school">
                    <el-input v-model="editForm.school"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
        <!--导出-->
        <el-dialog title="导出" :visible.snyc="exportVisible" :before-close="handleExportClose">
            <el-button type="primary" @click="batchExport(0)"
                       style="float: left; margin-left: 150px">导出为Excel
            </el-button>
            <el-button type="primary" @click="batchExport(1)"
                       style="float: right; margin-right: 150px;">导出为PDF
            </el-button>
            <div class="clearFix"></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="exportVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </el-main>
</template>

<script>
    import {checkStuList, exportSelected, modifyStuInfo, modifyStuStatus} from 'utils/api';

    export default {
        name: 'AllStudents',
        data() {
            return {
                filters: {name: ''},
                students: [],
                currentSelected: [],
                allSelected: [],

                total: 0,
                page: 1,
                listLoading: false,
                idKey: 'id',

                editFormVisible: false,//是否显示编辑界面
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                editForm: {
                    id: 0,
                    name: '',
                    gender: '',
                    score: 0,
                    school: ''
                },

                exportVisible: false,
                exportForms: {
                    'Excel': 0,
                    'PDF': 1
                },
                exportForm: 0,

                froms: {
                    'NotPass': 0,
                    'Pass': 1,
                    'All': 2
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.getStudents()
            })
        },
        methods: {
            handleSelectionChange(selected) {
                this.currentSelected = selected
            },
            getStudents() {
                let params = {
                    from: this.froms.NotPass,
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                checkStuList(params)
                    .then((res) => {
                        this.total = res.data.total;
                        this.students = res.data.stuList;
                        this.listLoading = false;
                    })
                    .then(() => {
                        this.setSelectedRow();
                    })
                    .catch(() => {
                    })
            },
            handleCurrentChange(val) {
                this.changePageRecordSelectedData();
                this.page = val;
                this.getStudents()
            },
            setSelectedRow() {
                if (this.allSelected.length <= 0) {
                    return;
                }
                let idKey = this.idKey;
                let allSelectedIds = [];
                for (let i = 0; i < this.allSelected.length; ++i) {
                    allSelectedIds.push(this.allSelected[i][idKey])
                }
                this.$refs.table.clearSelection();
                for (let i = 0; i < this.students.length; i++) {
                    if (allSelectedIds.indexOf(this.students[i][idKey]) >= 0) {
                        this.$nextTick(() => {
                            this.$refs.table.toggleRowSelection(this.students[i], true);
                        });
                    }
                }
            },
            changePageRecordSelectedData() {
                let idKey = this.idKey;
                // 如果总选择为空，直接取当前页选中的数据
                if (this.allSelected.length <= 0) {
                    this.allSelected = this.currentSelected;
                    return;
                }
                let allSelectedIds = [];
                for (let i = 0; i < this.allSelected.length; ++i) {
                    allSelectedIds.push(this.allSelected[idKey]);
                }
                let currentSelectedIds = [];
                // 获取当前页选中的id
                for (let i = 0; i < this.currentSelected.length; ++i) {
                    currentSelectedIds.push(this.currentSelected[i][idKey]);
                    if (allSelectedIds.indexOf(this.currentSelected[i][idKey]) < 0) {
                        this.allSelected.push(this.currentSelected[i])
                    }
                }
                let noSelectIds = [];
                // 获取当前页没有选中的id
                for (let i = 0; i < this.students.length; ++i) {
                    if (currentSelectedIds.indexOf(this.students[i][idKey]) < 0) {
                        noSelectIds.push(this.students[i][idKey])
                    }
                }
                for (let j = 0; j < noSelectIds.length; ++j) {
                    if (allSelectedIds.indexOf(noSelectIds[i]) >= 0) {
                        for (let i = 0; i < this.allSelected.length; i++) {
                            if (this.allSelected[i][idKey] === noSelectIds[i]) {
                                // 如果总选择中有未被选中的，则删除
                                this.allSelected.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            },
            sortByResult(stu1, stu2) {
                return stu1.status.length - stu2.status.length;
            },
            handleEdit(row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            handleEditClose() {
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.editFormVisible = false
                    })
                    .catch(() => {
                    })
            },
            handlePass(row) {
                this.$confirm('确认修改吗？', '提示', {}).then(() => {
                    modifyStuStatus({
                        ids: [row.id],
                        status: row.status === '通过' ? 0 : 1
                    }).then((res) => {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getStudents();
                    }).catch(() => {
                        this.$message({
                            message: '修改失败',
                            type: 'error'
                        });
                        this.getStudents();
                    });
                }).catch(() => {
                });
            },
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let params = {
                                'id': this.editForm.id,
                                'name': this.editForm.name,
                                'school': this.editForm.school
                            };
                            modifyStuInfo(params).then((res) => {
                                this.editLoading = false;
                                if (res.data.isSucceed) {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                } else {
                                    this.$message({
                                        message: '提交失败',
                                        type: 'error'
                                    });
                                }
                                this.$refs.editForm.resetFields();
                                this.editFormVisible = false;
                                this.getStudents();
                            }).catch(err => {
                            })
                        })
                    }
                })
            },
            batchExport(form) {
                let ids = [];
                if (this.allSelected.length === 0) {
                    ids = this.currentSelected.map(student => student.id);
                } else {
                    ids = this.allSelected.map(student => student.id);
                }
                exportSelected({
                    ids: ids,
                    form: this.exportForm
                }).then((res) => {
                    this.download(res);
                    this.$message({
                        message: '导出成功',
                        type: 'success'
                    });
                    this.getStudents();
                }).catch(() => {
                    this.$message({
                        message: '导出失败',
                        type: 'error'
                    });
                    this.getStudents();
                })
            },
            handleExportClose() {
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.exportVisible = false;
                    })
                    .catch(() => {
                    })
            },
            download(data) {
                if (!data) {
                    return;
                }
                let url = window.URL.createObjectURL(new Blob([data]));
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', '学生信息.xlsx');//名称可以修改
                document.body.appendChild(link);
                link.click()
            },
            allPass() {
                let ids = [];
                if (this.allSelected.length === 0) {
                    ids = this.currentSelected.map(student => student.id);
                } else {
                    ids = this.allSelected.map(student => student.id);
                }
                this.$confirm('确认修改吗？', '提示', {}).then(() => {
                    modifyStuStatus({
                        ids: ids,
                        status: 1
                    }).then((res) => {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.getStudents();
                    }).catch(() => {
                        this.$message({
                            message: '修改失败',
                            type: 'error'
                        });
                        this.getStudents();
                    });
                }).catch(() => {
                });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "./common.scss";
</style>
