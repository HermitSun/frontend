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
            <el-table-column type="selection" width="50">
            </el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="table-expand">
                        <el-form-item label="学生姓名">
                            <span>{{ props.row.name}}</span>
                        </el-form-item>
                        <el-form-item label="选考科目">
                            <span>{{ props.row.artOrSci?'文':'理'}}</span>
                        </el-form-item>
                        <el-form-item label="第一志愿">
                            <span>{{ props.row.curriculumChoices.firstChoice }}</span>
                        </el-form-item>
                        <el-form-item label="第二志愿">
                            <span>{{ props.row.curriculumChoices.secondChoice }}</span>
                        </el-form-item>
                        <el-form-item label="第三志愿">
                            <span>{{ props.row.curriculumChoices.thirdChoice }}</span>
                        </el-form-item>
                        <el-form-item label="第四志愿">
                            <span>{{ props.row.curriculumChoices.fourthChoice }}</span>
                        </el-form-item>
                        <el-form-item label="接受调剂">
                            <span>{{ props.row.acceptAssignment?'是':'否' }}</span>
                        </el-form-item>
                        <!--<el-form-item label="成绩详情">-->
                        <!--<span>{{ props.row.singleSubjectCriteria}}</span>-->
                        <!--</el-form-item>-->
                        <template v-for="(family,index) in props.row.familyParticulars">
                            <el-form-item :label="'家庭成员'+(index+1)">
                                <span>{{family.relationship+', '+family.name+', '+family.companyName+family.occupation}}</span>
                            </el-form-item>
                        </template>
                        <template v-for="(award,index) in props.row.activities">
                            <el-form-item :label="'获得奖项'+(index+1)">
                                <span>{{award.organization+', '+award.award+', '+award.attendingDate.split('T')[0]}}</span>
                            </el-form-item>
                        </template>
                        <el-form-item label="个人陈述">
                            <span>{{ props.row.personalStatement }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type="index" label="#" width="80">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="100">
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="80">
            </el-table-column>
            <el-table-column prop="highSchool" label="就读高中" min-width="180" style="max-width: 200px">
            </el-table-column>
            <el-table-column label="审核结果" width="150" :sortable="true" :sort-method="sortByResult">
                <template slot-scope="scope">
                    <el-tag type="info" v-if="scope.row.from===2">未处理</el-tag>
                    <el-tag type="success" v-else-if="scope.row.from===0">通过</el-tag>
                    <el-tag type="danger" v-else-if="scope.row.from===1">未通过</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160" fixed="right">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handlePass(scope.row)">
                        {{scope.row.from===0?'取消':'通过'}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--导出和页码-->
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="exportVisible=true" icon="el-icon-download"
                       :disabled="this.allSelected.length===0&&this.currentSelected.length===0">批量导出
            </el-button>
            <el-button type="danger" @click="sendResult" icon="el-icon-check">发送结果</el-button>
            <!--<el-button type="danger" @click="allPass" icon="el-icon-check"-->
            <!--:disabled="this.allSelected.length===0&&this.currentSelected.length===0">一键通过-->
            <!--</el-button>-->
            <!--<el-button type="danger" @click="allCancel" icon="el-icon-close"-->
            <!--:disabled="this.allSelected.length===0&&this.currentSelected.length===0">一键取消-->
            <!--</el-button>-->
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="15"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <!--编辑-->
        <el-dialog title="编辑" :visible.snyc="editFormVisible" :before-close="handleEditClose">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓" prop="firstName">
                    <el-input v-model="editForm.firstName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="名" prop="lastName">
                    <el-input v-model="editForm.lastName" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="性别">-->
                <!--<el-radio-group v-model="editForm.gender" :disabled="true">-->
                <!--<el-radio class="radio" :label="'男'">男</el-radio>-->
                <!--<el-radio class="radio" :label="'女'">女</el-radio>-->
                <!--</el-radio-group>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="总级分">-->
                <!--<el-input-number v-model="editForm.score" :min="0" :max="72" :disabled="true"></el-input-number>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="就读高中" prop="school">-->
                <!--<el-input v-model="editForm.school"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
        <!--导出-->
        <el-dialog title="导出" :visible.snyc="exportVisible" :before-close="handleExportClose">
            <el-button type="primary" @click="batchExport(0)" :disabled="true"
                       style="float: left; margin-left: 150px">
                {{exportExcelFinished?'下载Excel':'导出为Excel'}}
            </el-button>
            <el-button type="primary" @click="batchExport(1)" v-if="!exportPDFFinished"
                       style="float: right; margin-right: 150px;">导出为PDF
            </el-button>
            <el-button type="primary" @click="downloadPDF" v-else
                       style="float: right; margin-right: 150px;">下载PDF
            </el-button>
            <div class="clearFix"></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="exportVisible = false">取消</el-button>
                <el-button type="primary" @click.native="exportVisible = false">确定</el-button>
            </div>
        </el-dialog>
    </el-main>
</template>

<script>
    import {
        checkStuList,
        exportSelected,
        modifyStuInfo,
        modifyStuStatus,
        createPdf,
        updateStudentName,
        updateStudentState,
        notifyStudent
    } from 'utils/api';

    export default {
        name: 'JuniorAll',
        data() {
            return {
                filters: {name: ''},
                students: [],
                currentSelected: [],
                allSelected: [],
                exportExcelFinished: false,
                exportPDFFinished: false,
                pdfUrl: '',

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
                    firstName: '',
                    lastName: '',
                    idCardNumber: ''
                    // gender: '',
                    // score: 0,
                    // school: ''
                },

                exportVisible: false,
                exportForms: {
                    'Excel': 0,
                    'PDF': 1
                },
                exportForm: 0,

                froms: {
                    'JUNIOR_PASSED': 0,
                    'JUNIOR_FAILED': 1,
                    'NULL': 2,
                    'SENIOR_PASSED': 3,
                    'SENIOR_FAILED': 4
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.getStudents()
            })
        },
        methods: {
            sendResult() {
                // 发送结果
                this.$confirm('发送通知邮件给通过审核的学生？')
                    .then(() => {
                        notifyStudent({
                            state: 0
                        }).then(res => {
                            if (res.data.succeed) {
                                this.$message({
                                    message: '发送成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(err => {
                            this.$message({
                                message: '发送失败',
                                type: 'error'
                            });
                        })
                    }).catch(() => {
                    //
                })
            },
            handleSelectionChange(selected) {
                this.currentSelected = selected
            },
            getStudents() {
                let _this = this;
                this.listLoading = true;
                this.students = [];
                checkStuList({
                    from: this.froms.NULL,
                    page: this.page,
                    name: this.filters.name
                }).then((res) => {
                    this.total += res.data.total;
                    this.students = res.data.stuList.filter(list => {
                        return list !== null;
                    });
                    for (let i = 0; i < this.students.length; ++i) {
                        this.students[i].name = this.students[i].firstName + this.students[i].lastName;
                        this.students[i].from = res.data.studentfrom;
                    }
                    return _this;
                }).then(that => {
                    checkStuList({
                        from: _this.froms.JUNIOR_FAILED,
                        page: _this.page,
                        name: _this.filters.name
                    }).then((res) => {
                        _this.total += res.data.total;
                        let students = res.data.stuList.filter(list => {
                            return list !== null;
                        });
                        for (let i = 0; i < students.length; ++i) {
                            students[i].name = students[i].firstName + students[i].lastName;
                            students[i].from = res.data.studentfrom;
                            _this.students.push(students[i]);
                        }
                        return _this;
                    }).catch(err => {
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    })
                }).then(that => {
                    checkStuList({
                        from: _this.froms.JUNIOR_PASSED,
                        page: _this.page,
                        name: _this.filters.name
                    }).then((res) => {
                        _this.total += res.data.total;
                        let students = res.data.stuList.filter(list => {
                            return list !== null;
                        });
                        for (let i = 0; i < students.length; ++i) {
                            students[i].name = students[i].firstName + students[i].lastName;
                            students[i].from = res.data.studentfrom;
                            _this.students.push(students[i]);
                        }
                        this.listLoading = false;
                        return _this;
                    }).catch(err => {
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    })
                }).then(that => {
                    _this.setSelectedRow();
                }).catch(err => {
                    this.$message({
                        message: '读取失败',
                        type: 'error'
                    });
                    this.listLoading = false;
                })
            },
            handleCurrentChange(val) {
                this.changePageRecordSelectedData();
                this.page = val;
                this.getStudents();
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
                    allSelectedIds.push(this.allSelected[i][idKey]);
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
                    if (allSelectedIds.indexOf(noSelectIds[j]) >= 0) {
                        for (let i = 0; i < this.allSelected.length; i++) {
                            if (this.allSelected[i][idKey] === noSelectIds[j]) {
                                // 如果总选择中有未被选中的，则删除
                                this.allSelected.splice(i, 1);
                                break;
                            }
                        }
                    }
                }
            },
            sortByResult(stu1, stu2) {
                return stu1.from - stu2.from;
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
                this.$confirm('确认修改？', '提示', {}).then(() => {
                    let params = {
                        identityNum: row.idCardNumber,
                        from: this.froms.JUNIOR_PASSED
                    };
                    if (row.from === this.froms.JUNIOR_PASSED) {
                        params.from = this.froms.JUNIOR_FAILED;
                    }
                    updateStudentState(params)
                        .then(res => {
                            if (res.data.succeed) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.getStudents();
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(err => {
                        this.$message({
                            message: '修改失败',
                            type: 'error'
                        });
                    })
                }).catch(() => {
                });
            },
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {})
                            .then(() => {
                                this.editLoading = true;
                                let params = {
                                    identityNum: this.editForm.idCardNumber,
                                    firstName: this.editForm.firstName,
                                    lastName: this.editForm.lastName
                                };
                                updateStudentName(params)
                                    .then(res => {
                                        if (res.data.succeed) {
                                            this.$message({
                                                message: '修改成功',
                                                type: 'success'
                                            });
                                            this.editFormVisible = false;
                                            this.getStudents();
                                        } else {
                                            this.$message({
                                                message: res.data.msg,
                                                type: 'error'
                                            });
                                        }
                                    })
                                    .catch(err => {
                                        this.$message({
                                            message: '导出失败',
                                            type: 'error'
                                        });
                                    })
                            })
                    }
                })
            },
            batchExport(form) {
                // 0是Excel，1是PDF
                let ids = [];
                if (this.allSelected.length === 0) {
                    ids = this.currentSelected.map(student => student.idCardNumber);
                } else {
                    ids = this.allSelected.map(student => student.idCardNumber);
                }
                if (form === 0) {
                    // 导出为Excel
                } else {
                    createPdf(ids)
                        .then((res) => {
                            if (res.data.succeed) {
                                this.$message({
                                    message: '导出成功',
                                    type: 'success'
                                });
                                this.exportPDFFinished = true;
                            } else {
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                        })
                        .catch(() => {
                            this.$message({
                                message: '导出失败',
                                type: 'error'
                            });
                        })
                }
            },
            handleExportClose() {
                this.$confirm('确认关闭？')
                    .then(() => {
                        this.exportVisible = false;
                    })
                    .catch(() => {
                    })
            },
            downloadPDF() {
                exportSelected()
                    .then(res => {
                        if (res.data) {
                            console.log(res.data);
                            this.download(res.data);
                        } else {
                            this.$message({
                                message: '下载失败',
                                type: 'error'
                            });
                        }
                    })
                    .catch(err => {
                        this.$message({
                            message: '下载失败',
                            type: 'error'
                        });
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
                link.setAttribute('download', '学生信息.zip');//名称可以修改
                document.body.appendChild(link);
                link.click()
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "./common.scss";
</style>
