<template>
    <el-row class="container">
        <!--标题栏-->
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="this.collapsed?'logo-collapse-width':'logo-width'">
                <div @click="backToIndex" style="cursor: pointer">
                    <img src="./img/NJULogo.png" :class="this.collapsed?'logo-img-collapse':'logo-img'"
                         alt="NJU's logo"/>
                    {{this.collapsed?'':this.systemName}}
                </div>
            </el-col>
            <el-col :span="10">
                <div class="tools" @click.prevent="handleCollapse">
                    <el-tooltip placement="right">
                        <div slot="content">{{this.collapsed?'打开侧边栏':'收起侧边栏'}}</div>
                        <i class="el-icon-arrow-right" v-if="this.collapsed"></i>
                        <i class="el-icon-arrow-left" v-else></i>
                    </el-tooltip>
                </div>
            </el-col>
            <el-col :span="4" class="userInfo">
                <el-dropdown trigger="hover" style="cursor: pointer;">
                    <i class="el-icon-more" style="color: white; font-size: 18px;"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="$router.push('/admin/settings')">
                            <i class="el-icon-setting"></i>
                            <span>设置</span>
                        </el-dropdown-item>
                        <el-dropdown-item :divided="true" @click.native="logout">
                            <i class="el-icon-back"></i>
                            <span>退出</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <!--侧边栏-->
            <el-aside :class="this.collapsed?'menu-collapsed':'menu-expanded'">
                <el-menu :default-active="$route.path" router :collapse="this.collapsed"
                         :collapse-transition="false" active-text-color="#FF0000" background-color="#eef1f6">
                    <template v-for="(item,index) in $router.options.routes" v-if="item.path==='/admin'&&!item.hidden">
                        <el-submenu :index="index+''" v-if="!item.leaf">
                            <template slot="title">
                                <i :class="item.iconClass"></i>
                                <span slot="title" style="font-size: medium">{{item.name}}</span>
                            </template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">
                                {{child.name}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="item.children[0].path" class="leaf">
                            <i :class="item.iconClass"></i>
                            <span slot="title" style="font-size: medium">{{item.children[0].name}}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-aside>
            <el-main class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <strong class="title">{{$route.name}}</strong>
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                                {{ item.name }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </el-main>
        </el-col>
    </el-row>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'
  import { delToken, getAdminToken } from 'utils/token.ts'
  import Settings from '@/views/admin/Settings.vue'

  @Component({
    components: {
      Settings
    }
  })
  export default class Admin extends Vue {
    systemName: string = '台湾免试生管理系统'
    collapsed: boolean = false//是否折叠（默认否）
    userName: string = ''
    userAvatar: string = ''
    //收到的消息
    hasNewMessage: boolean = false
    totalMessage: number = 0
    token: string = ''

    mounted () {
      this.token = getAdminToken()
      /*如果cookie不存在，则跳转到登录页*/
      if (this.token == '') {
        this.$router.push('/')
      }
      //此处还缺少获取用户名称和信息数量的方法
      window.setInterval(() => {
        setTimeout(this.handleNewMessage, 0)
      }, 30000)//30s查询一次消息
    }

    handleNewMessage () {
      this.hasNewMessage = !!this.totalMessage
    }

    handleCollapse () {
      this.collapsed = !this.collapsed
    }

    backToIndex () {
      this.$router.push('/admin')
    }

    logout () {
      this.$confirm('确认退出?', '提示', {})
        .then(() => {
          delToken()
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
                width: 14px;
                height: 60px;
                line-height: 60px;
                cursor: pointer;
            }
        }

        .main {
            display: flex;
            position: absolute;
            top: 60px;
            bottom: 0;
            overflow: hidden;

            .el-aside {
                flex: 0 0 250px;

                .el-menu {
                    height: 100%;

                    /deep/ span {
                        font-weight: bold !important;
                    }

                    //利用深选择器修改字体粗细（卑微）

                    .el-menu-item:not(.leaf) {
                        background-color: #e4e8f1 !important;
                    }

                    .el-menu-item:not(.leaf):hover {
                        background-color: #8c939d !important;
                    }
                }
            }

            .menu-collapsed {
                flex: 0 0 60px;
                width: 60px;
            }

            .menu-expanded {
                flex: 0 0 230px;
                width: 230px;
            }

            .content-container {
                flex: 1;
                overflow-y: scroll;
                padding: 20px;

                .breadcrumb-container {
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

<style lang="scss" rel="stylesheet/scss">
    .avatarBadge {
        .el-badge__content {
            top: 10px !important;
        }
    }
</style>
