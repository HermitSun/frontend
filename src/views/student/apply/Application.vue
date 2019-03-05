<template>
    <el-card class="wrapper">
        <div v-if="hasFinished">
            <p style="color: #67C23A">您已完成申請表填寫。</p>
        </div>
        <el-form :model="this.form" :rules="this.rules" ref="form" label-width="138px" :inline="true"
                 hide-required-asterisk>
            <el-collapse accordion>
                <el-collapse-item title="一. 個人基本情況">
                    <div class="part1">
                        <el-row>
                            <el-col :span="24">
                                <div class="title grid-content bg-purple-dark">PERSONAL PARTICULARS 個人基本情況</div>
                            </el-col>
                        </el-row>

                        <el-form-item label="SIMPLIFICATION 簡體姓名" label-width="195px">
                            <el-form-item prop="firstName">
                                <div slot="label">
                                    <div>FAMILY NAME</div>
                                    <div>姓</div>
                                </div>
                                <el-input placeholder="中文(必須與身份證相同)" v-model="form.firstName" clearable
                                          style="width: 195px;" :disabled="isDisabled"></el-input>
                            </el-form-item>
                            <el-form-item prop="lastName">
                                <div slot="label">
                                    <div>GIVEN NAME</div>
                                    <div>名</div>
                                </div>
                                <el-input placeholder="中文(必須與身份證相同)" v-model="form.lastName" clearable
                                          style="width: 195px;" :disabled="isDisabled"></el-input>
                            </el-form-item>

                            <el-form-item label="是否與台胞證一致" prop="needSimplification">
                                <el-radio-group v-model="form.needSimplification" style="width: 195px;">
                                    <el-radio label="false">是</el-radio>
                                    <el-radio label="true">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form-item>

                        <el-form-item prop="sex">
                            <div slot="label">
                                <div>SEX</div>
                                <div>性別</div>
                            </div>
                            <el-select v-model="form.sex" placeholder="請選擇性別" style="width: 195px;">
                                <el-option label="男" :value=1></el-option>
                                <el-option label="女" :value=0></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item prop="birthDate">
                            <div slot="label">
                                <div>DATE OF BIRTH</div>
                                <div>出生日期</div>
                            </div>
                            <el-date-picker type="date" placeholder="選擇日期" v-model="form.birthDate"
                                            value-format="yyyy-MM-dd" style="width: 195px;"
                                            :default-value="new Date('2000-01-01')"></el-date-picker>
                        </el-form-item>

                        <el-form-item prop="email">
                            <div slot="label">
                                <div>EMAIL ADDRESS</div>
                                <div>電郵</div>
                            </div>
                            <el-input v-model="form.email" placeholder="請輸入郵箱" clearable
                                      style="width: 195px;"></el-input>
                        </el-form-item>

                        <el-form-item prop="idCardNumber">
                            <div slot="label">
                                <div>ID CARD No.</div>
                                <div>身份證號碼</div>
                            </div>
                            <el-input v-model="form.idCardNumber" placeholder="請輸入身份證號碼" clearable
                                      style="width: 195px;"></el-input>
                        </el-form-item>

                        <el-form-item prop="mtpNumber">
                            <div slot="label">
                                <div>MTP Number</div>
                                <div>台胞證號碼</div>
                            </div>
                            <el-input v-model="form.mtpNumber" placeholder="請輸入8位台胞證號碼" clearable
                                      style="width: 195px;"></el-input>
                        </el-form-item>

                        <el-form-item prop="highSchool">
                            <div slot="label">
                                <div>HIGH SCHOOL</div>
                                <div>現就讀學校</div>
                            </div>
                            <el-cascader expand-trigger="hover" :options="options" v-model="form.highSchool"
                                         style="width:195px" filterable clearable placeholder="請選擇學校">
                            </el-cascader>
                        </el-form-item>

                        <el-form-item prop="graduationYear">
                            <div slot="label">
                                <div>Graduation Year</div>
                                <div>畢業年份</div>
                            </div>
                            <el-date-picker type="year" placeholder="選擇年份" v-model="form.graduationYear"
                                            value-format="yyyy" style="width: 195px;"></el-date-picker>
                        </el-form-item>

                        <el-form-item prop="address">
                            <div slot="label">
                                <div>ADDRESS</div>
                                <div>郵寄地址</div>
                            </div>
                            <el-input v-model="form.address" clearable style="width: 195px;"
                                      placeholder="請輸入地址"></el-input>
                        </el-form-item>

                        <el-form-item prop="postalCode">
                            <div slot="label">
                                <div>POSTAL CODE</div>
                                <div>郵編</div>
                            </div>
                            <el-input v-model="form.postalCode" clearable style="width: 195px;"
                                      placeholder="請輸入郵編"></el-input>
                        </el-form-item>

                        <el-form :model="form.phoneNumbers" :rules="rules" ref="form.phoneNumbers" label-width="138px"
                                 :inline="true" hide-required-asterisk>
                            <el-form-item label-width="195px" :rules="rules">
                                <!--區號-->
                                <el-form-item>
                                    <div slot="label">
                                        <div>Home</div>
                                        <div>住宅</div>
                                    </div>
                                    <el-input v-model="form.phoneNumbers.homePhoneNumber" clearable
                                              style="width: 195px;" placeholder="請輸入宅電"></el-input>
                                </el-form-item>

                                <el-form-item prop="mobilePhoneNumber">
                                    <div slot="label">
                                        <div>Mobile/Other</div>
                                        <div>手機/其他</div>
                                    </div>
                                    <el-input v-model="form.phoneNumbers.mobilePhoneNumber" clearable
                                              style="width: 300px;" placeholder="請輸入手機">
                                        <el-select v-model="form.phoneNumbers.areaCode" slot="prepend"
                                                   placeholder="請選擇區號" style="width:120px">
                                            <el-option label="+86" value="+86"></el-option>
                                            <el-option label="+886" value="+886"></el-option>
                                        </el-select>
                                    </el-input>
                                </el-form-item>

                                <el-form-item prop="faxNumber">
                                    <div slot="label">
                                        <div>Fax</div>
                                        <div>傳真</div>
                                    </div>
                                    <el-input v-model="form.phoneNumbers.faxNumber" clearable
                                              style="width: 195px;" placeholder="請輸入傳真"></el-input>
                                </el-form-item>
                            </el-form-item>
                        </el-form>

                    </div>
                </el-collapse-item>
                <el-collapse-item title="二. 台灣地區大學入學考試學科能力測驗成績">
                    <div class="part2">
                        <el-row>
                            <el-col :span="24">
                                <div class="title grid-content bg-purple-dark">RESULT OF GENERAL SCHOLASTIC ABILITY
                                    TEST<br/>
                                    台灣地區大學入學考試學科能力測驗成績
                                </div>
                            </el-col>
                        </el-row>
                        <el-form :model="form.results" :rules="rules" label-width="140px" :inline="true">
                            <el-form-item label="Results 原始成績" label-width="140px">
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
                <el-collapse-item title="三. 就讀學校">
                    <div class="part3">
                        <el-row>
                            <el-col :span="24">
                                <div class="title grid-content bg-purple-dark">SCHOOL ATTENDED 就讀學校</div>
                            </el-col>
                            Name of schools attended the present school. Please state the province and city that the
                            school is
                            located. 中文填寫就讀學校。
                        </el-row>
                        <el-form :model="form.primarySchool" :rules="rules" ref="from.primarySchool" label-width="150px"
                                 :inline="true" hide-required-asterisk>
                            <el-form-item>
                                <div slot="label">
                                    <div>Primary School</div>
                                    <div>小學</div>
                                </div>
                                <el-form-item prop="name">
                                    <el-input v-model="form.primarySchool.name" placeholder="SCHOOL 學校名稱"
                                              style="width: 190px;"></el-input>
                                </el-form-item>
                                <el-form-item prop="region">
                                    <el-select v-model="form.primarySchool.region" placeholder="REGION 地區"
                                               style="width: 130px">
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
                                                    :default-value="new Date('2007-09-01')"
                                                    style="width: 165px"></el-date-picker>

                                </el-form-item>
                                <el-form-item prop="endDate">
                                    <el-date-picker type="date" placeholder="END 終止時間" value-format="yyyy-MM-dd"
                                                    v-model="form.primarySchool.endDate"
                                                    :default-value="new Date('2013-06-30')"
                                                    style="width: 165px"></el-date-picker>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                        <el-form :model="form.juniorMiddleSchool" :rules="rules" ref="form.juniorMiddleSchool"
                                 :inline="true" label-width="150px">
                            <el-form-item>
                                <div slot="label">
                                    <div>Junior middle school</div>
                                    <div>初中</div>
                                </div>
                                <el-form-item prop="name">
                                    <!--接口文檔first拼錯-->
                                    <el-input v-model="form.juniorMiddleSchool.name" placeholder="SCHOOL 學校名稱"
                                              style="width: 190px;"></el-input>
                                </el-form-item>
                                <el-form-item prop="region">
                                    <el-select v-model="form.juniorMiddleSchool.region" placeholder="REGION 地區"
                                               style="width: 130px">
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
                                                    :default-value="new Date('2013-09-01')"
                                                    style="width: 165px"></el-date-picker>

                                </el-form-item>
                                <el-form-item prop="endDate">
                                    <el-date-picker type="date" placeholder="END 終止時間" value-format="yyyy-MM-dd"
                                                    v-model="form.juniorMiddleSchool.endDate"
                                                    :default-value="new Date('2016-06-30')"
                                                    style="width: 165px"></el-date-picker>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                        <el-form :model="form.seniorMiddleSchool" :rules="rules" ref="form.seniorMiddleSchool"
                                 :inline="true" label-width="150px">
                            <el-form-item>
                                <div slot="label">
                                    <div>Senior middle school</div>
                                    <div>高中</div>
                                </div>
                                <el-form-item prop="name">
                                    <!--接口文檔first拼錯-->
                                    <el-input v-model="form.seniorMiddleSchool.name" placeholder="SCHOOL 學校名稱"
                                              style="width: 190px;"></el-input>
                                </el-form-item>
                                <el-form-item prop="region">
                                    <el-select v-model="form.seniorMiddleSchool.region" placeholder="REGION 地區"
                                               style="width: 130px">
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
                                                    :default-value="new Date('2016-09-01')"
                                                    style="width: 165px"></el-date-picker>

                                </el-form-item>
                                <el-form-item prop="endDate">
                                    <el-date-picker type="date" placeholder="END 終止時間" value-format="yyyy-MM-dd"
                                                    v-model="form.seniorMiddleSchool.endDate"
                                                    :default-value="new Date('2019-06-30')"
                                                    style="width: 165px"></el-date-picker>
                                </el-form-item>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="四. 申請者家屬情況">
                    <div class="part4">
                        <el-row>
                            <el-col :span="24">
                                <div class="title grid-content bg-purple-dark">PARTICULARS OF FAMILY MEMBERS
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
                <el-collapse-item title="五. 選報專業（類）志願">
                    <div class="part5">
                        <el-row>
                            <el-col :span="24">
                                <div class="title grid-content bg-purple-dark">CHOICE OF CURRICULUM 選報專業（類）志願</div>
                            </el-col>
                        </el-row>

                        <el-form :model="form.curriculumChoices" :rules="rules" ref="form.curriculumChoices"
                                 label-width="130px" :inline="true" hide-required-asterisk>

                            <el-form-item>
                                <el-form-item label="1st choice 第一志願" prop="firstChoice" label-width="155px">
                                    <!--接口文檔first拼錯-->
                                    <el-select v-model="form.curriculumChoices.firstChoice" placeholder="請選擇第一志願"
                                               style="width: 300px;" clearable filterable>
                                        <template v-for="major of firstChoiceMajors">
                                            <el-option :label="major.label" :value="major.value"></el-option>
                                        </template>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="2st choice 第二志願" prop="secondChoice" label-width="155px">
                                    <el-select v-model="form.curriculumChoices.secondChoice" placeholder="請選擇第二志願"
                                               style="width: 300px;" clearable filterable>
                                        <template v-for="major of secondChoiceMajors">
                                            <el-option :label="major.label" :value="major.value"></el-option>
                                        </template>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="3st choice 第三志願" label-width="155px">
                                    <el-select v-model="form.curriculumChoices.thirdChoice" placeholder="請選擇第三志願"
                                               style="width: 300px;" clearable filterable>
                                        <template v-for="major of thirdChoiceMajors">
                                            <el-option :label="major.label" :value="major.value"></el-option>
                                        </template>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="4st choice 第四志願" label-width="155px">
                                    <el-select v-model="form.curriculumChoices.fourthChoice" placeholder="請選擇第四志願"
                                               style="width: 300px;" clearable filterable>
                                        <template v-for="major of fourthChoiceMajors">
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

                        <!--
                        <br>If you are not offered for any of the above preferred programmes, will you accept other
                        programmes
                        assigned by NJU?本人是否願意被錄取到其他專業（類）？<br/>
                        <el-form-item label="ASSIGNMENT 調劑 " prop="acceptAssignment">
                            <el-radio-group v-model="form.acceptAssignment" :disabled="true">
                                <el-radio label="true">Yes 願意</el-radio>
                                <el-radio label="false">No 不願意</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        -->
                    </div>
                </el-collapse-item>
                <el-collapse-item title="六. 高中階段課外活動及所獲獎項">
                    <div class="part6">
                        <el-row>
                            <el-col :span="24">
                                <div class="title grid-content bg-purple-dark">EXTRA-CURRICULAR ACTIVITIES, AND
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

                                <el-date-picker v-model="activity.attendingDate" type="date" value-format="yyyy-MM-dd"
                                                placeholder="Date of issue/participation獲獎/參與日期"
                                                style="width:290px;"></el-date-picker>
                                <el-button @click.prevent="removeActivity(activity)">刪除</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="addActivity">新增活動</el-button>
                            </el-form-item>
                        </el-form>

                    </div>
                </el-collapse-item>
                <el-collapse-item title="七. 個人陳述">
                    <div class="part7">
                        <el-row>
                            <el-col :span="24">
                                <div class="title grid-content bg-purple-dark">PERSONAL STATEMENT 個人陳述</div>
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
                    <span>點擊暫存，可下次繼續填寫</span>
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
                    needSimplification: 'false',
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
                    acceptAssignment: 'true',
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
                    email: [
                        {required: true, message: '請填寫郵箱', trigger: 'blur'}
                    ],
                    idCardNumber: [
                        {required: true, message: '請填寫身份證號碼', trigger: 'blur'}
                    ],
                    mtpNumber: [
                        {required: true, message: '請輸入8位台胞證號碼', trigger: 'blur'},
                        {min: 8, max: 8, message: '請輸入8位台胞證號碼', trigger: 'blur'}
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
                majors: [],
                majorInfos: []
            };
        },
        mounted() {
            this.$nextTick(() => {
                this.checkApplicationStatus();
            })
        },
        watch: {
            isArt(val) {
                this.form.curriculumChoices.firstChoice = '';
                this.form.curriculumChoices.secondChoice = '';
                this.form.curriculumChoices.thirdChoice = '';
                this.form.curriculumChoices.fourthChoice = '';
                this.majors = this.majorInfos.filter(major => {
                    return val === 0 ? major.acceptArt : !major.acceptArt
                });
            }
        },
        computed: {
            isArt() {
                return this.form.artOrSci;
            },
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
            },
            isDisabled() {
                return this.form.needSimplification !== 'true';
            },
            firstChoiceMajors() {
                return this.majors.filter(major => {
                    return major.value !== this.form.curriculumChoices.secondChoice
                        && major.value !== this.form.curriculumChoices.thirdChoice
                        && major.value !== this.form.curriculumChoices.fourthChoice;
                });
            },
            secondChoiceMajors() {
                return this.majors.filter(major => {
                    return major.value !== this.form.curriculumChoices.firstChoice
                        && major.value !== this.form.curriculumChoices.thirdChoice
                        && major.value !== this.form.curriculumChoices.fourthChoice;
                })
            },
            thirdChoiceMajors() {
                return this.majors.filter(major => {
                    return major.value !== this.form.curriculumChoices.firstChoice
                        && major.value !== this.form.curriculumChoices.secondChoice
                        && major.value !== this.form.curriculumChoices.fourthChoice;
                })
            },
            fourthChoiceMajors() {
                return this.majors.filter(major => {
                    return major.value !== this.form.curriculumChoices.firstChoice
                        && major.value !== this.form.curriculumChoices.secondChoice
                        && major.value !== this.form.curriculumChoices.thirdChoice;
                })
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
            formatApplication() {
                let information = Object.assign({}, this.form);

                let mobile = this.form.phoneNumbers.areaCode + this.form.phoneNumbers.mobilePhoneNumber;
                information.phoneNumbers.mobilePhoneNumber = (mobile).substring(mobile.lastIndexOf("+"));

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

                return information;
            },
            submitApplication() {
                let information = this.formatApplication();
                information.cacheOrSubmit = 1; // 提交
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
            },
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
                        if (info.needSimplification !== false) {
                            this.form.needSimplification = info.needSimplification.toString();
                        }

                        this.form.sex = info.sex;
                        if (info.birthDate !== null) {
                            this.form.birthDate = info.birthDate;
                        }
                        if (info.highSchool !== '') {
                            this.form.highSchool = info.highSchool.split(',');
                        }
                        this.form.graduationYear = info.graduationYear;
                        this.form.address = info.address;
                        this.form.postalCode = info.postalCode;

                        this.form.phoneNumbers.homePhoneNumber = info.phoneNumbers.homePhoneNumber;
                        this.form.phoneNumbers.areaCode = info.phoneNumbers.mobilePhoneNumber.substring(0, info.phoneNumbers.mobilePhoneNumber.indexOf("6") + 1);
                        this.form.phoneNumbers.mobilePhoneNumber = info.phoneNumbers.mobilePhoneNumber.substring(info.phoneNumbers.mobilePhoneNumber.indexOf("6") + 1);
                        this.form.phoneNumbers.faxNumber = info.phoneNumbers.faxNumber;

                        this.form.email = info.email;
                        this.form.idCardNumber = info.idCardNumber;
                        this.form.mtpNumber = info.mtpNumber;

                        if (info.curriculumChoices.firstChoice !== null) {
                            this.form.curriculumChoices.firstChoice = info.curriculumChoices.firstChoice;
                            console.log(this.form.curriculumChoices.firstChoice)
                        }
                        if (info.curriculumChoices.secondChoice !== null) {
                            this.form.curriculumChoices.secondChoice = info.curriculumChoices.secondChoice;
                        }
                        if (info.curriculumChoices.thirdChoice !== null) {
                            this.form.curriculumChoices.thirdChoice = info.curriculumChoices.thirdChoice;
                        }
                        if (info.curriculumChoices.fourthChoice !== null) {
                            this.form.curriculumChoices.fourthChoice = info.curriculumChoices.fourthChoice;

                        }

                        this.form.artOrSci = info.artOrSci;
                        if (info.acceptAssignment !== false) {
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

                        if (info.results.chinese !== 0) {
                            this.form.results.chinese = info.results.chinese;
                        }
                        if (info.results.math !== 0) {
                            this.form.results.math = info.results.math;
                        }
                        if (info.results.english !== 0) {
                            this.form.results.english = info.results.english;
                        }
                        if (info.results.socials !== 0) {
                            this.form.results.socials = info.results.socials;
                        }
                        if (info.results.sciences !== 0) {
                            this.form.results.sciences = info.results.sciences;
                        }

                        if (info.actualLevelPoints.chinese !== 0) {
                            this.form.actualLevelPoints.chinese = info.actualLevelPoints.chinese;
                        }
                        if (info.actualLevelPoints.math !== 0) {
                            this.form.actualLevelPoints.math = info.actualLevelPoints.math;
                        }
                        if (info.actualLevelPoints.english !== 0) {
                            this.form.actualLevelPoints.english = info.actualLevelPoints.english;
                        }
                        if (info.actualLevelPoints.socials !== 0) {
                            this.form.actualLevelPoints.socials = info.actualLevelPoints.socials;
                        }
                        if (info.actualLevelPoints.sciences !== 0) {
                            this.form.actualLevelPoints.sciences = info.actualLevelPoints.sciences;
                        }

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
                let information = this.formatApplication();
                information.cacheOrSubmit = 0; // 暫存
                sendApplication(information)
                    .then((res) => {
                        if (res.data.succeed) {
                            this.$message({
                                message: '暫存完成',
                                type: 'success'
                            })
                        } else {
                            this.$message({
                                message: res.data.msg,
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
                                value: major.name,
                                acceptArt: major.acceptArt
                            });
                        });
                        this.majorInfos = majors;
                        this.majors = majors.filter(major => {
                            return this.form.artOrSci === 0 ? major.acceptArt : !major.acceptArt;
                        })
                    })
                    .catch((err) => {
                        this.$message({
                            message: err,
                            type: 'error'
                        })
                    });
            },
            checkApplicationStatus() {
                let _this = this;
                getApplicationStatus()
                    .then((res) => {
                        this.hasFinished = !!res.data.hasUploaded;
                        return _this;
                    })
                    .then((that) => {
                        that.getMajors();
                        return _this;
                    })
                    .then((that) => {
                        that.getApplicationInfo();
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
