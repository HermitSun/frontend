<template>
    <div class="wrapper">
        <el-table
                :data="messages"
                style="width: 100%" >
            <el-table-column type="expand">
                <template slot-scope="props">
                    <span>{{ props.row.desc }}</span>
                </template>
            </el-table-column>
            <el-table-column label="消息 MESSAGE"  width="850" prop="title"></el-table-column>
            <el-table-column label="时间 TIME"  prop="time"></el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'

    @Component({})
    export default class Guide extends Vue {
        messages: any =[{
            title:'暂无新消息！'
        },
            {
                title:'message2',
                time: '2019.3.1',
                desc: 'message2\'message2\'message2\'message2\'message2\'message2\'message2\''
            },
            {
                title:'message1',
                time: '2019.3.1',
                desc: '荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻,荷兰优质淡奶，奶香浓而不腻'
            }
        ]
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
<style>
    .demo-table-expand label {
        width: 100px;
        color: #99a9bf;
    }
</style>