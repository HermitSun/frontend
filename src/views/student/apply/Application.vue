<template xmlns="http://www.w3.org/1999/html">
    <el-card class="wrapper">
            <el-form ref="form" :inline="true" model="form" label-width="115px">

                <el-row>
                    <el-col :span="24"><div class="title grid-content bg-purple-dark">一. PERSONAL PARTICULARS 個人基本情況</div></el-col>
                </el-row>

                <el-form-item label="FAMILY NAME 姓" >
                    <el-input placeholder="中文(必須與身份證相同)" v-model="form.firstName" clearable style="width: 300px;"></el-input>
                    <el-input placeholder="拼音" v-model="form.firstNameAux" clearable style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="GIVEN NAME 名">
                    <el-input placeholder="中文(必須與身份證相同)" v-model="form.lastName" clearable style="width: 300px;"></el-input>
                    <el-input placeholder="拼音" v-model="lastNameAux" clearable style="width: 300px;"></el-input>
                </el-form-item>

                <el-form-item label="SIMPLIFICATION 簡體姓名 ">
                    <el-radio-group v-model="form.needSimplification" style="width: 300px;">
                        <el-radio label="與身份證一致" value=false></el-radio>
                        <el-radio label="與身份證有出入" value=true></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form ref="form":incline="false">

                </el-form>
               <el-form-item label="SEX 性別">
                    <el-select v-model="sex" placeholder="請選擇性別" style="width: 195px;">
                        <el-option label="男" value=1></el-option>
                        <el-option label="女" value=0></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="DATE OF BIRTH 出生日期" >
                    <el-date-picker type="date" placeholder="選擇日期" v-model="form.birthdate" style="width: 195px;"></el-date-picker>
                </el-form-item>

                <!--後端少接口-->
                <el-form-item label="EMAIL ADDRESS 電郵">
                    <el-input  v-model="form.email" clearable style="width: 195px;"></el-input>
                </el-form-item>

                <el-form-item label="ID CARD No. 身份證號碼">
                    <el-input  v-model="form.IDCardNumber" clearable style="width: 195px;"></el-input>
                </el-form-item>

                <el-form-item label="MTP Number 台胞證號碼">
                    <el-input  v-model="form.MTPNumber" clearable style="width: 195px;"></el-input>
                </el-form-item>

                <el-form-item label="HIGH SCHOOL 現就讀學校">
                    <el-input  v-model="form.highSchool" clearable style="width: 195px;"></el-input>
                </el-form-item>

                <el-form-item label="Graduation Year 畢業年份">
                    <el-date-picker type="year" placeholder="選擇年份" v-model="form.graduationYear" style="width: 195px;"></el-date-picker>
                </el-form-item>



                <el-form-item label="ADDRESS 通訊地址">
                    <el-input  v-model="form.address" clearable style="width: 195px;"></el-input>
                </el-form-item>

                <el-form-item label="POSTAL CODE 郵編">
                    <el-input  v-model="form.postalCode" clearable style="width: 195px;"></el-input>
                </el-form-item>

                <el-form-item label="TELEPHONE 電話號碼" v-model="phoneNumber" label-width="195px" >
                    <!--區號-->
                    <el-form-item label="Home 住宅" >
                        <el-input  v-model="form.phoneNumber.home" clearable style="width: 195px;"></el-input>
                    </el-form-item>
                    <el-form-item label="Mobile/Other 手機/其他">
                        <el-input  v-model="form.phoneNumber.mobile" clearable style="width: 195px;"></el-input>
                    </el-form-item>
                    <el-form-item label="Fax 傳真">
                        <el-input  v-model="form.phoneNumber.fax" clearable style="width: 195px;"></el-input>
                    </el-form-item>
                </el-form-item>



                <el-row>
                    <el-col :span="24"><div class="title grid-content bg-purple-dark">二. CHOICE OF CURRICULUM 選報專業（類）志願</div></el-col>
                </el-row>

                <el-form ref="form1" :model="form1" label-width="150px" v-model="curriculumChoices">
                    <el-form-item label="1st choice 第一志願">
                        <!--接口文檔first拼錯-->
                        <el-select v-model="firstChoice" placeholder="請選擇第一志願">
                            <el-option label="軟件工程" ></el-option>
                            <el-option label="經濟管理實驗班"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="2st choice 第二志願">
                        <el-select v-model="secondChoice" placeholder="請選擇第二志願">
                            <el-option label="軟件工程" ></el-option>
                            <el-option label="經濟管理實驗班" ></el-option>
                            <el-option label=""></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="3st choice 第三志願">
                        <el-select v-model="thirdChoice" placeholder="請選擇第三志願">
                            <el-option label="軟件工程" ></el-option>
                            <el-option label="經濟管理實驗班" ></el-option>
                            <el-option label=""></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="4st choice 第四志願">
                        <el-select v-model="fourthChoice" placeholder="請選擇第四志願">
                            <el-option label="軟件工程" ></el-option>
                            <el-option label="經濟管理實驗班"></el-option>
                            <el-option label=""></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <el-form-item label="You are 您屬於">
                    <el-radio-group v-model="form.artOrSci">
                        <el-radio label="Arts 文史類" value=0></el-radio>
                        <el-radio label="Science 理工農醫類" value=1></el-radio>
                    </el-radio-group>
                </el-form-item>

                <br >If you are not offered for any of the above preferred programmes, will you accept other programmes assigned by NJU?本人是否願意被錄取到其他專業（類）？<br />
                <el-form-item label="ASSIGNMENT 調劑 ">
                    <el-radio-group v-model="form.acceptAssignment">
                        <el-radio label="Yes 願意" value=true></el-radio>
                        <el-radio label="No 不願意" value=false></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-row>
                    <el-col :span="24"><div class="title grid-content bg-purple-dark">三. SCHOOL ATTENDED 就讀學校</div></el-col>
                        Name of schools attended the present school. Please state the province and city that the school is located. 中文填寫就讀學校。
                </el-row>

                <el-form ref="form1" :inline="true" model="form1" label-width="160px" v-model="schoolAttended">

                    <el-form-item v-model="primarySchool">
                        <table>
                            <tr>
                                <td width="200px"><div slot="label">Primary school 小學</div></td>
                                <td width="400px"><el-input v-model="name" placeholder="SCHOOL 學校名稱" style="width: 200px"></el-input></td>
                            </tr>
                            <tr>
                                <td width="200px"></td>
                                <td width="400px"><el-select v-model="region" placeholder="REGION 地區" style="width: 200px"><!--導入台灣地區區名--><el-option label="台北市"></el-option></el-select></td>
                            </tr>
                            <tr>
                                <td width="200px"></td>
                                <td width="400px"><el-date-picker type="date" placeholder="START 開始時間" v-model="startDate" style="width: 200px"></el-date-picker>
                                </td>
                            </tr>
                            <tr>
                                <td width="200px"></td>
                                <td width="400px"><el-date-picker type="date" placeholder="END 終止時間" v-model="endDate" style="width: 200px"></el-date-picker></td>
                            </tr>
                        </table>
                    </el-form-item>


                    <el-form-item  v-model="juniorMiddleSchool">
                        <table>
                            <tr>
                                <td width="200px"><div slot="label">Junior middle school 初中</div></td>
                                <td width="400px"><el-input v-model="name" placeholder="SCHOOL 學校名稱" style="width: 200px"></el-input></td>
                            </tr>
                            <tr>
                                <td width="200px"></td>
                                <td width="400px"><el-select v-model="region" placeholder="REGION 地區" style="width: 200px"><!--導入台灣地區區名--><el-option label="台北市"></el-option></el-select></td>
                            </tr>
                            <tr>
                                <td width="200px"></td>
                                <td width="400px"><el-date-picker type="date" placeholder="START 開始時間" v-model="startDate" style="width: 200px"></el-date-picker>
                                </td>
                            </tr>
                            <tr>
                                <td width="200px"></td>
                                <td width="400px"><el-date-picker type="date" placeholder="END 終止時間" v-model="endDate" style="width: 200px"></el-date-picker></td>
                            </tr>
                        </table>
                    </el-form-item>

                    <el-form-item  v-model="seniorMiddleSchool">
                        <table>
                            <tr>
                                <td width="200px"><div slot="label">Senior middle school 高中</div></td>
                                <td width="400px"><el-input v-model="name" placeholder="SCHOOL 學校名稱" style="width: 200px"></el-input></td>
                            </tr>
                            <tr>
                                <td width="200px"></td>
                                <td width="400px"><el-select v-model="region" placeholder="REGION 地區" style="width: 200px"><!--導入台灣地區區名--><el-option label="台北市"></el-option></el-select></td>
                            </tr>
                            <tr>
                                <td width="200px"></td>
                                <td width="400px"><el-date-picker type="date" placeholder="START 開始時間" v-model="startDate" style="width: 200px"></el-date-picker>
                                </td>
                            </tr>
                            <tr>
                                <td width="200px"></td>
                                <td width="400px"><el-date-picker type="date" placeholder="END 終止時間" v-model="endDate" style="width: 200px"></el-date-picker></td>
                            </tr>
                        </table>
                    </el-form-item>
                    <!--
                    <el-input  v-model="name" placeholder="SCHOOL 學校名稱" style="width: 50%;">></el-input>
                        <el-select v-model="region" placeholder="REGION 地區" style="width: 50%;">
                    <el-option label="台北市" ></el-option>
                    </el-select>
                    <el-date-picker type="date" placeholder="START 開始時間" v-model="startDate" style="width: 50%;"></el-date-picker>
                    <el-date-picker type="date" placeholder="END 終止時間" v-model="endDate" style="width: 50%;"></el-date-picker>
                    -->

                </el-form>

                <el-row>
                    <el-col :span="24"><div class="title grid-content bg-purple-dark">四. PARTICULARS OF FAMILY MEMBERS 申請者家屬情況</div></el-col>
                </el-row>

                <!--增加嵌套結構-->
                <el-form v-model="familyParticulars" >
                    <el-form v-model="relationship1" incline="true">
                        <el-form-item  v-model="relationship"><el-input placeholder="Relationship 關係" style="width: 180px"></el-input></el-form-item>
                        <el-form-item  v-model="name"><el-input placeholder="NAME 姓名" style="width: 180px"></el-input></el-form-item>
                        <el-form-item  v-model="organization"><el-input placeholder="Company 單位名稱" style="width: 180px"></el-input></el-form-item>
                        <el-form-item  v-model="occupation"><el-input placeholder="Occupation 職務" style="width: 180px"></el-input></el-form-item>
                        <el-form-item  v-model="phoneNumber"><el-input placeholder="Mobile 手機" style="width: 180px"></el-input></el-form-item>
                    </el-form>
                    <el-form v-model="relationship2" incline="true">
                        <el-form-item  v-model="relationship"><el-input placeholder="Relationship 關係" style="width: 180px"></el-input></el-form-item>
                        <el-form-item  v-model="name"><el-input placeholder="NAME 姓名" style="width: 180px"></el-input></el-form-item>
                        <el-form-item  v-model="organization"><el-input placeholder="Company 單位名稱" style="width: 180px"></el-input></el-form-item>
                        <el-form-item  v-model="occupation"><el-input placeholder="Occupation 職務" style="width: 180px"></el-input></el-form-item>
                        <el-form-item  v-model="phoneNumber"><el-input placeholder="Mobile 手機" style="width: 180px"></el-input></el-form-item>
                    </el-form>
                    <el-form v-model="relationship3" incline="true">
                        <el-form-item  v-model="relationship"><el-input placeholder="Relationship 關係" style="width: 180px"></el-input></el-form-item>
                        <el-form-item  v-model="name"><el-input placeholder="NAME 姓名" style="width: 180px"></el-input></el-form-item>
                        <el-form-item  v-model="organization"><el-input placeholder="Company 單位名稱" style="width: 180px"></el-input></el-form-item>
                        <el-form-item  v-model="occupation"><el-input placeholder="Occupation 職務" style="width: 180px"></el-input></el-form-item>
                        <el-form-item  v-model="phoneNumber"><el-input placeholder="Mobile 手機" style="width: 180px"></el-input></el-form-item>
                    </el-form>
                </el-form>


                <el-row>
                    <el-col :span="24"><div class="title grid-content bg-purple-dark">五. RESULT OF GENERAL SCHOLASTIC ABILITY TEST (ATTACH A COPY OF RESULT<br />
                            台灣地區大學入學考試學科能力測驗成績（請附考生成績通知單影印本）</div></el-col>
                </el-row>

                <el-form v-model="gsatResult" >
                    <table>
                        <tr>
                            <td>Results <br/>成績</td>
                            <td><el-form-item  v-model="chinese"><el-input placeholder="CHINESE 國文"></el-input></el-form-item></td>
                            <td><el-form-item  v-model="math"><el-input placeholder="MATH 數學"></el-input></el-form-item></td>
                            <td><el-form-item  v-model="english"><el-input placeholder="ENGLISH 英文"></el-input></el-form-item></td>
                            <td><el-form-item  v-model="socials"><el-input placeholder="SOCIAL 社會" ></el-input></el-form-item></td>
                            <td><el-form-item  v-model="sciences"><el-input placeholder="SCIENCES 自然"></el-input></el-form-item></td>
                        </tr>
                        <tr>
                            <td>Actual level points <br/>實得級分</td>
                            <td><el-form-item  v-model="chinese"><el-input placeholder="CHINESE 國文"></el-input></el-form-item></td>
                            <td><el-form-item  v-model="math"><el-input placeholder="MATH 數學"></el-input></el-form-item></td>
                            <td><el-form-item  v-model="english"><el-input placeholder="ENGLISH 英文"></el-input></el-form-item></td>
                            <td><el-form-item  v-model="socials"><el-input placeholder="SOCIAL 社會" ></el-input></el-form-item></td>
                            <td><el-form-item  v-model="sciences"><el-input placeholder="SCIENCES 自然"></el-input></el-form-item></td>
                        </tr>
                        <tr>
                            <td>Level range <br/>級距</td>
                            <td><el-form-item  v-model="chinese"><el-input placeholder="CHINESE 國文"></el-input></el-form-item></td>
                            <td><el-form-item  v-model="math"><el-input placeholder="MATH 數學"></el-input></el-form-item></td>
                            <td><el-form-item  v-model="english"><el-input placeholder="ENGLISH 英文"></el-input></el-form-item></td>
                            <td><el-form-item  v-model="socials"><el-input placeholder="SOCIAL 社會" ></el-input></el-form-item></td>
                            <td><el-form-item  v-model="sciences"><el-input placeholder="SCIENCES 自然"></el-input></el-form-item></td>
                        </tr>
                        <tr>
                            <td>Single subject criteria <br/>單科標準</td>
                            <td><el-form-item  v-model="chinese"><el-input placeholder="CHINESE 國文"></el-input></el-form-item></td>
                            <td><el-form-item  v-model="math"><el-input placeholder="MATH 數學"></el-input></el-form-item></td>
                            <td><el-form-item  v-model="english"><el-input placeholder="ENGLISH 英文"></el-input></el-form-item></td>
                            <td><el-form-item  v-model="socials"><el-input placeholder="SOCIAL 社會" ></el-input></el-form-item></td>
                            <td><el-form-item  v-model="sciences"><el-input placeholder="SCIENCES 自然"></el-input></el-form-item></td>
                        </tr>

                    </table>

                    <table >
                        <tr>
                            <td>Total level points 總級分</td>
                            <td><el-input></el-input></td>
                            <td>Criteria Level 標級</td>
                            <td><el-input></el-input></td>
                        </tr>

                    </table>
                </el-form>
                    <!--
                    <el-form  v-model="results"  incline="true" >
                        <el-form-item label="Results 成績"></el-form-item>
                        <el-form-item  v-model="chinese"><el-input placeholder="CHINESE 國文"></el-input></el-form-item>
                        <el-form-item  v-model="math"><el-input placeholder="MATH 數學"></el-input></el-form-item>
                        <el-form-item  v-model="english"><el-input placeholder="ENGLISH 英文"></el-input></el-form-item>
                        <el-form-item  v-model="socials"><el-input placeholder="SOCIAL 社會" ></el-input></el-form-item>
                        <el-form-item  v-model="sciences"><el-input placeholder="SCIENCES 自然"></el-input></el-form-item>
                    </el-form>
                    <el-form  v-model="actualLevelPoints"  incline="true">
                        <el-form-item label="Actual level points 實得級分"></el-form-item>
                        <el-form-item  v-model="chinese"><el-input placeholder="CHINESE 國文"></el-input></el-form-item>
                        <el-form-item  v-model="math"><el-input placeholder="MATH 數學"></el-input></el-form-item>
                        <el-form-item  v-model="english"><el-input placeholder="ENGLISH 英文"></el-input></el-form-item>
                        <el-form-item  v-model="socials"><el-input placeholder="SOCIAL 社會" ></el-input></el-form-item>
                        <el-form-item  v-model="sciences"><el-input placeholder="SCIENCES 自然"></el-input></el-form-item>
                    </el-form>
                    <el-form  v-model="levelRange"  incline="true">
                        <el-form-item label="Level range 級距"></el-form-item>
                        <el-form-item  v-model="chinese"><el-input placeholder="CHINESE 國文"></el-input></el-form-item>
                        <el-form-item  v-model="math"><el-input placeholder="MATH 數學"></el-input></el-form-item>
                        <el-form-item  v-model="english"><el-input placeholder="ENGLISH 英文"></el-input></el-form-item>
                        <el-form-item  v-model="socials"><el-input placeholder="SOCIAL 社會" ></el-input></el-form-item>
                        <el-form-item  v-model="sciences"><el-input placeholder="SCIENCES 自然"></el-input></el-form-item>
                    </el-form>
                    <el-form  v-model="singleSubjectCriteria"  incline="true">
                        <el-form-item label="Single subject criteria 單科標準"></el-form-item>
                        <el-form-item  v-model="chinese"><el-input placeholder="CHINESE 國文"></el-input></el-form-item>
                        <el-form-item  v-model="math"><el-input placeholder="MATH 數學"></el-input></el-form-item>
                        <el-form-item  v-model="english"><el-input placeholder="ENGLISH 英文"></el-input></el-form-item>
                        <el-form-item  v-model="socials"><el-input placeholder="SOCIAL 社會" ></el-input></el-form-item>
                        <el-form-item  v-model="sciences"><el-input placeholder="SCIENCES 自然"></el-input></el-form-item>
                    </el-form>
                    -->


                <el-row>
                    <el-col :span="24"><div class="title grid-content bg-purple-dark">六. EXTRA-CURRICULAR ACTIVITIES, AND AWARDS 高中階段課外活動及所獲獎項</div></el-col>
                        Please provide the information of the extra-curricular activities and voluntary services you have participated in, and awards you have won in the past three years, in both Chinese and English.
                        請填寫你參加過的社會活動，主要包括以下幾個方面：①學術活動：主要包括參加的各類學科競賽、科研活動、徵文比賽、創新大賽等；②文體活動：主要包括參加的各種文藝、體育活動；③社會活動：如志願者活動、學生社團活動、公益活動等。請附獲獎證書影印本、公開發表作品影印本和其他有關證明材料。
                </el-row>

                <el-form v-model="familyParticulars" >
                    <table align="center">
                        <tr>
                            <td width="50px" style="text-align:center;vertical-align:middle;">1</td>
                            <td width="300px"><el-form-item  v-model="name" ><el-input placeholder="Name of organization頒發/主辦單位" style="width: 260px;"></el-input></el-form-item></td>
                            <td width="400px"><el-form-item  v-model="organization"><el-input placeholder="Name of award/activity獎項/活動名" style="width: 360px;"></el-input></el-form-item></td>
                            <td width="300px"><el-form-item  v-model="occupation"><el-input placeholder="Date of issue/participation獲獎/參與日期" style="width:290px;"></el-input></el-form-item></td>
                        </tr>
                        <tr>
                            <td width="50px" style="text-align:center;vertical-align:middle;">2</td>
                            <td width="300px"><el-form-item  v-model="name" ><el-input placeholder="Name of organization頒發/主辦單位" style="width: 260px;"></el-input></el-form-item></td>
                            <td width="400px"><el-form-item  v-model="organization"><el-input placeholder="Name of award/activity獎項/活動名" style="width: 360px;"></el-input></el-form-item></td>
                            <td width="300px"><el-form-item  v-model="occupation"><el-input placeholder="Date of issue/participation獲獎/參與日期" style="width:290px;"></el-input></el-form-item></td>
                        </tr>
                        <tr>
                            <td width="50px" style="text-align:center;vertical-align:middle;">3</td>
                            <td width="300px"><el-form-item  v-model="name" ><el-input placeholder="Name of organization頒發/主辦單位" style="width: 260px;"></el-input></el-form-item></td>
                            <td width="400px"><el-form-item  v-model="organization"><el-input placeholder="Name of award/activity獎項/活動名" style="width: 360px;"></el-input></el-form-item></td>
                            <td width="300px"><el-form-item  v-model="occupation"><el-input placeholder="Date of issue/participation獲獎/參與日期" style="width:290px;"></el-input></el-form-item></td>
                        </tr>
                        <tr>
                            <td width="50px" style="text-align:center;vertical-align:middle;">4</td>
                            <td width="300px"><el-form-item  v-model="name" ><el-input placeholder="Name of organization頒發/主辦單位" style="width: 260px;"></el-input></el-form-item></td>
                            <td width="400px"><el-form-item  v-model="organization"><el-input placeholder="Name of award/activity獎項/活動名" style="width: 360px;"></el-input></el-form-item></td>
                            <td width="300px"><el-form-item  v-model="occupation"><el-input placeholder="Date of issue/participation獲獎/參與日期" style="width:290px;"></el-input></el-form-item></td>
                        </tr>
                        <tr>
                            <td width="50px" style="text-align:center;vertical-align:middle;">5</td>
                            <td width="300px"><el-form-item  v-model="name" ><el-input placeholder="Name of organization頒發/主辦單位" style="width: 260px;"></el-input></el-form-item></td>
                            <td width="400px"><el-form-item  v-model="organization"><el-input placeholder="Name of award/activity獎項/活動名" style="width: 360px;"></el-input></el-form-item></td>
                            <td width="300px"><el-form-item  v-model="occupation"><el-input placeholder="Date of issue/participation獲獎/參與日期" style="width:290px;"></el-input></el-form-item></td>
                        </tr>
                    </table>

                </el-form>


                </el-form>


                <el-row>
                    <el-col :span="24"><div class="title grid-content bg-purple-dark">七. PERSONAL STATEMENT 個人陳述</div></el-col>
                        NOTES: Write briefly your reasons for applying to study at Nanjing University, outlining the curricula which you are interested in, your career aspirations and any other information you consider relevant, within 500 Chinese characters.
                        說明：我們希望借此機會能對你有更多的瞭解，內容可以包括你對大學學習生活等方面的計劃和設想、未來的職業理想、你的思考和追求、選擇南京大學深造的原因等等。字數控制在500字之內。
                </el-row>

                <el-row>
                <el-col :span="23">
                    <el-input type="textarea" placeholder="請輸入內容" v-model="emailContent" class="emailContent"
                              :clearable="true"></el-input>
                </el-col>
            </el-row>
            </el-form>



        <el-col :span="24">
            <div class="prompt">
                <i class="el-icon-info"></i>
                <span>點擊保存可暫存</span>
            </div>
            <el-button type="primary" icon="el-icon-document" class="confirmUpload">提交</el-button>
            <el-button type="primary" icon="el-icon-document" class="saveEmail">保存</el-button>
        </el-col>
    </el-card>
</template>


<script>
    export default {
        data() {
            return {
                form: {

                    phoneNumber:{
                    },
                    curriculumChoices:{

                    }
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
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
            margin-top: 8px;
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
