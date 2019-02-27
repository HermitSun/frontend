<template>
    <div class="wrapper">
        <el-form :model="keyValues.a" :rules="keyRules">
            <el-form-item prop="keyName">
                <el-input v-model="keyValues.a.keyName"></el-input>
            </el-form-item>
            <p>{{keyValues.a.keyName}}</p>
        </el-form>
        <el-cascader :options="tempOptions" v-model="selectedOptions" filterable clearable>
        </el-cascader>
    </div>

</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator'

  @Component({})
  export default class Message extends Vue {
    keyValues: any = {
      a: {
        keyName: "",
        keyValue: ""
      },
      b: {
        keyName: "",
        keyValue: ""
      }
    }
    outerRules: any = {
      keyTest: [
        { required: true, message: 'outer', trigger: 'blur' }
      ]
    }
    keyRules: any = {
      keyName: [
        { required: true, message: 'inner', trigger: 'blur' }
      ]
    }
    selectedOptions: any = []
    tempOptions: any = [
      {
        value: '南投縣',
        label: '南投縣',
        children: [
          {
            value: '國立南投高中',
            label: '國立南投高中'
          },
          {
            value: '國立中興高中',
            label: '國立中興高中'
          },
          {
            value: '國立竹山高中',
            label: '國立竹山高中'
          },
          {
            value: '國立暨大附中',
            label: '國立暨大附中'
          },
          {
            value: '國立仁愛高農',
            label: '國立仁愛高農'
          },
          {
            value: '國立埔里高工',
            label: '國立埔里高工'
          },
          {
            value: '國立南投高商',
            label: '國立南投高商'
          },
          {
            value: '國立草屯商工',
            label: '國立草屯商工'
          },
          {
            value: '國立水里商工',
            label: '國立水里商工'
          },
          {
            value: '私立五育高中',
            label: '私立五育高中'
          },
          {
            value: '私立三育高中',
            label: '私立三育高中'
          },
          {
            value: '私立弘明實驗高中',
            label: '私立弘明實驗高中'
          },
          {
            value: '私立普台高中',
            label: '私立普台高中'
          },
          {
            value: '私立同德家商',
            label: '私立同德家商'
          },
          {
            value: '縣立旭光高中',
            label: '縣立旭光高中'
          }]
      }, {
        value: '嘉義市',
        label: '嘉義市',
        children: [
          {
            value: '國立嘉義女中',
            label: '國立嘉義女中'
          },
          {
            value: '國立嘉義高中',
            label: '國立嘉義高中'
          },
          {
            value: '國立華南高商',
            label: '國立華南高商'
          },
          {
            value: '國立嘉義高工',
            label: '國立嘉義高工'
          },
          {
            value: '國立嘉義高商',
            label: '國立嘉義高商'
          },
          {
            value: '國立嘉義家職',
            label: '國立嘉義家職'
          },
          {
            value: '私立興華高中',
            label: '私立興華高中'
          },
          {
            value: '私立仁義高中',
            label: '私立仁義高中'
          },
          {
            value: '私立嘉華高中',
            label: '私立嘉華高中'
          },
          {
            value: '私立輔仁高中',
            label: '私立輔仁高中'
          },
          {
            value: '私立宏仁女中',
            label: '私立宏仁女中'
          },
          {
            value: '私立立仁高中',
            label: '私立立仁高中'
          },
          {
            value: '私立東吳工家',
            label: '私立東吳工家'
          }]
      }, {
        value: '嘉義縣',
        label: '嘉義縣',
        children: [
          {
            value: '國立東石高中',
            label: '國立東石高中'
          },
          {
            value: '國立新港藝術高中',
            label: '國立新港藝術高中'
          },
          {
            value: '國立民雄農工',
            label: '國立民雄農工'
          },
          {
            value: '私立同濟高中',
            label: '私立同濟高中'
          },
          {
            value: '私立協同高中',
            label: '私立協同高中'
          },
          {
            value: '私立協志工商',
            label: '私立協志工商'
          },
          {
            value: '私立萬能工商',
            label: '私立萬能工商'
          },
          {
            value: '私立弘德工商',
            label: '私立弘德工商'
          },
          {
            value: '縣立竹崎高中',
            label: '縣立竹崎高中'
          },
          {
            value: '縣立永慶高中',
            label: '縣立永慶高中'
          }]
      }, {
        value: '基隆市',
        label: '基隆市',
        children: [
          {
            value: '國立基隆女中',
            label: '國立基隆女中'
          },
          {
            value: '國立基隆高中',
            label: '國立基隆高中'
          },
          {
            value: '國立基隆海事',
            label: '國立基隆海事'
          },
          {
            value: '國立基隆商工',
            label: '國立基隆商工'
          },
          {
            value: '私立二信高中',
            label: '私立二信高中'
          },
          {
            value: '輔大聖心高中',
            label: '輔大聖心高中'
          },
          {
            value: '私立光隆家商',
            label: '私立光隆家商'
          },
          {
            value: '私立培德工家',
            label: '私立培德工家'
          },
          {
            value: '市立中山高中',
            label: '市立中山高中'
          },
          {
            value: '市立安樂高中',
            label: '市立安樂高中'
          },
          {
            value: '市立暖暖高中',
            label: '市立暖暖高中'
          },
          {
            value: '市立八斗高中',
            label: '市立八斗高中'
          }]
      }, {
        value: '宜蘭縣',
        label: '宜蘭縣',
        children: [
          {
            value: '國立蘭陽女中',
            label: '國立蘭陽女中'
          },
          {
            value: '國立宜蘭高中',
            label: '國立宜蘭高中'
          },
          {
            value: '國立羅東高中',
            label: '國立羅東高中'
          },
          {
            value: '國立宜蘭高商',
            label: '國立宜蘭高商'
          },
          {
            value: '國立羅東高商',
            label: '國立羅東高商'
          },
          {
            value: '國立蘇澳海事',
            label: '國立蘇澳海事'
          },
          {
            value: '國立羅東高工',
            label: '國立羅東高工'
          },
          {
            value: '國立頭城家商',
            label: '國立頭城家商'
          },
          {
            value: '私立慧燈高中',
            label: '私立慧燈高中'
          },
          {
            value: '私立中道高中',
            label: '私立中道高中'
          },
          {
            value: '縣立南澳高中',
            label: '縣立南澳高中'
          },
          {
            value: '縣立慈心華德福實中',
            label: '縣立慈心華德福實中'
          }]
      }, {
        value: '屏東縣',
        label: '屏東縣',
        children: [
          {
            value: '國立屏東女中',
            label: '國立屏東女中'
          },
          {
            value: '國立屏東高中',
            label: '國立屏東高中'
          },
          {
            value: '國立潮州高中',
            label: '國立潮州高中'
          },
          {
            value: '國立屏北高中',
            label: '國立屏北高中'
          },
          {
            value: '國立內埔農工',
            label: '國立內埔農工'
          },
          {
            value: '國立屏東高工',
            label: '國立屏東高工'
          },
          {
            value: '國立佳冬高農',
            label: '國立佳冬高農'
          },
          {
            value: '國立東港海事',
            label: '國立東港海事'
          },
          {
            value: '國立恆春工商',
            label: '國立恆春工商'
          },
          {
            value: '財團法人屏榮高中',
            label: '財團法人屏榮高中'
          },
          {
            value: '私立陸興高中',
            label: '私立陸興高中'
          },
          {
            value: '私立美和高中',
            label: '私立美和高中'
          },
          {
            value: '私立民生家商',
            label: '私立民生家商'
          },
          {
            value: '私立華洲工家',
            label: '私立華洲工家'
          },
          {
            value: '私立日新工商',
            label: '私立日新工商'
          },
          {
            value: '縣立大同高中',
            label: '縣立大同高中'
          },
          {
            value: '縣立枋寮高中',
            label: '縣立枋寮高中'
          },
          {
            value: '縣立東港高中',
            label: '縣立東港高中'
          },
          {
            value: '縣立來義高中',
            label: '縣立來義高中'
          }]
      }, {
        value: '彰化縣',
        label: '彰化縣',
        children: [
          {
            value: '國立彰化女中',
            label: '國立彰化女中'
          },
          {
            value: '國立員林高中',
            label: '國立員林高中'
          },
          {
            value: '國立彰化高中',
            label: '國立彰化高中'
          },
          {
            value: '國立鹿港高中',
            label: '國立鹿港高中'
          },
          {
            value: '國立溪湖高中',
            label: '國立溪湖高中'
          },
          {
            value: '國立彰師附工',
            label: '國立彰師附工'
          },
          {
            value: '國立永靖高工',
            label: '國立永靖高工'
          },
          {
            value: '國立二林工商',
            label: '國立二林工商'
          },
          {
            value: '國立秀水高工',
            label: '國立秀水高工'
          },
          {
            value: '國立彰化高商',
            label: '國立彰化高商'
          },
          {
            value: '國立員林農工',
            label: '國立員林農工'
          },
          {
            value: '國立員林崇實高工',
            label: '國立員林崇實高工'
          },
          {
            value: '國立員林家商',
            label: '國立員林家商'
          },
          {
            value: '國立北斗家商',
            label: '國立北斗家商'
          },
          {
            value: '私立精誠高中',
            label: '私立精誠高中'
          },
          {
            value: '私立文興高中',
            label: '私立文興高中'
          },
          {
            value: '財團法人正德高中',
            label: '財團法人正德高中'
          },
          {
            value: '私立大慶商工',
            label: '私立大慶商工'
          },
          {
            value: '私立達德商工',
            label: '私立達德商工'
          },
          {
            value: '縣立彰化藝術高中',
            label: '縣立彰化藝術高中'
          },
          {
            value: '縣立二林高中',
            label: '縣立二林高中'
          },
          {
            value: '縣立和美高中',
            label: '縣立和美高中'
          },
          {
            value: '縣立田中高中',
            label: '縣立田中高中'
          },
          {
            value: '縣立成功高中',
            label: '縣立成功高中'
          }]
      }, {
        value: '新北市',
        label: '新北市',
        children: [
          {
            value: '國立華僑高級中等學校',
            label: '國立華僑高級中等學校'
          },
          {
            value: '私立淡江高中',
            label: '私立淡江高中'
          },
          {
            value: '私立康橋高中',
            label: '私立康橋高中'
          },
          {
            value: '私立金陵女中',
            label: '私立金陵女中'
          },
          {
            value: '新北市裕德高級中等學校',
            label: '新北市裕德高級中等學校'
          },
          {
            value: '財團法人南山高中',
            label: '財團法人南山高中'
          },
          {
            value: '財團法人恆毅高中',
            label: '財團法人恆毅高中'
          },
          {
            value: '私立聖心女中',
            label: '私立聖心女中'
          },
          {
            value: '私立崇義高中',
            label: '私立崇義高中'
          },
          {
            value: '財團法人中華高中',
            label: '財團法人中華高中'
          },
          {
            value: '私立東海高中',
            label: '私立東海高中'
          },
          {
            value: '私立格致高中',
            label: '私立格致高中'
          },
          {
            value: '私立醒吾高中',
            label: '私立醒吾高中'
          },
          {
            value: '私立徐匯高中',
            label: '私立徐匯高中'
          },
          {
            value: '財團法人崇光女中',
            label: '財團法人崇光女中'
          },
          {
            value: '私立光仁高中',
            label: '私立光仁高中'
          },
          {
            value: '私立竹林高中',
            label: '私立竹林高中'
          },
          {
            value: '私立及人高中',
            label: '私立及人高中'
          },
          {
            value: '財團法人辭修高中',
            label: '財團法人辭修高中'
          },
          {
            value: '新北市林口康橋高中',
            label: '新北市林口康橋高中'
          },
          {
            value: '私立時雨高中',
            label: '私立時雨高中'
          },
          {
            value: '私立樹人家商',
            label: '私立樹人家商'
          },
          {
            value: '私立復興商工',
            label: '私立復興商工'
          },
          {
            value: '私立南強工商',
            label: '私立南強工商'
          },
          {
            value: '私立穀保家商',
            label: '私立穀保家商'
          },
          {
            value: '私立開明工商',
            label: '私立開明工商'
          },
          {
            value: '私立智光商工',
            label: '私立智光商工'
          },
          {
            value: '私立清傳高商',
            label: '私立清傳高商'
          },
          {
            value: '私立能仁家商',
            label: '私立能仁家商'
          },
          {
            value: '私立豫章工商',
            label: '私立豫章工商'
          },
          {
            value: '私立莊敬工家',
            label: '私立莊敬工家'
          },
          {
            value: '私立中華商海',
            label: '私立中華商海'
          },
          {
            value: '市立泰山高中',
            label: '市立泰山高中'
          },
          {
            value: '市立板橋高中',
            label: '市立板橋高中'
          },
          {
            value: '市立新店高中',
            label: '市立新店高中'
          },
          {
            value: '市立中和高中',
            label: '市立中和高中'
          },
          {
            value: '市立新莊高中',
            label: '市立新莊高中'
          },
          {
            value: '市立新北高中',
            label: '市立新北高中'
          },
          {
            value: '市立林口高中',
            label: '市立林口高中'
          },
          {
            value: '市立瑞芳高工',
            label: '市立瑞芳高工'
          },
          {
            value: '市立三重商工',
            label: '市立三重商工'
          },
          {
            value: '市立新北高工',
            label: '市立新北高工'
          },
          {
            value: '市立淡水商工',
            label: '市立淡水商工'
          },
          {
            value: '市立海山高中',
            label: '市立海山高中'
          },
          {
            value: '市立三重高中',
            label: '市立三重高中'
          },
          {
            value: '市立永平高中',
            label: '市立永平高中'
          },
          {
            value: '市立樹林高中',
            label: '市立樹林高中'
          },
          {
            value: '市立明德高中',
            label: '市立明德高中'
          },
          {
            value: '市立秀峰高中',
            label: '市立秀峰高中'
          },
          {
            value: '市立金山高中',
            label: '市立金山高中'
          },
          {
            value: '市立安康高中',
            label: '市立安康高中'
          },
          {
            value: '市立雙溪高中',
            label: '市立雙溪高中'
          },
          {
            value: '市立石碇高中',
            label: '市立石碇高中'
          },
          {
            value: '市立丹鳳高中',
            label: '市立丹鳳高中'
          },
          {
            value: '市立清水高中',
            label: '市立清水高中'
          },
          {
            value: '市立三民高中',
            label: '市立三民高中'
          },
          {
            value: '市立錦和高中',
            label: '市立錦和高中'
          },
          {
            value: '市立光復高中',
            label: '市立光復高中'
          },
          {
            value: '市立竹圍高中',
            label: '市立竹圍高中'
          },
          {
            value: '市立北大高級中學',
            label: '市立北大高級中學'
          },
          {
            value: '市立鶯歌工商',
            label: '市立鶯歌工商'
          },
          {
            value: '市立樟樹國際實中',
            label: '市立樟樹國際實中'
          },
          {
            value: '私立光華高商進修學校',
            label: '私立光華高商進修學校'
          }]
      }, {
        value: '新竹市',
        label: '新竹市',
        children: [
          {
            value: '國立科學工業園區實驗高中',
            label: '國立科學工業園區實驗高中'
          },
          {
            value: '國立新竹女中',
            label: '國立新竹女中'
          },
          {
            value: '國立新竹高中',
            label: '國立新竹高中'
          },
          {
            value: '國立新竹高商',
            label: '國立新竹高商'
          },
          {
            value: '國立新竹高工',
            label: '國立新竹高工'
          },
          {
            value: '私立光復高中',
            label: '私立光復高中'
          },
          {
            value: '私立曙光女中',
            label: '私立曙光女中'
          },
          {
            value: '私立磐石高中',
            label: '私立磐石高中'
          },
          {
            value: '私立世界高中',
            label: '私立世界高中'
          },
          {
            value: '市立成德高中',
            label: '市立成德高中'
          },
          {
            value: '市立香山高中',
            label: '市立香山高中'
          },
          {
            value: '市立建功高中',
            label: '市立建功高中'
          }]
      }, {
        value: '新竹縣',
        label: '新竹縣',
        children: [
          {
            value: '國立竹東高中',
            label: '國立竹東高中'
          },
          {
            value: '國立關西高中',
            label: '國立關西高中'
          },
          {
            value: '國立竹北高中',
            label: '國立竹北高中'
          },
          {
            value: '私立義民高中',
            label: '私立義民高中'
          },
          {
            value: '私立忠信高中',
            label: '私立忠信高中'
          },
          {
            value: '私立東泰高中',
            label: '私立東泰高中'
          },
          {
            value: '私立仰德高中',
            label: '私立仰德高中'
          },
          {
            value: '私立內思高工',
            label: '私立內思高工'
          },
          {
            value: '縣立六家高級中學',
            label: '縣立六家高級中學'
          },
          {
            value: '縣立湖口高中',
            label: '縣立湖口高中'
          }]
      }, {
        value: '桃園市',
        label: '桃園市',
        children: [
          {
            value: '國立中央大學附屬中壢高中',
            label: '國立中央大學附屬中壢高中'
          },
          {
            value: '國立北科大附屬桃園農工',
            label: '國立北科大附屬桃園農工'
          },
          {
            value: '私立漢英高中',
            label: '私立漢英高中'
          },
          {
            value: '桃園市育達高中',
            label: '桃園市育達高中'
          },
          {
            value: '私立六和高中',
            label: '私立六和高中'
          },
          {
            value: '桃園市復旦高中',
            label: '桃園市復旦高中'
          },
          {
            value: '桃園市治平高中',
            label: '桃園市治平高中'
          },
          {
            value: '桃園市振聲高中',
            label: '桃園市振聲高中'
          },
          {
            value: '私立光啟高中',
            label: '私立光啟高中'
          },
          {
            value: '桃園市啟英高中',
            label: '桃園市啟英高中'
          },
          {
            value: '桃園市清華高中',
            label: '桃園市清華高中'
          },
          {
            value: '桃園市新興高中',
            label: '桃園市新興高中'
          },
          {
            value: '私立至善高中',
            label: '私立至善高中'
          },
          {
            value: '桃園市大興高中',
            label: '桃園市大興高中'
          },
          {
            value: '私立大華高中',
            label: '私立大華高中'
          },
          {
            value: '私立成功工商',
            label: '私立成功工商'
          },
          {
            value: '私立方曙商工',
            label: '私立方曙商工'
          },
          {
            value: '私立永平工商',
            label: '私立永平工商'
          },
          {
            value: '市立龍潭高中',
            label: '市立龍潭高中'
          },
          {
            value: '市立桃園高中',
            label: '市立桃園高中'
          },
          {
            value: '市立武陵高中',
            label: '市立武陵高中'
          },
          {
            value: '市立楊梅高中',
            label: '市立楊梅高中'
          },
          {
            value: '市立陽明高中',
            label: '市立陽明高中'
          },
          {
            value: '市立內壢高中',
            label: '市立內壢高中'
          },
          {
            value: '市立中壢高商',
            label: '市立中壢高商'
          },
          {
            value: '市立中壢家商',
            label: '市立中壢家商'
          },
          {
            value: '市立南崁高中',
            label: '市立南崁高中'
          },
          {
            value: '市立大溪高中',
            label: '市立大溪高中'
          },
          {
            value: '市立壽山高中',
            label: '市立壽山高中'
          },
          {
            value: '市立平鎮高中',
            label: '市立平鎮高中'
          },
          {
            value: '市立觀音高中',
            label: '市立觀音高中'
          },
          {
            value: '市立新屋高級中等學校',
            label: '市立新屋高級中等學校'
          },
          {
            value: '市立永豐高中',
            label: '市立永豐高中'
          },
          {
            value: '市立大園國際高中',
            label: '市立大園國際高中'
          }]
      }, {
        value: '澎湖縣',
        label: '澎湖縣',
        children: [
          {
            value: '國立馬公高中',
            label: '國立馬公高中'
          },
          {
            value: '國立澎湖海事水產',
            label: '國立澎湖海事水產'
          }]
      }, {
        value: '臺中市',
        label: '臺中市',
        children: [
          {
            value: '國立興大附中',
            label: '國立興大附中'
          },
          {
            value: '國立中科實驗高級中學',
            label: '國立中科實驗高級中學'
          },
          {
            value: '財團法人常春藤高中',
            label: '財團法人常春藤高中'
          },
          {
            value: '私立明台高中',
            label: '私立明台高中'
          },
          {
            value: '私立致用高中',
            label: '私立致用高中'
          },
          {
            value: '私立大明高中',
            label: '私立大明高中'
          },
          {
            value: '私立嘉陽高中',
            label: '私立嘉陽高中'
          },
          {
            value: '私立明道高中',
            label: '私立明道高中'
          },
          {
            value: '私立僑泰高中',
            label: '私立僑泰高中'
          },
          {
            value: '私立華盛頓高中',
            label: '私立華盛頓高中'
          },
          {
            value: '私立青年高中',
            label: '私立青年高中'
          },
          {
            value: '私立弘文高中',
            label: '私立弘文高中'
          },
          {
            value: '私立立人高中',
            label: '私立立人高中'
          },
          {
            value: '私立玉山高中',
            label: '私立玉山高中'
          },
          {
            value: '私立慈明高中',
            label: '私立慈明高中'
          },
          {
            value: '華德福大地實驗學校',
            label: '華德福大地實驗學校'
          },
          {
            value: '市立大甲高中',
            label: '市立大甲高中'
          },
          {
            value: '市立清水高中',
            label: '市立清水高中'
          },
          {
            value: '市立豐原高中',
            label: '市立豐原高中'
          },
          {
            value: '市立豐原高商',
            label: '市立豐原高商'
          },
          {
            value: '市立大甲高工',
            label: '市立大甲高工'
          },
          {
            value: '市立東勢高工',
            label: '市立東勢高工'
          },
          {
            value: '市立沙鹿高工',
            label: '市立沙鹿高工'
          },
          {
            value: '市立霧峰農工',
            label: '市立霧峰農工'
          },
          {
            value: '市立后綜高中',
            label: '市立后綜高中'
          },
          {
            value: '市立大里高中',
            label: '市立大里高中'
          },
          {
            value: '市立新社高中',
            label: '市立新社高中'
          },
          {
            value: '市立長億高中',
            label: '市立長億高中'
          },
          {
            value: '市立中港高中',
            label: '市立中港高中'
          },
          {
            value: '市立龍津高中',
            label: '市立龍津高中'
          },
          {
            value: '國立興大附農',
            label: '國立興大附農'
          },
          {
            value: '私立東大附中',
            label: '私立東大附中'
          },
          {
            value: '私立葳格高中',
            label: '私立葳格高中'
          },
          {
            value: '私立新民高中',
            label: '私立新民高中'
          },
          {
            value: '私立宜寧高中',
            label: '私立宜寧高中'
          },
          {
            value: '私立明德高中',
            label: '私立明德高中'
          },
          {
            value: '私立衛道高中',
            label: '私立衛道高中'
          },
          {
            value: '私立曉明女中',
            label: '私立曉明女中'
          },
          {
            value: '私立嶺東高中',
            label: '私立嶺東高中'
          },
          {
            value: '私立磊川華德福實驗教育學校',
            label: '私立磊川華德福實驗教育學校'
          },
          {
            value: '財團法人光華高工',
            label: '財團法人光華高工'
          },
          {
            value: '市立臺中女中',
            label: '市立臺中女中'
          },
          {
            value: '市立臺中一中',
            label: '市立臺中一中'
          },
          {
            value: '市立忠明高中',
            label: '市立忠明高中'
          },
          {
            value: '市立西苑高中',
            label: '市立西苑高中'
          },
          {
            value: '市立東山高中',
            label: '市立東山高中'
          },
          {
            value: '市立惠文高中',
            label: '市立惠文高中'
          },
          {
            value: '市立臺中家商',
            label: '市立臺中家商'
          },
          {
            value: '市立臺中高工',
            label: '市立臺中高工'
          },
          {
            value: '市立臺中二中',
            label: '市立臺中二中'
          },
          {
            value: '市立文華高中',
            label: '市立文華高中'
          }]
      }, {
        value: '臺北市',
        label: '臺北市',
        children: [
          {
            value: '私立育達家商',
            label: '私立育達家商'
          },
          {
            value: '市立西松高中',
            label: '市立西松高中'
          },
          {
            value: '市立中崙高中',
            label: '市立中崙高中'
          },
          {
            value: '臺北市私立協和祐德高級中學',
            label: '臺北市私立協和祐德高級中學'
          },
          {
            value: '市立松山高中',
            label: '市立松山高中'
          },
          {
            value: '市立永春高中',
            label: '市立永春高中'
          },
          {
            value: '市立松山家商',
            label: '市立松山家商'
          },
          {
            value: '市立松山工農',
            label: '市立松山工農'
          },
          {
            value: '國立師大附中',
            label: '國立師大附中'
          },
          {
            value: '私立延平中學',
            label: '私立延平中學'
          },
          {
            value: '私立金甌女中',
            label: '私立金甌女中'
          },
          {
            value: '私立復興實驗高中',
            label: '私立復興實驗高中'
          },
          {
            value: '私立東方工商',
            label: '私立東方工商'
          },
          {
            value: '私立喬治工商',
            label: '私立喬治工商'
          },
          {
            value: '私立開平餐飲',
            label: '私立開平餐飲'
          },
          {
            value: '市立和平高中',
            label: '市立和平高中'
          },
          {
            value: '市立大安高工',
            label: '市立大安高工'
          },
          {
            value: '私立中興中學',
            label: '私立中興中學'
          },
          {
            value: '私立大同高中',
            label: '私立大同高中'
          },
          {
            value: '私立稻江護家',
            label: '私立稻江護家'
          },
          {
            value: '市立中山女中',
            label: '市立中山女中'
          },
          {
            value: '市立大同高中',
            label: '市立大同高中'
          },
          {
            value: '市立大直高中',
            label: '市立大直高中'
          },
          {
            value: '私立強恕中學',
            label: '私立強恕中學'
          },
          {
            value: '私立開南商工',
            label: '私立開南商工'
          },
          {
            value: '市立建國中學',
            label: '市立建國中學'
          },
          {
            value: '市立成功中學',
            label: '市立成功中學'
          },
          {
            value: '市立北一女中',
            label: '市立北一女中'
          },
          {
            value: '私立靜修女中',
            label: '私立靜修女中'
          },
          {
            value: '私立稻江高商',
            label: '私立稻江高商'
          },
          {
            value: '市立明倫高中',
            label: '市立明倫高中'
          },
          {
            value: '市立成淵高中',
            label: '市立成淵高中'
          },
          {
            value: '私立立人高中',
            label: '私立立人高中'
          },
          {
            value: '市立華江高中',
            label: '市立華江高中'
          },
          {
            value: '市立大理高中',
            label: '市立大理高中'
          },
          {
            value: '國立政大附中',
            label: '國立政大附中'
          },
          {
            value: '私立東山高中',
            label: '私立東山高中'
          },
          {
            value: '私立滬江高中',
            label: '私立滬江高中'
          },
          {
            value: '私立大誠高中',
            label: '私立大誠高中'
          },
          {
            value: '私立再興中學',
            label: '私立再興中學'
          },
          {
            value: '私立景文高中',
            label: '私立景文高中'
          },
          {
            value: '市立景美女中',
            label: '市立景美女中'
          },
          {
            value: '市立萬芳高中',
            label: '市立萬芳高中'
          },
          {
            value: '市立木柵高工',
            label: '市立木柵高工'
          },
          {
            value: '市立南港高中',
            label: '市立南港高中'
          },
          {
            value: '市立育成高中',
            label: '市立育成高中'
          },
          {
            value: '市立南港高工',
            label: '市立南港高工'
          },
          {
            value: '私立文德女中',
            label: '私立文德女中'
          },
          {
            value: '私立方濟中學',
            label: '私立方濟中學'
          },
          {
            value: '私立達人女中',
            label: '私立達人女中'
          },
          {
            value: '市立內湖高中',
            label: '市立內湖高中'
          },
          {
            value: '市立麗山高中',
            label: '市立麗山高中'
          },
          {
            value: '市立南湖高中',
            label: '市立南湖高中'
          },
          {
            value: '市立內湖高工',
            label: '市立內湖高工'
          },
          {
            value: '私立泰北高中',
            label: '私立泰北高中'
          },
          {
            value: '私立衛理女中',
            label: '私立衛理女中'
          },
          {
            value: '私立華興中學',
            label: '私立華興中學'
          },
          {
            value: '私立華岡藝校',
            label: '私立華岡藝校'
          },
          {
            value: '市立陽明高中',
            label: '市立陽明高中'
          },
          {
            value: '市立百齡高中',
            label: '市立百齡高中'
          },
          {
            value: '市立士林高商',
            label: '市立士林高商'
          },
          {
            value: '私立薇閣高中',
            label: '私立薇閣高中'
          },
          {
            value: '私立十信高中',
            label: '私立十信高中'
          },
          {
            value: '臺北市私立奎山實驗高級中學',
            label: '臺北市私立奎山實驗高級中學'
          },
          {
            value: '私立惇敘工商',
            label: '私立惇敘工商'
          },
          {
            value: '市立復興高中',
            label: '市立復興高中'
          },
          {
            value: '市立中正高中',
            label: '市立中正高中'
          },
          {
            value: '私立南華高中進修學校',
            label: '私立南華高中進修學校'
          }]
      }, {
        value: '臺南市',
        label: '臺南市',
        children: [
          {
            value: '國立新豐高中',
            label: '國立新豐高中'
          },
          {
            value: '國立臺南大學附中',
            label: '國立臺南大學附中'
          },
          {
            value: '國立北門高中',
            label: '國立北門高中'
          },
          {
            value: '國立新營高中',
            label: '國立新營高中'
          },
          {
            value: '國立後壁高中',
            label: '國立後壁高中'
          },
          {
            value: '國立善化高中',
            label: '國立善化高中'
          },
          {
            value: '國立新化高中',
            label: '國立新化高中'
          },
          {
            value: '國立南科國際實驗高中',
            label: '國立南科國際實驗高中'
          },
          {
            value: '國立新化高工',
            label: '國立新化高工'
          },
          {
            value: '國立白河商工',
            label: '國立白河商工'
          },
          {
            value: '國立北門農工',
            label: '國立北門農工'
          },
          {
            value: '國立曾文家商',
            label: '國立曾文家商'
          },
          {
            value: '國立新營高工',
            label: '國立新營高工'
          },
          {
            value: '國立玉井工商',
            label: '國立玉井工商'
          },
          {
            value: '國立臺南高工',
            label: '國立臺南高工'
          },
          {
            value: '國立曾文農工',
            label: '國立曾文農工'
          },
          {
            value: '私立南光高中',
            label: '私立南光高中'
          },
          {
            value: '私立鳳和高中',
            label: '私立鳳和高中'
          },
          {
            value: '私立港明高中',
            label: '私立港明高中'
          },
          {
            value: '臺南市興國高中',
            label: '臺南市興國高中'
          },
          {
            value: '私立明達高中',
            label: '私立明達高中'
          },
          {
            value: '私立黎明高中',
            label: '私立黎明高中'
          },
          {
            value: '私立新榮高中',
            label: '私立新榮高中'
          },
          {
            value: '私立陽明工商',
            label: '私立陽明工商'
          },
          {
            value: '私立育德工家',
            label: '私立育德工家'
          },
          {
            value: '市立大灣高中',
            label: '市立大灣高中'
          },
          {
            value: '市立永仁高中',
            label: '市立永仁高中'
          },
          {
            value: '國立臺南二中',
            label: '國立臺南二中'
          },
          {
            value: '國立臺南一中',
            label: '國立臺南一中'
          },
          {
            value: '國立臺南女中',
            label: '國立臺南女中'
          },
          {
            value: '國立家齊高中',
            label: '國立家齊高中'
          },
          {
            value: '國立臺南高商',
            label: '國立臺南高商'
          },
          {
            value: '國立臺南海事',
            label: '國立臺南海事'
          },
          {
            value: '私立長榮高中',
            label: '私立長榮高中'
          },
          {
            value: '私立長榮女中',
            label: '私立長榮女中'
          },
          {
            value: '財團法人聖功女中',
            label: '財團法人聖功女中'
          },
          {
            value: '臺南市光華高中',
            label: '臺南市光華高中'
          },
          {
            value: '私立六信高中',
            label: '私立六信高中'
          },
          {
            value: '私立瀛海高中',
            label: '私立瀛海高中'
          },
          {
            value: '私立崑山高中',
            label: '私立崑山高中'
          },
          {
            value: '私立德光高中',
            label: '私立德光高中'
          },
          {
            value: '財團法人慈濟高中',
            label: '財團法人慈濟高中'
          },
          {
            value: '私立南英商工',
            label: '私立南英商工'
          },
          {
            value: '私立亞洲餐旅',
            label: '私立亞洲餐旅'
          },
          {
            value: '私立慈幼工商',
            label: '私立慈幼工商'
          },
          {
            value: '市立南寧高中',
            label: '市立南寧高中'
          },
          {
            value: '市立土城高中',
            label: '市立土城高中'
          }]
      }, {
        value: '臺東縣',
        label: '臺東縣',
        children: [
          {
            value: '國立臺東大學附屬體育高中',
            label: '國立臺東大學附屬體育高中'
          },
          {
            value: '國立臺東女中',
            label: '國立臺東女中'
          },
          {
            value: '國立臺東高中',
            label: '國立臺東高中'
          },
          {
            value: '國立關山工商',
            label: '國立關山工商'
          },
          {
            value: '國立臺東高商',
            label: '國立臺東高商'
          },
          {
            value: '國立成功商水',
            label: '國立成功商水'
          },
          {
            value: '臺東縣均一高中',
            label: '臺東縣均一高中'
          },
          {
            value: '私立育仁高中',
            label: '私立育仁高中'
          },
          {
            value: '私立公東高工',
            label: '私立公東高工'
          },
          {
            value: '縣立蘭嶼高中',
            label: '縣立蘭嶼高中'
          }]
      }, {
        value: '花蓮縣',
        label: '花蓮縣',
        children: [
          {
            value: '國立花蓮女中',
            label: '國立花蓮女中'
          },
          {
            value: '國立花蓮高中',
            label: '國立花蓮高中'
          },
          {
            value: '國立玉里高中',
            label: '國立玉里高中'
          },
          {
            value: '國立花蓮高農',
            label: '國立花蓮高農'
          },
          {
            value: '國立花蓮高工',
            label: '國立花蓮高工'
          },
          {
            value: '國立花蓮高商',
            label: '國立花蓮高商'
          },
          {
            value: '國立光復商工',
            label: '國立光復商工'
          },
          {
            value: '私立海星高中',
            label: '私立海星高中'
          },
          {
            value: '私立四維高中',
            label: '私立四維高中'
          },
          {
            value: '財團法人慈濟大學附中',
            label: '財團法人慈濟大學附中'
          },
          {
            value: '花蓮縣上騰工商',
            label: '花蓮縣上騰工商'
          },
          {
            value: '花蓮縣立體育高中',
            label: '花蓮縣立體育高中'
          },
          {
            value: '縣立南平中學',
            label: '縣立南平中學'
          }]
      }, {
        value: '苗栗縣',
        label: '苗栗縣',
        children: [
          {
            value: '國立苗栗高中',
            label: '國立苗栗高中'
          },
          {
            value: '國立竹南高中',
            label: '國立竹南高中'
          },
          {
            value: '國立卓蘭高中',
            label: '國立卓蘭高中'
          },
          {
            value: '國立苑裡高中',
            label: '國立苑裡高中'
          },
          {
            value: '國立大湖農工',
            label: '國立大湖農工'
          },
          {
            value: '國立苗栗農工',
            label: '國立苗栗農工'
          },
          {
            value: '國立苗栗高商',
            label: '國立苗栗高商'
          },
          {
            value: '私立君毅高中',
            label: '私立君毅高中'
          },
          {
            value: '私立大成高中',
            label: '私立大成高中'
          },
          {
            value: '私立建臺高中',
            label: '私立建臺高中'
          },
          {
            value: '私立全人實驗高中',
            label: '私立全人實驗高中'
          },
          {
            value: '私立中興商工',
            label: '私立中興商工'
          },
          {
            value: '私立育民工家',
            label: '私立育民工家'
          },
          {
            value: '私立賢德工商',
            label: '私立賢德工商'
          },
          {
            value: '私立龍德家商',
            label: '私立龍德家商'
          },
          {
            value: '縣立三義高中',
            label: '縣立三義高中'
          },
          {
            value: '縣立苑裡高中',
            label: '縣立苑裡高中'
          },
          {
            value: '縣立興華高中',
            label: '縣立興華高中'
          },
          {
            value: '縣立大同高中',
            label: '縣立大同高中'
          }]
      }, {
        value: '連江縣',
        label: '連江縣',
        children: [
          {
            value: '國立馬祖高中',
            label: '國立馬祖高中'
          }]
      }, {
        value: '金門縣',
        label: '金門縣',
        children: [
          {
            value: '國立金門高中',
            label: '國立金門高中'
          },
          {
            value: '國立金門農工',
            label: '國立金門農工'
          }]
      }, {
        value: '雲林縣',
        label: '雲林縣',
        children: [
          {
            value: '國立斗六高中',
            label: '國立斗六高中'
          },
          {
            value: '國立北港高中',
            label: '國立北港高中'
          },
          {
            value: '國立虎尾高中',
            label: '國立虎尾高中'
          },
          {
            value: '國立虎尾農工',
            label: '國立虎尾農工'
          },
          {
            value: '國立西螺農工',
            label: '國立西螺農工'
          },
          {
            value: '國立斗六家商',
            label: '國立斗六家商'
          },
          {
            value: '國立北港農工',
            label: '國立北港農工'
          },
          {
            value: '國立土庫商工',
            label: '國立土庫商工'
          },
          {
            value: '私立永年高中',
            label: '私立永年高中'
          },
          {
            value: '私立正心高中',
            label: '私立正心高中'
          },
          {
            value: '私立文生高中',
            label: '私立文生高中'
          },
          {
            value: '私立巨人高中',
            label: '私立巨人高中'
          },
          {
            value: '私立揚子高中',
            label: '私立揚子高中'
          },
          {
            value: '財團法人義峰高中',
            label: '財團法人義峰高中'
          },
          {
            value: '私立福智高中',
            label: '私立福智高中'
          },
          {
            value: '雲林縣維多利亞實驗高中',
            label: '雲林縣維多利亞實驗高中'
          },
          {
            value: '私立大成商工',
            label: '私立大成商工'
          },
          {
            value: '私立大德工商',
            label: '私立大德工商'
          },
          {
            value: '縣立斗南高中',
            label: '縣立斗南高中'
          },
          {
            value: '縣立麥寮高中',
            label: '縣立麥寮高中'
          },
          {
            value: '縣立古坑華德福實驗高級中學',
            label: '縣立古坑華德福實驗高級中學'
          }]
      }, {
        value: '高雄市',
        label: '高雄市',
        children: [
          {
            value: '國立鳳山高中',
            label: '國立鳳山高中'
          },
          {
            value: '國立岡山高中',
            label: '國立岡山高中'
          },
          {
            value: '國立旗美高中',
            label: '國立旗美高中'
          },
          {
            value: '國立鳳新高中',
            label: '國立鳳新高中'
          },
          {
            value: '國立旗山農工',
            label: '國立旗山農工'
          },
          {
            value: '國立岡山農工',
            label: '國立岡山農工'
          },
          {
            value: '國立鳳山商工',
            label: '國立鳳山商工'
          },
          {
            value: '財團法人新光高中',
            label: '財團法人新光高中'
          },
          {
            value: '財團法人普門中學',
            label: '財團法人普門中學'
          },
          {
            value: '私立正義高中',
            label: '私立正義高中'
          },
          {
            value: '私立義大國際高中',
            label: '私立義大國際高中'
          },
          {
            value: '私立中山工商',
            label: '私立中山工商'
          },
          {
            value: '私立旗美商工',
            label: '私立旗美商工'
          },
          {
            value: '私立高英工商',
            label: '私立高英工商'
          },
          {
            value: '私立華德工家',
            label: '私立華德工家'
          },
          {
            value: '私立高苑工商',
            label: '私立高苑工商'
          },
          {
            value: '市立文山高中',
            label: '市立文山高中'
          },
          {
            value: '市立林園高中',
            label: '市立林園高中'
          },
          {
            value: '市立仁武高中',
            label: '市立仁武高中'
          },
          {
            value: '市立路竹高中',
            label: '市立路竹高中'
          },
          {
            value: '市立六龜高中',
            label: '市立六龜高中'
          },
          {
            value: '市立福誠高中',
            label: '市立福誠高中'
          },
          {
            value: '私立明誠高中',
            label: '私立明誠高中'
          },
          {
            value: '私立大榮高中',
            label: '私立大榮高中'
          },
          {
            value: '私立中華藝校',
            label: '私立中華藝校'
          },
          {
            value: '市立鼓山高中',
            label: '市立鼓山高中'
          },
          {
            value: '市立左營高中',
            label: '市立左營高中'
          },
          {
            value: '市立新莊高中',
            label: '市立新莊高中'
          },
          {
            value: '市立海青工商',
            label: '市立海青工商'
          },
          {
            value: '市立三民家商',
            label: '市立三民家商'
          },
          {
            value: '國立中山大學附屬國光高中',
            label: '國立中山大學附屬國光高中'
          },
          {
            value: '市立中山高中',
            label: '市立中山高中'
          },
          {
            value: '市立楠梓高中',
            label: '市立楠梓高中'
          },
          {
            value: '私立立志高中',
            label: '私立立志高中'
          },
          {
            value: '南海月光實驗學校',
            label: '南海月光實驗學校'
          },
          {
            value: '私立樹德家商',
            label: '私立樹德家商'
          },
          {
            value: '市立高雄中學',
            label: '市立高雄中學'
          },
          {
            value: '市立三民高中',
            label: '市立三民高中'
          },
          {
            value: '市立高雄高工',
            label: '市立高雄高工'
          },
          {
            value: '市立新興高中',
            label: '市立新興高中'
          },
          {
            value: '市立高雄高商',
            label: '市立高雄高商'
          },
          {
            value: '市立高雄女中',
            label: '市立高雄女中'
          },
          {
            value: '國立高師大附中',
            label: '國立高師大附中'
          },
          {
            value: '私立復華高中',
            label: '私立復華高中'
          },
          {
            value: '天主教道明中學',
            label: '天主教道明中學'
          },
          {
            value: '私立國際商工',
            label: '私立國際商工'
          },
          {
            value: '私立三信家商',
            label: '私立三信家商'
          },
          {
            value: '市立中正高中',
            label: '市立中正高中'
          },
          {
            value: '市立前鎮高中',
            label: '市立前鎮高中'
          },
          {
            value: '市立瑞祥高中',
            label: '市立瑞祥高中'
          },
          {
            value: '市立中正高工',
            label: '市立中正高工'
          },
          {
            value: '國立高餐大附屬餐旅中學',
            label: '國立高餐大附屬餐旅中學'
          },
          {
            value: '私立高鳳工家',
            label: '私立高鳳工家'
          },
          {
            value: '市立小港高中',
            label: '市立小港高中'
          }
        ],
      }]
  }
</script>

<style scoped>

</style>
