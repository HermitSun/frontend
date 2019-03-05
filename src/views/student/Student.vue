<template>
    <el-row class="container">
        <!--標題欄-->
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="this.collapsed?'logo-collapse-width':'logo-width'">
                <div @click="backToIndex" style="cursor: pointer">
                    <div :class="this.collapsed?'logo-img-collapse':'logo-img'"></div>
                    {{this.collapsed?'':this.systemName}}
                </div>
            </el-col>
            <el-col :span="10">
                <div class="tools" @click.prevent="handleCollapse">
                    <el-tooltip placement="right">
                        <div slot="content">{{this.collapsed?'打開側邊欄':'收起側邊欄'}}</div>
                        <i class="el-icon-arrow-right" v-if="this.collapsed"></i>
                        <i class="el-icon-arrow-left" v-else></i>
                    </el-tooltip>
                </div>
            </el-col>
            <el-col :span="4" class="userInfo">
                <div @click="logout" style="cursor: pointer">
                    <el-tooltip placement="left">
                        <div slot="content">登出</div>
                        <i class="el-icon-close"></i>
                    </el-tooltip>
                </div>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <!--側邊欄-->
            <el-aside :class="this.collapsed?'menu-collapsed':'menu-expanded'">
                <el-menu :default-active="$route.path" router :collapse="this.collapsed"
                         :collapse-transition="false" active-text-color="#FF0000" background-color="#eef1f6">
                    <template v-for="(item,index) in $router.options.routes" v-if="item.path==='/student'">
                        <el-submenu :index="index+''" v-if="!item.leaf">
                            <template slot="title">
                                <i :class="item.iconClass"></i>
                                <span slot="title" style="font-size: medium">{{item.name}}</span>
                            </template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path"
                                          :disabled="child.path==='/student/senior-check'">
                                {{child.name}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="item.path" class="leaf">
                            <i :class="item.iconClass"></i>
                            <span style="font-size: medium" slot="title">
                                {{item.name}}
                                <el-badge :value="hasNewMessage?'new':''"></el-badge>
                            </span>
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
                        <Message v-show="$route.path==='/student'"></Message>
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
  import { delToken, getStudentToken } from 'utils/token.ts'
  import Message from './Message.vue'
  import { studentGetMessage } from 'utils/api'

  @Component({
    components: { Message }
  })
  export default class Student extends Vue {
    systemName: string = '台灣免試生系統'
    collapsed: boolean = false//是否折疊（默認否）
    userName: string = ''
    userAvatar: string = ''
    //收到的消息
    hasNewMessage: boolean = false
    token: string = ''

    mounted () {
      this.token = getStudentToken()
      /*如果token不存在，則跳轉到登錄頁*/
      if (this.token == '') {
        this.$router.push('/')
      }
      // this.handleNewMessage()
      // window.setInterval(() => {
      //   setTimeout(this.handleNewMessage, 0)
      // }, 60000)//60s查詢一次消息
    }

    // handleNewMessage () {
    //   studentGetMessage()
    //     .then(res => {
    //       this.hasNewMessage = res.data.length > 0
    //     })
    //     .catch(err => {
    //       this.hasNewMessage = false
    //     })
    // }

    handleCollapse () {
      this.collapsed = !this.collapsed
    }

    backToIndex () {
      this.$router.push('/student')
    }

    logout () {
      this.$confirm('確認退出?', '提示', {})
        .then(() => {
          delToken()
          this.$router.push('/')
        })
        .catch((err) => {
          // 啥都不做
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
        width: 100%; //確保佔滿整個屏幕

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
                padding-top: 5px;
                background: $color-primary;

                .logo-img-collapse {
                    width: 50px;
                    height: 30px;
                    position: absolute;
                    left: 5px;
                    top: 13px;
                    background: url(./img/NJULogo.png) center center no-repeat;
                    background-size: 50px
                }

                .logo-img {
                    width: 50px;
                    height: 30px;
                    position: absolute;
                    left: 10px;
                    top: -2px;
                    background: url(./img/NJULogo.png) center center no-repeat;
                    background-size: 50px
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
                margin-left: 5px;
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

                    //利用深選擇器修改字體粗細（卑微）

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
