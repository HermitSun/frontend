<template>
    <el-card class="wrapper">
        <div v-if="hasFinished">
            <p style="color: #67C23A">您已完成申請表填寫。</p>
        </div>
        <el-form :model="this.form" :rules="this.rules" ref="form" label-width="138px" :inline="true">
            <el-collapse accordion>
                <el-collapse-item title="第一部分">
                    <div class="part1">
                        <el-row>
                            <el-col :span="24">
                                <div class="title grid-content bg-purple-dark">一. PERSONAL PARTICULARS 個人基本情況</div>
                            </el-col>
                        </el-row>

                        <el-form-item label="SIMPLIFICATION 簡體姓名" label-width="195px">
                            <el-form-item label="FAMILY NAME 姓" prop="firstName">
                                <el-input placeholder="中文(必須與身份證相同)" v-model="form.firstName" clearable
                                          style="width: 195px;"></el-input>
                            </el-form-item>
                            <el-form-item label="GIVEN NAME 名" prop="lastName">
                                <el-input placeholder="中文(必須與身份證相同)" v-model="form.lastName" clearable
                                          style="width: 195px;"></el-input>
                            </el-form-item>

                            <el-form-item label="是否與通行證一致" prop="needSimplification">
                                <el-radio-group v-model="form.needSimplification" style="width: 195px;">
                                    <el-radio label="false">是</el-radio>
                                    <el-radio label="true">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form-item>

                        <el-form-item label="SEX 性別" prop="sex">
                            <el-select v-model="form.sex" placeholder="請選擇性別" style="width: 195px;">
                                <el-option label="男" :value=1></el-option>
                                <el-option label="女" :value=0></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="DATE OF BIRTH 出生日期" prop="birthDate">
                            <el-date-picker type="date" placeholder="選擇日期" v-model="form.birthDate"
                                            value-format="yyyy-MM-dd" style="width: 195px;"
                                            :default-value="new Date('2000-01-01')"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="EMAIL ADDRESS 電郵" prop="email">
                            <el-input v-model="form.email" clearable style="width: 195px;"></el-input>
                        </el-form-item>
                        <el-form-item label="ID CARD No. 身份證號碼" prop="IDCardNumber">
                            <el-input v-model="form.idCardNumber" clearable style="width: 195px;"></el-input>
                        </el-form-item>
                        <el-form-item label="MTP Number 台胞證號碼" prop="mtpNumber">
                            <el-input v-model="form.mtpNumber" placeholder="請輸入8位台胞證號碼" clearable
                                      style="width: 195px;"></el-input>
                        </el-form-item>
                        <el-form-item label="HIGH SCHOOL 現就讀學校" prop="highSchool">
                            <el-cascader
                                    expand-trigger="hover"
                                    :options="options"
                                    v-model="form.highSchool"
                                    style="width:195px"
                                    filterable clearable
                            >
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="Graduation Year 畢業年份" prop="graduationYear">
                            <el-date-picker type="year" placeholder="選擇年份" v-model="form.graduationYear"
                                            value-format="yyyy" style="width: 195px;"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="ADDRESS 通訊地址" prop="address">
                            <el-input v-model="form.address" clearable style="width: 195px;"></el-input>
                        </el-form-item>
                        <el-form-item label="POSTAL CODE 郵編" prop="postalCode">
                            <el-input v-model="form.postalCode" clearable style="width: 195px;"></el-input>
                        </el-form-item>

                        <el-form :model="form.phoneNumbers" :rules="rules" ref="form.phoneNumbers" label-width="130px"
                                 :inline="true">
                            <el-form-item label="TELEPHONE 電話號碼" label-width="195px" :rules="rules">
                                <!--區號-->
                                <el-form-item label="Home 住宅">
                                    <el-input v-model="form.phoneNumbers.homePhoneNumber" placeholder="" clearable
                                              style="width: 195px;"></el-input>
                                </el-form-item>
                                <el-form-item label="Mobile/Other 手機/其他" prop="mobilePhoneNumber">
                                    <el-input v-model="form.phoneNumbers.mobilePhoneNumber" clearable
                                              style="width: 300px;">
                                        <el-select v-model="form.phoneNumbers.areaCode" slot="prepend"
                                                   placeholder="請選擇區號" style="width:120px">
                                            <el-option label="+86" value="+86"></el-option>
                                            <el-option label="+886" value="+886"></el-option>
                                        </el-select>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="Fax 傳真" prop="faxNumber">
                                    <el-input v-model="form.phoneNumbers.faxNumber" clearable
                                              style="width: 195px;"></el-input>
                                </el-form-item>
                            </el-form-item>
                        </el-form>

                    </div>
                </el-collapse-item>
                <el-collapse-item title="第二部分">
                    <div class="part2">
                        <el-row>
                            <el-col :span="24">
                                <div class="title grid-content bg-purple-dark">二. CHOICE OF CURRICULUM 選報專業（類）志願</div>
                            </el-col>
                        </el-row>

                        <el-form :model="form.curriculumChoices" :rules="rules" ref="form.curriculumChoices"
                                 label-width="130px" :inline="true">

                            <el-form-item>
                                <el-form-item label="1st choice 第一志願" prop="firstChoice" label-width="155px">
                                    <!--接口文檔first拼錯-->
                                    <el-select v-model="form.curriculumChoices.firstChoice" placeholder="請選擇第一志願"
                                               style="width: 300px;" clearable filterable>
                                        <template v-for="major of this.majors">
                                            <el-option :label="major.label" :value="major.value"></el-option>
                                        </template>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="2st choice 第二志願" prop="secondChoice" label-width="155px">
                                    <el-select v-model="form.curriculumChoices.secondChoice" placeholder="請選擇第二志願"
                                               style="width: 300px;">
                                        <template
                                                v-for="major of this.majors.filter((selected)=>{return selected.value!==form.curriculumChoices.firstChoice})">
                                            <el-option :label="major.label" :value="major.value"></el-option>
                                        </template>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="3st choice 第三志願" label-width="155px">
                                    <el-select v-model="form.curriculumChoices.thirdChoice" placeholder="請選擇第三志願"
                                               style="width: 300px;">
                                        <template
                                                v-for="major of this.majors.filter((selected)=>{return selected.value!==form.curriculumChoices.firstChoice&&selected.value!==form.curriculumChoices.thirdChoice})">
                                            <el-option :label="major.label" :value="major.value"></el-option>
                                        </template>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="4st choice 第四志願" label-width="155px">
                                    <el-select v-model="form.curriculumChoices.fourthChoice" placeholder="請選擇第四志願"
                                               style="width: 300px;">
                                        <template
                                                v-for="major of this.majors.filter((selected)=>{return selected.value!==form.curriculumChoices.firstChoice&&selected.value!==form.curriculumChoices.thirdChoice&&selected.value!==form.curriculumChoices.fourthChoice})">
                                            <el-option :label="major.label" :value="major.value"></el-option>
                                        </template>
                                    </el-select>
                                </el-form-item>
                            </el-form-item>
                        </el-form>

                        <el-form-item label="You are 您屬於" prop="artOrSci">
                            <el-radio-group v-model="form.artOrSci">
                                <el-radio :label="0">Arts 文史類</el-radio>
                                <el-radio :label="1">Science 理工農醫類</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <br>If you are not offered for any of the above preferred programmes, will you accept other
                        programmes
                        assigned by NJU?本人是否願意被錄取到其他專業（類）？<br/>
                        <el-form-item label="ASSIGNMENT 調劑 " prop="acceptAssignment">
                            <el-radio-group v-model="form.acceptAssignment">
                                <el-radio label="true">Yes 願意</el-radio>
                                <el-radio label="false">No 不願意</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="第三部分">
                    <div class="part3">
                        <el-row>
                            <el-col :span="24">
                                <div class="title grid-content bg-purple-dark">三. SCHOOL ATTENDED 就讀學校</div>
                            </el-col>
                            Name of schools attended the present school. Please state the province and city that the
                            school is
                            located. 中文填寫就讀學校。
                        </el-row>
                        <el-form :model="form.primarySchool" :rules="rules" ref="from.primarySchool" label-width="130px"
                                 :inline="true">
                            <el-form-item label="Primary School 小學" label-width="150px">
                                <el-form-item prop="name">
                                    <!--接口文檔first拼錯-->
                                    <el-input v-model="form.primarySchool.name" placeholder="SCHOOL 學校名稱"
                                              style="width: 300px;"></el-input>
                                </el-form-item>
                                <el-form-item prop="region">
                                    <el-select v-model="form.primarySchool.region" placeholder="REGION 地區"
                                               style="width: 200px">
                                        <!--導入台灣地區區名-->
                                        <el-option label="新北市" value="新北市"></el-option>
                                        <el-option label="臺北市" value="臺北市"></el-option>
                                        <el-option label="桃園市" value="桃園市"></el-option>
                                        <el-option label="臺中市" value="臺中市"></el-option>
                                        <el-option label="臺南市" value="臺南市"></el-option>
                                        <el-option label="高雄市" value="高雄市"></el-option>
                                        <el-option label="宜蘭縣" value="宜蘭縣"></el-option>
                                        <el-option label="新竹縣" value="新竹縣"></el-option>
                                        <el-option label="苗栗縣" value="苗栗縣"></el-option>
                                        <el-option label="彰化縣" value="彰化縣"></el-option>
                                        <el-option label="南投縣" value="南投縣"></el-option>
                                        <el-option label="雲林縣" value="雲林縣"></el-option>
                                        <el-option label="屏東縣" value="屏東縣"></el-option>
                                        <el-option label="臺東縣" value="臺東縣"></el-option>
                                        <el-option label="花蓮縣" value="花蓮縣"></el-option>
                                        <el-option label="澎湖縣" value="澎湖縣"></el-option>
                                        <el-option label="嘉義縣" value="嘉義縣"></el-option>
                                        <el-option label="連江縣" value="連江縣"></el-option>
                                        <el-option label="金門縣" value="金門縣"></el-option>
                                        <el-option label="基隆市" value="基隆市"></el-option>
                                        <el-option label="其他" value="其他"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item prop="startDate">
                                    <el-date-picker type="date" placeholder="START 開始時間" value-format="yyyy-MM-dd"
                                                    v-model="form.primarySchool.startDate"
                                                    style="width: 200px"></el-date-picker>

                                </el-form-item>
                                <el-form-item prop="endDate">
                                    <el-date-picker type="date" placeholder="END 終止時間" value-format="yyyy-MM-dd"
                                                    v-model="form.primarySchool.endDate"
                                                    style="width: 200px"></el-date-picker>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                        <el-form :model="form.juniorMiddleSchool" :rules="rules" ref="form.juniorMiddleSchool"
                                 label-width="130px"
                                 :inline="true">

                            <el-form-item label="Junior middle school 初中" label-width="180px">
                                <el-form-item prop="name">
                                    <!--接口文檔first拼錯-->
                                    <el-input v-model="form.juniorMiddleSchool.name" placeholder="SCHOOL 學校名稱"
                                              style="width: 300px;"></el-input>
                                </el-form-item>
                                <el-form-item prop="region">
                                    <el-select v-model="form.juniorMiddleSchool.region" placeholder="REGION 地區"
                                               style="width: 200px">
                                        <!--導入台灣地區區名-->
                                        <el-option label="新北市" value="新北市"></el-option>
                                        <el-option label="臺北市" value="臺北市"></el-option>
                                        <el-option label="桃園市" value="桃園市"></el-option>
                                        <el-option label="臺中市" value="臺中市"></el-option>
                                        <el-option label="臺南市" value="臺南市"></el-option>
                                        <el-option label="高雄市" value="高雄市"></el-option>
                                        <el-option label="宜蘭縣" value="宜蘭縣"></el-option>
                                        <el-option label="新竹縣" value="新竹縣"></el-option>
                                        <el-option label="苗栗縣" value="苗栗縣"></el-option>
                                        <el-option label="彰化縣" value="彰化縣"></el-option>
                                        <el-option label="南投縣" value="南投縣"></el-option>
                                        <el-option label="雲林縣" value="雲林縣"></el-option>
                                        <el-option label="屏東縣" value="屏東縣"></el-option>
                                        <el-option label="臺東縣" value="臺東縣"></el-option>
                                        <el-option label="花蓮縣" value="花蓮縣"></el-option>
                                        <el-option label="澎湖縣" value="澎湖縣"></el-option>
                                        <el-option label="嘉義縣" value="嘉義縣"></el-option>
                                        <el-option label="連江縣" value="連江縣"></el-option>
                                        <el-option label="金門縣" value="金門縣"></el-option>
                                        <el-option label="基隆市" value="基隆市"></el-option>
                                        <el-option label="其他" value="其他"></el-option>


                                    </el-select>
                                </el-form-item>
                                <el-form-item prop="startDate">
                                    <el-date-picker type="date" placeholder="START 開始時間" value-format="yyyy-MM-dd"
                                                    v-model="form.juniorMiddleSchool.startDate"
                                                    style="width: 200px"></el-date-picker>

                                </el-form-item>
                                <el-form-item prop="endDate">
                                    <el-date-picker type="date" placeholder="END 終止時間" value-format="yyyy-MM-dd"
                                                    v-model="form.juniorMiddleSchool.endDate"
                                                    style="width: 200px"></el-date-picker>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                        <el-form :model="form.seniorMiddleSchool" :rules="rules" ref="form.seniorMiddleSchool"
                                 label-width="130px"
                                 :inline="true">
                            <el-form-item label="Senior middle school 高中" label-width="182px">
                                <el-form-item prop="name">
                                    <!--接口文檔first拼錯-->
                                    <el-input v-model="form.seniorMiddleSchool.name" placeholder="SCHOOL 學校名稱"
                                              style="width: 300px;"></el-input>
                                </el-form-item>
                                <el-form-item prop="region">
                                    <el-select v-model="form.seniorMiddleSchool.region" placeholder="REGION 地區"
                                               style="width: 200px">
                                        <!--導入台灣地區區名-->
                                        <el-option label="新北市" value="新北市"></el-option>
                                        <el-option label="臺北市" value="臺北市"></el-option>
                                        <el-option label="桃園市" value="桃園市"></el-option>
                                        <el-option label="臺中市" value="臺中市"></el-option>
                                        <el-option label="臺南市" value="臺南市"></el-option>
                                        <el-option label="高雄市" value="高雄市"></el-option>
                                        <el-option label="宜蘭縣" value="宜蘭縣"></el-option>
                                        <el-option label="新竹縣" value="新竹縣"></el-option>
                                        <el-option label="苗栗縣" value="苗栗縣"></el-option>
                                        <el-option label="彰化縣" value="彰化縣"></el-option>
                                        <el-option label="南投縣" value="南投縣"></el-option>
                                        <el-option label="雲林縣" value="雲林縣"></el-option>
                                        <el-option label="屏東縣" value="屏東縣"></el-option>
                                        <el-option label="臺東縣" value="臺東縣"></el-option>
                                        <el-option label="花蓮縣" value="花蓮縣"></el-option>
                                        <el-option label="澎湖縣" value="澎湖縣"></el-option>
                                        <el-option label="嘉義縣" value="嘉義縣"></el-option>
                                        <el-option label="連江縣" value="連江縣"></el-option>
                                        <el-option label="金門縣" value="金門縣"></el-option>
                                        <el-option label="基隆市" value="基隆市"></el-option>
                                        <el-option label="其他" value="其他"></el-option>


                                    </el-select>
                                </el-form-item>
                                <el-form-item prop="startDate">
                                    <el-date-picker type="date" placeholder="START 開始時間" value-format="yyyy-MM-dd"
                                                    v-model="form.seniorMiddleSchool.startDate"
                                                    style="width: 200px"></el-date-picker>

                                </el-form-item>
                                <el-form-item prop="endDate">
                                    <el-date-picker type="date" placeholder="END 終止時間" value-format="yyyy-MM-dd"
                                                    v-model="form.seniorMiddleSchool.endDate"
                                                    style="width: 200px"></el-date-picker>
                                </el-form-item>

                            </el-form-item>
                        </el-form>


                    </div>
                </el-collapse-item>
                <el-collapse-item title="第四部分">
                    <div class="part4">
                        <el-row>
                            <el-col :span="24">
                                <div class="title grid-content bg-purple-dark">四. PARTICULARS OF FAMILY MEMBERS
                                    申請者家屬情況
                                </div>
                            </el-col>
                        </el-row>
                        請至少填寫一個家屬信息！
                        <el-form :model="familyParticulars" ref="familyParticulars" label-width="0">
                            <el-form-item
                                    v-for="(member,index) in familyParticulars.members"
                                    :key="index"
                            >
                                <el-input v-model="member.relationship" placeholder="Relationship 關係"
                                          style="width: 180px"></el-input>
                                <el-input v-model="member.name" placeholder="NAME 姓名" style="width: 180px"></el-input>
                                <el-input v-model="member.companyName" placeholder="Company 單位名稱"
                                          style="width: 180px"></el-input>
                                <el-input v-model="member.occupation" placeholder="Occupation 職務"
                                          style="width: 180px"></el-input>
                                <el-input v-model="member.mobilePhoneNumber" placeholder="Mobile 手機"
                                          style="width: 180px"></el-input>
                                <el-button @click.prevent="removeMember(member)">刪除</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="addMember">新增家屬</el-button>
                            </el-form-item>
                        </el-form>


                    </div>
                </el-collapse-item>
                <el-collapse-item title="第五部分">
                    <div class="part5">
                        <el-row>
                            <el-col :span="24">
                                <div class="title grid-content bg-purple-dark">五. RESULT OF GENERAL SCHOLASTIC ABILITY
                                    TEST (ATTACH
                                    A COPY OF RESULT<br/>
                                    台灣地區大學入學考試學科能力測驗成績（請附考生成績通知單影印本）
                                </div>
                            </el-col>
                        </el-row>
                        <el-form :model="form.results" :rules="rules" label-width="130px" :inline="true">
                            <el-form-item label="Results 成績" label-width="110px">
                                <el-form-item prop="chinese">
                                    <el-input v-model="form.results.chinese" placeholder="CHINESE 國文"
                                              style="width:180px"></el-input>
                                </el-form-item>
                                <el-form-item prop="math">
                                    <el-input v-model="form.results.math" placeholder="MATH 數學"
                                              style="width:180px"></el-input>
                                </el-form-item>
                                <el-form-item prop="english">
                                    <el-input v-model="form.results.english" placeholder="ENGLISH 英文"
                                              style="width:180px"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="form.results.socials" placeholder="SOCIAL 社會"
                                              style="width:180px"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="form.results.sciences" placeholder="SCIENCES 自然"
                                              style="width:180px"></el-input>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                        <el-form :model="form.actualLevelPoints" :rules="rules" label-width="130px" :inline="true">

                            <el-form-item label="Actual level points 實得級分" label-width="202px">
                                <el-form-item prop="chinese">
                                    <el-input v-model="form.actualLevelPoints.chinese" placeholder="CHINESE 國文"
                                              style="width:180px"></el-input>
                                </el-form-item>
                                <el-form-item prop="math">
                                    <el-input v-model="form.actualLevelPoints.math" placeholder="MATH 數學"
                                              style="width:180px"></el-input>
                                </el-form-item>
                                <el-form-item prop="english">
                                    <el-input v-model="form.actualLevelPoints.english" placeholder="ENGLISH 英文"
                                              style="width:180px"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="form.actualLevelPoints.socials" placeholder="SOCIAL 社會"
                                              style="width:180px"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="form.actualLevelPoints.sciences" placeholder="SCIENCES 自然"
                                              style="width:180px"></el-input>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                        <el-form :model="form.levelRange" :rules="rules" :inline="true">
                            <el-form-item label="Level range 級距" label-width="132px">
                                <el-form-item prop="chinese">
                                    <el-input v-model="form.levelRange.chinese" placeholder="CHINESE 國文"
                                              style="width:180px" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item prop="math">
                                    <el-input v-model="form.levelRange.math" placeholder="MATH 數學"
                                              style="width:180px" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item prop="english">
                                    <el-input v-model="form.levelRange.english" placeholder="ENGLISH 英文"
                                              style="width:180px" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="form.levelRange.socials" placeholder="SOCIAL 社會"
                                              style="width:180px" :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="form.levelRange.sciences" placeholder="SCIENCES 自然"
                                              style="width:180px" :disabled="true"></el-input>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                        <el-form :model="form.singleSubjectCriteria" :rules="rules" :inline="true">
                            <el-form-item label="Single subject criteria 單科標準" label-width="222px">
                                <el-form-item prop="chinese">
                                    <el-input v-model="getCriteria1" placeholder="CHINESE 國文" style="width:180px"
                                              :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item prop="math">
                                    <el-input v-model="getCriteria2" placeholder="MATH 數學" style="width:180px"
                                              :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item prop="english">
                                    <el-input v-model="getCriteria3" placeholder="ENGLISH 英文" style="width:180px"
                                              :disabled="true"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="getCriteria4" placeholder="SOCIAL 社會" style="width:180px"
                                              :disabled="true"></el-input>
                                    <!--
                                    <el-select v-model="form.singleSubjectCriteria.socials" placeholder="SOCIAL 社會"
                                               style="width:180px">
                                        <template v-for="item of getSubjectCriteria()">
                                            <el-option :label="item.label" :value="item.value"></el-option>
                                        </template>
                                    </el-select>
                                    -->
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="getCriteria5" placeholder="SCIENCES 自然" style="width:180px"
                                              :disabled="true"></el-input>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="第六部分">
                    <div class="part6">
                        <el-row>
                            <el-col :span="24">
                                <div class="title grid-content bg-purple-dark">六. EXTRA-CURRICULAR ACTIVITIES, AND
                                    AWARDS
                                    高中階段課外活動及所獲獎項
                                </div>
                            </el-col>
                            Please provide the information of the extra-curricular activities and voluntary services you
                            have
                            participated in, and awards you have won in the past three years, in both Chinese and
                            English.
                            請填寫你參加過的社會活動，主要包括以下幾個方面：①學術活動：主要包括參加的各類學科競賽、科研活動、徵文比賽、創新大賽等；②文體活動：主要包括參加的各種文藝、體育活動；③社會活動：如志願者活動、學生社團活動、公益活動等。請附獲獎證書影印本、公開發表作品影印本和其他有關證明材料。
                        </el-row>

                        <el-form :model="activities" ref="activities" label-width="0">
                            <el-form-item
                                    v-for="(activity,index) in activities.activity"
                                    :key="index"
                            >
                                <el-input v-model="activity.organization" placeholder="Name of organization頒發/主辦單位"
                                          style="width: 260px;"></el-input>
                                <el-input v-model="activity.award" placeholder="Name of award/activity獎項/活動名"
                                          style="width: 360px;"></el-input>
                                <el-input v-model="activity.attendingDate"
                                          placeholder="Date of issue/participation獲獎/參與日期"
                                          style="width:290px;"></el-input>
                                <el-button @click.prevent="removeActivity(activity)">刪除</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="addActivity">新增活動</el-button>
                            </el-form-item>
                        </el-form>

                    </div>
                </el-collapse-item>
                <el-collapse-item title="第七部分">
                    <div class="part7">
                        <el-row>
                            <el-col :span="24">
                                <div class="title grid-content bg-purple-dark">七. PERSONAL STATEMENT 個人陳述</div>
                            </el-col>
                            NOTES: Write briefly your reasons for applying to study at Nanjing University, outlining the
                            curricula which
                            you are interested in, your career aspirations and any other information you consider
                            relevant, within 500
                            Chinese characters.
                            說明：我們希望借此機會能對你有更多的瞭解，內容可以包括你對大學學習生活等方面的計劃和設想、未來的職業理想、你的思考和追求、選擇南京大學深造的原因等等。字數控制在500字之內。
                        </el-row>
                        <el-form-item prop="personalStatement">
                            <el-col :span="23">
                                <el-input type="textarea" placeholder="請輸入內容" v-model="form.personalStatement"
                                          class="personalStatement" style="width: 1050px"
                                          :clearable="true">
                                </el-input>
                            </el-col>
                        </el-form-item>
                        <el-row>

                        </el-row>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <!--提交暫存-->
            <el-col :span="24">
                <div class="prompt">
                    <i class="el-icon-info"></i>
                    <span>如果清除頁面緩存，暫存將被刪除，敬請注意</span>
                </div>
                <el-button type="primary" icon="el-icon-upload2" class="confirmUpload" @click="submitApplication">提交
                </el-button>
                <el-button type="primary" icon="el-icon-document" class="saveEmail" @click="tempSaveApplication">暫存
                </el-button>
            </el-col>
        </el-form>
    </el-card>
</template>

<script>
    import {getBasicInfo, sendApplication, getMajors, getApplicationStatus} from "utils/api";
    import highSchools from 'utils/highSchools.ts';

    export default {
        data() {
            return {
                hasFinished: false,
                options: highSchools,
                form: {
                    firstName: '',
                    lastName: '',
                    needSimplification: '',
                    sex: 1,
                    birthDate: '',
                    email: '',
                    mtpNumber: '',
                    idCardNumber: '',
                    highSchool: [],
                    graduationYear: '',
                    address: '',
                    postalCode: '',
                    phoneNumbers: {
                        homePhoneNumber: '',
                        areaCode: '',
                        mobilePhoneNumber: '',
                        faxNumber: ''
                    },
                    curriculumChoices: {
                        firstChoice: '',
                        secondChoice: '',
                        thirdChoice: '',
                        fourthChoice: '',
                    },
                    artOrSci: 0,
                    acceptAssignment: '',
                    primarySchool: {
                        name: '',
                        region: '',
                        startDate: '',
                        endDate: ''
                    },
                    juniorMiddleSchool: {
                        name: '',
                        region: '',
                        startDate: '',
                        endDate: ''
                    },
                    seniorMiddleSchool: {
                        name: '',
                        region: '',
                        startDate: '',
                        endDate: ''
                    },

                    results: {
                        chinese: '',
                        math: '',
                        english: '',
                        socials: '',
                        sciences: ''
                    },

                    actualLevelPoints: {
                        chinese: '',
                        math: '',
                        english: '',
                        socials: '',
                        sciences: ''
                    },
                    levelRange: {
                        chinese: 5.63,
                        math: 6.67,
                        english: 6.38,
                        socials: 8.16,
                        sciences: 8.27
                    },
                    singleSubjectCriteria: {
                        chinese: '',
                        math: '',
                        english: '',
                        socials: '',
                        sciences: ''
                    },
                    personalStatement: ''
                },
                familyParticulars: {
                    members: [
                        {
                            relationship: '',
                            name: '',
                            companyName: '',
                            occupation: '',
                            mobilePhoneNumber: ''
                        }
                    ]
                },
                activities: {
                    activity: [
                        {
                            organization: '',
                            award: '',
                            attendingDate: ''
                        }
                    ]
                },

                rules: {
                    needSimplification: [
                        {required: true, message: '請選擇', trigger: 'blur'},
                    ],
                    sex: [
                        {required: true, message: '請選擇性別', trigger: 'change'}
                    ],
                    birthDate: [
                        {required: true, message: '請選擇出生日期', trigger: 'blur'}
                    ],
                    highSchool: [
                        {required: true, message: '請選擇現就讀學校', trigger: 'change'}
                    ],
                    mtpNumber: [
                        {required: true, message: '請輸入8位台胞證號碼', trigger: 'blur'},
                        {min: 8, max: 8, message: '請輸入8位台胞證號碼', trigger: 'change'}
                    ],
                    graduationYear: [
                        {required: true, message: '請選擇畢業年份', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '請選擇通訊地址', trigger: 'blur'}
                    ],
                    postalCode: [
                        {required: true, message: '請輸入郵編', trigger: 'blur'}
                    ],
                    mobilePhoneNumber: [
                        {required: true, message: '請輸入手機號碼', trigger: 'blur'}
                    ],
                    firstChoice: [
                        {required: true, message: '請選擇第一志願', trigger: 'change'}
                    ],
                    secondChoice: [
                        {required: true, message: '請選擇第二志願', trigger: 'change'}
                    ],
                    artOrSci: [
                        {required: true, message: '請選擇', trigger: 'blur'}
                    ],
                    acceptAssignment: [
                        {required: true, message: '請選擇', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '請輸入學校名稱', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '請選擇地區', trigger: 'change'}
                    ],
                    startDate: [
                        {required: true, message: '請選擇開始時間', trigger: 'blur'}
                    ],
                    endDate: [
                        {required: true, message: '請選擇終止時間', trigger: 'blur'}
                    ],
                    chinese: [
                        {required: true, message: "請填寫國文成績", trigger: 'blur'},
                    ],
                    math: [
                        {required: true, message: "請填寫數學成績", trigger: 'blur'},
                    ],
                    english: [
                        {required: true, message: "請填寫英文成績", trigger: 'blur'},
                    ],
                    personalStatement: [
                        {required: true, message: "請填寫", trigger: 'blur'},
                        {max: 500, message: "字數不得超過500字", trigger: 'blur'}
                    ],
                },
                majors: []
            };
        },
        mounted() {
            this.$nextTick(() => {
                this.checkApplicationStatus();
            })
        },
        computed: {
            getCriteria1() {
                return this.getChineseCriteria(this.form.actualLevelPoints.chinese);
            },
            getCriteria2() {
                return this.getMathCriteria(this.form.actualLevelPoints.math);
            },
            getCriteria3() {
                return this.getEnglishCriteria(this.form.actualLevelPoints.english);
            },
            getCriteria4() {
                return this.getSocialCriteria(this.form.actualLevelPoints.socials);
            },
            getCriteria5() {
                return this.getScienceCriteria(this.form.actualLevelPoints.sciences)
            }
        },
        methods: {
            removeMember(item) {
                let index = this.familyParticulars.members.indexOf(item);
                if (index !== -1) {
                    this.familyParticulars.members.splice(index, 1)
                }
            },
            addMember() {
                this.familyParticulars.members.push({
                    relationship: '',
                    name: '',
                    companyName: '',
                    occupation: '',
                    mobilePhoneNumber: '',
                });
            },
            removeActivity(item) {
                let index = this.activities.activity.indexOf(item);
                if (index !== -1) {
                    this.activities.activity.splice(index, 1)
                }
            },
            addActivity() {
                this.activities.activity.push({
                    organization: '',
                    award: '',
                    attendingDate: '',
                });
            },
            submitApplication() {
                let information = Object.assign({}, this.form);
                information.phoneNumbers.mobilePhoneNumber = this.form.phoneNumbers.areaCode + this.form.phoneNumbers.mobilePhoneNumber;
                information.highSchool = this.form.highSchool.toString();
                information.familyParticulars = this.familyParticulars.members;
                information.activities = this.activities.activity;

                information.needSimplification = this.form.needSimplification !== 'false';
                information.acceptAssignment = this.form.acceptAssignment !== 'false';

                information.results.chinese = Number(this.form.results.chinese);
                information.results.math = Number(this.form.results.math);
                information.results.english = Number(this.form.results.english);
                information.results.sciences = Number(this.form.results.sciences);
                information.results.socials = Number(this.form.results.socials);

                information.actualLevelPoints.chinese = Number(this.form.actualLevelPoints.chinese);
                information.actualLevelPoints.math = Number(this.form.actualLevelPoints.math);
                information.actualLevelPoints.english = Number(this.form.actualLevelPoints.english);
                information.actualLevelPoints.socials = Number(this.form.actualLevelPoints.socials);
                information.actualLevelPoints.sciences = Number(this.form.actualLevelPoints.sciences);

                information.singleSubjectCriteria.chinese = this.getSubjectCriteria(this.getChineseCriteria(this.form.actualLevelPoints.chinese));
                information.singleSubjectCriteria.math = this.getSubjectCriteria(this.getChineseCriteria(this.form.actualLevelPoints.math));
                information.singleSubjectCriteria.english = this.getSubjectCriteria(this.getChineseCriteria(this.form.actualLevelPoints.english));
                information.singleSubjectCriteria.socials = this.getSubjectCriteria(this.getChineseCriteria(this.form.actualLevelPoints.socials));
                information.singleSubjectCriteria.sciences = this.getSubjectCriteria(this.getChineseCriteria(this.form.actualLevelPoints.sciences));

                if (information.birthDate.indexOf('T') >= 0) {
                    information.birthDate = information.birthDate.substring(0, information.birthDate.indexOf('T'))
                }
                console.log(information);
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        sendApplication(information)
                            .then((res) => {
                                if (res.data.succeed) {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    })
                                } else {
                                    if (res.data.msg === '更新失敗') {
                                        this.$message({
                                            message: '提交失敗',
                                            type: 'error'
                                        })
                                    } else {
                                        this.$message({
                                            message: res.data.msg,
                                            type: 'error'
                                        })
                                    }
                                }
                            })
                            .catch((err) => {
                                this.$message({
                                    message: err,
                                    type: 'error'
                                })
                            })
                    } else {
                        this.$message({
                            message: '提交失敗，請檢查表單內容',
                            type: 'error'
                        });
                        return false;
                    }
                });

            },//有問題
            getChineseCriteria(point) {
                let temp = Number(point);
                if (temp <= 15 && temp >= 13) {
                    return "頂標"
                } else if (temp <= 12 && temp >= 11) {
                    return "均標"
                } else if (temp <= 10 && temp >= 9) {
                    return "後標"
                } else {
                    return "底標"
                }

            },
            getMathCriteria(point) {
                let temp = Number(point);
                if (temp <= 15 && temp >= 14) {
                    return "頂標"
                } else if (temp <= 13 && temp >= 12) {
                    return "前標"
                } else if (temp <= 11 && temp >= 9) {
                    return "均標"
                } else if (temp <= 8 && temp >= 5) {
                    return "後標"
                } else {
                    return "底標"
                }
            },
            getEnglishCriteria(point) {
                let temp = Number(point);
                if (temp <= 15 && temp >= 14) {
                    return "頂標"
                } else if (temp === 13) {
                    return "前標"
                } else if (temp <= 12 && temp >= 10) {
                    return "均標"
                } else if (temp <= 9 && temp >= 5) {
                    return "後標"
                } else {
                    return "底標"
                }
            },
            getSocialCriteria(point) {
                let temp = Number(point);
                if (temp <= 15 && temp >= 13) {
                    return "頂標"
                } else if (temp === 12) {
                    return "前標"
                } else if (temp <= 11 && temp >= 10) {
                    return "均標"
                } else if (temp === 9) {
                    return "後標"
                } else {
                    return "底標"
                }
            },
            getScienceCriteria(point) {
                let temp = Number(point);
                if (temp <= 15 && temp >= 13) {
                    return "頂標"
                } else if (temp <= 12 && temp >= 11) {
                    return "前標"
                } else if (temp <= 10 && temp >= 8) {
                    return "均標"
                } else if (temp <= 7 && temp >= 6) {
                    return "後標"
                } else {
                    return "底標"
                }
            },
            getApplicationInfo() {
                let _this = this;
                getBasicInfo()
                    .then((res) => {
                        let info = res.data;
                        this.form.firstName = info.firstName;
                        this.form.lastName = info.lastName;
                        if (info.needSimplification != null) {
                            this.form.needSimplification = info.needSimplification.toString();
                        }
                        this.form.sex = info.sex;
                        if (info.birthDate !== null) {
                            this.form.birthDate = info.birthDate;
                        }
                        this.form.email = info.email;
                        this.form.mtpNumber = info.mtpNumber;
                        this.form.idCardNumber = info.idCardNumber;
                        if (info.highSchool !== '') {
                            this.form.highSchool = info.highSchool.split(',');
                        }
                        this.form.graduationYear = info.graduationYear;
                        this.form.address = info.address;
                        this.form.postalCode = info.postalCode;

                        //this.form.phoneNumbers.homePhoneNumber = info.phoneNumbers.homePhoneNumber;
                        //this.form.phoneNumbers.areaCode = info.phoneNumbers.mobilePhoneNumber.substring(0, info.phoneNumbers.mobilePhoneNumber.indexOf("6") + 1);
                        //this.form.phoneNumbers.mobilePhoneNumber = info.phoneNumbers.mobilePhoneNumber.substring(info.phoneNumbers.mobilePhoneNumber.indexOf("6") + 1);
                        //this.form.phoneNumbers.faxNumber = info.phoneNumbers.faxNumber;

                        if (info.curriculumChoices.firstChoice != null) {
                            this.form.curriculumChoices.firstChoice = info.curriculumChoices.firstChoice;
                        }
                        if (info.curriculumChoices.secondChoice != null) {
                            this.form.curriculumChoices.secondChoice = info.curriculumChoices.secondChoice;
                        }
                        if (info.curriculumChoices.thirdChoice != null) {
                            this.form.curriculumChoices.thirdChoice = info.curriculumChoices.thirdChoice;
                        }
                        if (info.curriculumChoices.fourthChoice != null) {
                            this.form.curriculumChoices.fourthChoice = info.curriculumChoices.fourthChoice;

                        }

                        this.form.artOrSci = info.artOrSci;
                        if (info.acceptAssignment != null) {
                            this.form.acceptAssignment = info.acceptAssignment.toString();
                        }

                        this.form.primarySchool.name = info.primarySchool.name;
                        this.form.primarySchool.region = info.primarySchool.region;
                        this.form.primarySchool.startDate = info.primarySchool.startDate;
                        this.form.primarySchool.endDate = info.primarySchool.endDate;

                        this.form.juniorMiddleSchool.name = info.juniorMiddleSchool.name;
                        this.form.juniorMiddleSchool.region = info.juniorMiddleSchool.region;
                        this.form.juniorMiddleSchool.startDate = info.juniorMiddleSchool.startDate;
                        this.form.juniorMiddleSchool.endDate = info.juniorMiddleSchool.endDate;

                        this.form.seniorMiddleSchool.name = info.seniorMiddleSchool.name;
                        this.form.seniorMiddleSchool.region = info.seniorMiddleSchool.region;
                        this.form.seniorMiddleSchool.startDate = info.seniorMiddleSchool.startDate;
                        this.form.seniorMiddleSchool.endDate = info.seniorMiddleSchool.endDate;

                        this.familyParticulars.members = info.familyParticulars;

                        this.form.results.chinese = info.results.chinese;
                        this.form.results.math = info.results.math;
                        this.form.results.english = info.results.english;
                        this.form.results.socials = info.results.socials;
                        this.form.results.sciences = info.results.sciences;

                        this.form.actualLevelPoints.chinese = info.actualLevelPoints.chinese;
                        this.form.actualLevelPoints.math = info.actualLevelPoints.math;
                        this.form.actualLevelPoints.english = info.actualLevelPoints.english;
                        this.form.actualLevelPoints.socials = info.actualLevelPoints.socials;
                        this.form.actualLevelPoints.sciences = info.actualLevelPoints.sciences;

                        this.activities.activity = info.activities;

                        this.form.personalStatement = info.personalStatement;


                    })
                    .catch((err) => {
                        this.$message({
                            message: err,
                            type: 'error'
                        });
                    })
            },
            tempSaveApplication() {
                // 暫存

                this.$message({
                    message: '暫存完成',
                    type: 'success'
                })
            },
            getTempSavedApplication() {
                // 讀取暫存

            },
            getSubjectCriteria(level) {
                if (level === '頂標') {
                    return 'TOP_CRITERIA'
                } else if (level === '前標') {
                    return 'HEAD_CRITERIA'
                } else if (level === '均標') {
                    return 'AVERAGE_CRITERIA'
                } else if (level === '後標') {
                    return 'BACK_CRITERIA'
                } else {
                    return 'BOTTOM_CRITERIA'
                }
            },
            getMajors() {
                let majors = [];
                getMajors()
                    .then((res) => {
                        res.data.forEach((major) => {
                            majors.push({
                                label: major.name,
                                value: major.name
                            });
                        })
                    })
                    .catch((err) => {
                        this.$message({
                            message: err,
                            type: 'error'
                        })
                    });
                this.majors = majors;
            },
            checkApplicationStatus() {
                let _this = this;
                getApplicationStatus()
                    .then((res) => {
                        this.hasFinished = !!res.data.hasUploaded;
                        return _this;
                    })
                    .then((that) => {
                        that.getApplicationInfo();
                        that.getMajors();
                        return _this;
                    })
                    .then((that) => {
                        that.getTempSavedApplication();
                    })
                    .catch((err) => {
                        this.$message({
                            message: err,
                            type: 'error'
                        });
                    })
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        margin: 25px 20px;

        .el-row {
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        .el-col {
            border-radius: 4px;
        }

        .bg-purple-dark {
            background: #BEADC6;
        }

        .bg-purple {
            background: #d3dce6;
        }

        .bg-purple-light {
            background: #e5e9f2;
        }

        .grid-content {
            border-radius: 4px;
            min-height: 36px;
        }

        .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
        }

        .title {
            padding-top: 10px;
            font-weight: bold;
        }

        .title1 {
            margin: 20px;
        }

        .title2 {
            margin: 20px;
        }

        .toolbar {
            margin: 0;
            padding: 8px 5px;
            border-radius: 4px;
            background: white;

            .el-upload-tip {
                margin-left: 10px;
                color: #a6a9ad;
            }
        }

        .saveEmail {
            float: right;
            margin-top: -25px;
            margin-bottom: 10px;
        }

        .confirmUpload {
            float: right;
            margin-top: -25px;
            margin-left: 10px;
            margin-bottom: 10px;
        }

        .prompt {
            margin-top: 15px;
            margin-left: 20px;
            color: #a6a9ad;
        }
    }
</style>

<style>
    .el-textarea__inner {
        resize: none !important;
        width: 100%;
        height: 390px;
    }
</style>
