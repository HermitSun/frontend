<template>
    <el-row class="container">
        <!--标题栏-->
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="this.collapsed?'logo-collapse-width':'logo-width'">
                <img src="./img/NJULogo.png" :class="this.collapsed?'logo-img-collapse':'logo-img'" alt="NJU's logo"/>
                {{this.collapsed?'':this.systemName}}
            </el-col>
            <el-col :span="10">
                <div class="tools" @click.prevent="handleCollapse">
                    <el-tooltip placement="right">
                        <div slot="content">{{this.collapsed?'打开侧边栏':'收起侧边栏'}}</div>
                        <i class="fa fa-arrow-right" v-if="this.collapsed"></i>
                        <i class="fa fa-arrow-left" v-else></i>
                    </el-tooltip>
                </div>
            </el-col>
            <el-col :span="4" class="userInfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userInfo-inner">
                        <img :src="this.userAvatar?this.userAvatar:require('./img/avatar.jpg')"/>
                        {{this.userName}}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <!--侧边栏-->
            <aside :class="this.collapsed?'menu-collapsed':'menu-expanded'">
                <el-menu default-active="1-1" :default-openeds="['1','2']" class="el-menu-vertical-demo"
                         @open="handleOpen" @close="handleClose" :collapse="this.collapsed" background-color="#eef1f6"
                         :collapse-transition="false" :router="true">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-date"></i>
                            <span slot="title">招生</span>
                        </template>
                        <el-menu-item index="1-1">开启本次招生</el-menu-item>
                        <el-menu-item index="1-2">设置招生专业</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-edit-outline"></i>
                            <span slot="title">审核</span>
                        </template>
                        <el-menu-item index="2-1">未通过</el-menu-item>
                        <el-menu-item index="2-2">已通过</el-menu-item>
                        <el-menu-item index="2-2">全部</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3" :disabled="this.collapsed?false:true">
                        <i class="el-icon-message"></i>
                        <span slot="title">发布</span>
                    </el-menu-item>
                </el-menu>
            </aside>
        </el-col>
    </el-row>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator'
  import {getCookie, deleteCookie} from "../../assets/utils/cookie.ts"

  @Component({})
  export default class extends Vue {
    systemName: string = '台湾免试生管理系统'
    collapsed: boolean = false//是否折叠（默认否）
    userName: string = ''
    userAvatar: string = ''

    mounted () {
      this.userName = getCookie('name')
      console.log(this.userName)
      /*如果cookie不存在，则跳转到登录页*/
      if (this.userName == '') {
        this.$router.push('/')
      }
    }

    handleCollapse () {
      this.collapsed = !this.collapsed
    }

    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    }

    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }

    logout () {
      this.$confirm('确认退出?', '提示', {})
        .then(() => {
          deleteCookie('username')
          deleteCookie('name')
          this.$router.push('/')
        })
        .catch(() => {
        })
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    $color-primary: #6A005F;
    .container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%; //确保占满整个屏幕

        .header {
            height: 60px;
            line-height: 60px;
            background: $color-primary;
            color: #fff;

            .userInfo {
                text-align: right;
                padding-right: 35px;
                float: right;

                .userInfo-inner {
                    cursor: pointer;
                    color: #fff;

                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin: 10px 0 10px 10px;
                        float: right;
                    }
                }
            }

            .logo {
                height: 60px;
                font-size: 22px;
                padding-left: 20px;
                padding-right: 10px;
                padding-top: 5px;
                background: $color-primary;

                .logo-img-collapse {
                    width: 50px;
                    position: absolute;
                    left: 5px;
                    top: 23px;
                }

                .logo-img {
                    width: 50px;
                    position: absolute;
                    left: 10px;
                    top: 5px;
                }

                .txt {
                    color: #fff;
                }
            }

            .logo-collapse-width {
                width: 60px
            }

            .logo-width {
                width: 250px;
            }

            .tools {
                padding: 0 23px;
                width: 14px;
                height: 60px;
                line-height: 60px;
                cursor: pointer;
            }
        }

        .main {
            display: flex;
            // background: #324057;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;

            aside {
                flex: 0 0 250px;
                width: 250px;
                // position: absolute;
                // top: 0px;
                // bottom: 0px;
                .el-menu {
                    height: 100%;

                    .el-menu-item {
                        background: #ffffff !important;
                        font-size: 14px !important;
                    }
                }

                .collapsed {
                    width: 60px;

                    .item {
                        position: relative;
                    }

                    .submenu {
                        position: absolute;
                        top: 0;
                        left: 60px;
                        z-index: 99999;
                        height: auto;
                        display: none;
                    }

                }
            }

            .menu-collapsed {
                flex: 0 0 60px;
                width: 60px;
            }

            .menu-expanded {
                flex: 0 0 200px;
                width: 200px;
            }

            .content-container {
                // background: #f1f2f7;
                flex: 1;
                // position: absolute;
                // right: 0px;
                // top: 0px;
                // bottom: 0px;
                // left: 230px;
                overflow-y: scroll;
                padding: 20px;

                .breadcrumb-container {
                    //margin-bottom: 15px;
                    .title {
                        width: 200px;
                        float: left;
                        color: #475669;
                    }

                    .breadcrumb-inner {
                        float: right;
                    }
                }

                .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>
