<!--<template>-->
<!--  <div class="content-page">-->
<!--    <div class="content-nav">-->
<!--      <el-breadcrumb class="breadcrumb" separator="/">-->
<!--        <el-breadcrumb-item>后台主页</el-breadcrumb-item>-->
<!--      </el-breadcrumb>-->
<!--    </div>-->

<!--    <div class="content-main clearfix">-->
<!--      <div class="header clearfix">-->
<!--        &lt;!&ndash; 学校数量 &ndash;&gt;-->
<!--        <el-card class="box-card card-blue">-->
<!--          <router-link class="link-color" :to="{ path: '/dashboard/school' }">-->
<!--            <div class="card-content">-->
<!--              <div class="text item">-->
<!--                高校 <span class="large-number">{{ schoolNum }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </router-link>-->
<!--        </el-card>-->

<!--        &lt;!&ndash; 代理商 &ndash;&gt;-->
<!--        <el-card class="box-card card-purple">-->
<!--          <router-link class="link-color" :to="{ path: '/dashboard/agent' }">-->
<!--            <div class="card-content">-->
<!--              <div class="text item">-->
<!--                代理商 <span class="large-number">{{ agentNum }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </router-link>-->
<!--        </el-card>-->
<!--        &lt;!&ndash; 用户数 &ndash;&gt;-->
<!--        <el-card class="box-card card-red">-->
<!--          <router-link class="link-color" :to="{ path: '/dashboard/userInfo' }">-->
<!--            <div class="card-content">-->
<!--              <div class="text item">-->
<!--                用户数 <span class="large-number">{{ userNum }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </router-link>-->
<!--        </el-card>-->

<!--        &lt;!&ndash; 总学生数 &ndash;&gt;-->
<!--        <el-card class="box-card card-black">-->
<!--          <router-link class="link-color" :to="{ path: '/dashboard/student' }">-->
<!--            <div class="card-content">-->
<!--              <div class="text item">-->
<!--                学生数 <span class="large-number">{{ totalStudents }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </router-link>-->
<!--        </el-card>-->
<!--      </div>-->
<!--      &lt;!&ndash; 卡片区域 &ndash;&gt;-->
<!--      <div class="header clearfix">-->
<!--        <el-card class="box-card card-pink">-->
<!--          <router-link class="link-color" :to="{ path: '/dashboard/todo' }">-->
<!--            <div class="card-content">-->
<!--              <div class="text item">-->
<!--                代办总数 <span class="large-number">{{ totalOrders }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </router-link>-->
<!--        </el-card>-->
<!--        &lt;!&ndash; 代办待接单 &ndash;&gt;-->
<!--        <el-card class="box-card card-gray">-->
<!--          <router-link class="link-color" :to="{ path: '/dashboard/todo' }">-->
<!--            <div class="card-content">-->
<!--              <div class="text item">-->
<!--                代办待接单 <span class="large-number">{{ todoWait }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </router-link>-->
<!--        </el-card>-->
<!--        &lt;!&ndash; 代办进行中 &ndash;&gt;-->
<!--        <el-card class="box-card card-red">-->
<!--          <router-link class="link-color" :to="{ path: '/dashboard/todo' }">-->
<!--            <div class="card-content">-->
<!--              <div class="text item">-->
<!--                代办进行中 <span class="large-number">{{ todoIng }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </router-link>-->
<!--        </el-card>-->

<!--        &lt;!&ndash; 代办已完成 &ndash;&gt;-->
<!--        <el-card class="box-card card-green">-->
<!--          <router-link class="link-color" :to="{ path: '/dashboard/todo' }">-->
<!--            <div class="card-content">-->
<!--              <div class="text item">-->
<!--                代办已完成 <span class="large-number">{{ todoFinish }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </router-link>-->
<!--        </el-card>-->
<!--        &lt;!&ndash; 代办已完成 &ndash;&gt;-->
<!--        <el-card class="box-card card-black">-->
<!--          <router-link class="link-color" :to="{ path: '/dashboard/todo' }">-->
<!--            <div class="card-content">-->
<!--              <div class="text item">-->
<!--                代办售后中 <span class="large-number">{{ todoBack }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </router-link>-->
<!--        </el-card>-->
<!--      </div>-->

<!--      &lt;!&ndash; 主内容区域 &ndash;&gt;-->
<!--      <div class="main">-->
<!--        <el-tabs class="o-tab" v-model="activeName2" type="card" @tab-click="handleClick">-->
<!--          <el-tab-pane label="今天" name="first"></el-tab-pane>-->
<!--          <el-tab-pane label="昨天" name="second"></el-tab-pane>-->
<!--          <el-tab-pane label="最近7天" name="third"></el-tab-pane>-->
<!--          <el-tab-pane label="最近30天" name="fourth"></el-tab-pane>-->
<!--        </el-tabs>-->

<!--        <div class="tab-content clearfix">-->
<!--          <el-card class="box-card2">-->
<!--            <div slot="header" class="clearfix">-->
<!--              <span style="line-height: 36px;">新增代办订单</span>-->
<!--              <el-popover placement="right" v-model="related_pop">-->
<!--                <el-tabs class="user-tab" v-model="userTab" type="card" @tab-click="userTabClick">-->
<!--                  <el-tab-pane label="新增" name="first"></el-tab-pane>-->
<!--                  <el-tab-pane label="老客户" name="second"></el-tab-pane>-->
<!--                </el-tabs>-->
<!--                <el-table :data="userData" style="width: 100%" height="550" border stripe>-->
<!--                  <el-table-column label="头像" width="80">-->
<!--                    <template slot-scope="scope">-->
<!--                      <img :src="scope.row.avatar" alt="" style="width: 50px; height: 50px;">-->
<!--                    </template>-->
<!--                  </el-table-column>-->
<!--                  <el-table-column prop="nickname" label="昵称" width="140"></el-table-column>-->
<!--                  <el-table-column prop="gender" label="性别" width="50">-->
<!--                    <template slot-scope="scope">-->
<!--                      {{ scope.row.gender === 2 ? '女' : '男' }}-->
<!--                    </template>-->
<!--                  </el-table-column>-->
<!--                  <el-table-column prop="register_time" label="注册时间" width="170"></el-table-column>-->
<!--                  <el-table-column prop="last_login_time" label="最近登录" width="170"></el-table-column>-->
<!--                </el-table>-->
<!--                <el-button class="float-right" slot="reference" size="mini" type="primary" @click="seeClick">-->
<!--                  查看-->
<!--                </el-button>-->
<!--              </el-popover>-->
<!--            </div>-->
<!--            <div class="text item">-->
<!--              <span>新增</span>-->
<!--              <h3 style="float: right;">{{ mainInfo.newUser }}</h3>-->
<!--            </div>-->
<!--            <div class="text item">-->
<!--              <span>老顾客</span>-->
<!--              <h3 style="float: right;">{{ mainInfo.oldUser }}</h3>-->
<!--            </div>-->
<!--          </el-card>-->

<!--          &lt;!&ndash; 下单信息卡片 &ndash;&gt;-->
<!--          <el-card class="box-card2">-->
<!--            <div slot="header" class="clearfix">-->
<!--              <span style="line-height: 36px;">完成代办订单</span>-->
<!--            </div>-->
<!--            <div class="text item">-->
<!--              <span>加入购物车</span>-->
<!--              <h3 style="float: right;">{{ mainInfo.addCart }}</h3>-->
<!--            </div>-->
<!--            <div class="text item">-->
<!--              <span>提交订单数/金额</span>-->
<!--              <h3 style="float: right;">{{ mainInfo.addOrderNum }} / {{ mainInfo.addOrderSum }}</h3>-->
<!--            </div>-->
<!--          </el-card>-->

<!--          &lt;!&ndash; 支付信息卡片 &ndash;&gt;-->
<!--          <el-card class="box-card2">-->
<!--            <div slot="header" class="clearfix">-->
<!--              <span style="line-height: 36px;">代办总金额</span>-->
<!--            </div>-->
<!--            <div class="text item">-->
<!--              <span>成交代办数</span>-->
<!--              <h3 style="float: right;">{{ mainInfo.payOrderNum }}</h3>-->
<!--            </div>-->
<!--            <div class="text item">-->
<!--              <span>成交代办金额</span>-->
<!--              <h3 style="float: right;">{{ mainInfo.payOrderSum }}</h3>-->
<!--            </div>-->
<!--          </el-card>-->
<!--        </div>-->

<!--        &lt;!&ndash; 其他数据卡片区域 &ndash;&gt;-->
<!--        <div class="block-4 clearfix">-->
<!--          <el-card class="box-card">-->
<!--            <div class="text item">-->
<!--              <span>客单价</span>-->
<!--              <p style="float: right;">{{ mainInfo.payOrderSum / mainInfo.payOrderNum | numFilter }}</p>-->
<!--            </div>-->
<!--            <p class="tips">成交金额/成交订单数</p>-->
<!--          </el-card>-->
<!--          <el-card class="box-card">-->
<!--            <div class="text item">-->
<!--              <span>下单转化率</span>-->
<!--              <p style="float: right;">-->
<!--                {{ mainInfo.addOrderNum / (mainInfo.newUser + mainInfo.oldUser) | numFilter }}</p>-->
<!--            </div>-->
<!--            <p class="tips">下单人数/访问人数</p>-->
<!--          </el-card>-->
<!--          <el-card class="box-card">-->
<!--            <div class="text item">-->
<!--              <span>下单-支付转化率</span>-->
<!--              <p style="float: right;">{{ mainInfo.payOrderNum / mainInfo.addOrderNum | numFilter }}</p>-->
<!--            </div>-->
<!--            <p class="tips">支付人数/下单人数</p>-->
<!--          </el-card>-->
<!--          <el-card class="box-card">-->
<!--            <div class="text item">-->
<!--              <span>支付转化率</span>-->
<!--              <p style="float: right;">-->
<!--                {{ mainInfo.payOrderNum / (mainInfo.newUser + mainInfo.oldUser) | numFilter }}</p>-->
<!--            </div>-->
<!--            <p class="tips">支付人数/访问人数</p>-->
<!--          </el-card>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      totalStudents: 0, // 存储总学生数-->
<!--      totalOrders: 0, // 存储总学生数-->
<!--      todoFinish: 0, // 代办已完成数量-->
<!--      todoWait: 0, // 代办进行中数量-->
<!--      todoIng: 0, // 代办待接单数量-->
<!--      todoBack: 0, // 代办售后数量-->
<!--      schoolNum: 0, // 代办售后数量-->
<!--      agentNum: 0, // 代办售后数量-->
<!--      userNum: 0, // 代办售后数量-->
<!--      infoData: {}, // 用于存储卡片信息-->
<!--      activeName2: 'first', // 选中Tab-->
<!--      mainInfo: {}, // 主信息数据-->
<!--      userData: [], // 用户数据-->
<!--      newData: [], // 新用户数据-->
<!--      oldData: [], // 老用户数据-->
<!--      related_pop: false, // 控制弹出层-->
<!--      userTab: 'first' // 顾客Tab-->
<!--    };-->
<!--  },-->
<!--  mounted() {-->
<!--    this.fetchTotalStudents();-->
<!--    this.fetchSchoolInfo();-->
<!--    this.fetchAgentInfo();-->
<!--    this.fetchUserInfo();-->
<!--    this.fetchTodoTotal();-->
<!--    this.fetchTodoWait();-->
<!--    this.fetchTodoIng();-->
<!--    this.fetchTodoFinish();-->
<!--    this.fetchTodoBack();-->
<!--    this.getInfo();-->
<!--    this.getMainInfo(0);-->
<!--  },-->
<!--  methods: {-->
<!--    fetchTotalStudents() {-->
<!--      this.axios-->
<!--          .get('/imchat/student/page', {params: {page: 1}})-->
<!--          .then((response) => {-->
<!--            if (response.data.success) {-->
<!--              this.totalStudents = response.data.result.totalElements;-->
<!--            } else {-->
<!--              this.$message.error('无法获取总学生数');-->
<!--            }-->
<!--          })-->
<!--          .catch(() => {-->
<!--            this.$message.error('请求失败，请检查网络或联系管理员');-->
<!--          });-->
<!--    },-->
<!--    fetchUserInfo() {-->
<!--      this.axios-->
<!--          .get('/imchat/userInfo/page', {params: {page: 1}})-->
<!--          .then((response) => {-->
<!--            if (response.data.success) {-->
<!--              this.userNum = response.data.result.totalElements;-->
<!--            } else {-->
<!--              this.$message.error('无法获取总学生数');-->
<!--            }-->
<!--          })-->
<!--          .catch(() => {-->
<!--            this.$message.error('请求失败，请检查网络或联系管理员');-->
<!--          });-->
<!--    },-->
<!--    fetchSchoolInfo() {-->
<!--      this.axios-->
<!--          .get('/imchat/schoolInfo/page', {params: {page: 1}})-->
<!--          .then((response) => {-->
<!--            if (response.data.success) {-->
<!--              this.schoolNum = response.data.result.totalElements;-->
<!--            } else {-->
<!--              this.$message.error('无法获取总学生数');-->
<!--            }-->
<!--          })-->
<!--          .catch(() => {-->
<!--            this.$message.error('请求失败，请检查网络或联系管理员');-->
<!--          });-->
<!--    },-->
<!--    fetchAgentInfo() {-->
<!--      this.axios-->
<!--          .get('/imchat/agentsInfo/page', {params: {page: 1}})-->
<!--          .then((response) => {-->
<!--            if (response.data.success) {-->
<!--              this.agentNum = response.data.result.totalElements;-->
<!--            } else {-->
<!--              this.$message.error('无法获取总学生数');-->
<!--            }-->
<!--          })-->
<!--          .catch(() => {-->
<!--            this.$message.error('请求失败，请检查网络或联系管理员');-->
<!--          });-->
<!--    },-->
<!--    fetchTodoTotal() {-->
<!--      const params = {-->
<!--        page: 1  // 当前页数-->
<!--      };-->
<!--      this.axios-->
<!--          .post('/imchat/order/page', params)-->
<!--          .then((response) => {-->
<!--            if (response.data.success) {-->
<!--              this.totalOrders = response.data.result.totalElements;-->
<!--            } else {-->
<!--              this.$message.error('无法获取数据');-->
<!--            }-->
<!--          })-->
<!--          .catch(() => {-->
<!--            this.$message.error('请求失败，请检查网络或联系管理员');-->
<!--          });-->
<!--    },-->
<!--    fetchTodoWait() {-->
<!--      const params0 = {-->
<!--        page: 1,  // 当前页数-->
<!--        todoStatus: "1"  // 每页显示条数-->
<!--      };-->
<!--      this.axios-->
<!--          .post('/imchat/order/page', params0)-->
<!--          .then((response) => {-->
<!--            if (response.data.success) {-->
<!--              this.todoWait = response.data.result.totalElements;-->
<!--            } else {-->
<!--              this.$message.error('无法获取数据');-->
<!--            }-->
<!--          })-->
<!--          .catch(() => {-->
<!--            this.$message.error('请求失败，请检查网络或联系管理员');-->
<!--          });-->
<!--    },-->
<!--    fetchTodoIng() {-->
<!--      const params1 = {-->
<!--        page: 1,  // 当前页数-->
<!--        todoStatus: "2"  // 每页显示条数-->
<!--      };-->
<!--      this.axios-->
<!--          .post('/imchat/order/page', params1)-->
<!--          .then((response) => {-->
<!--            if (response.data.success) {-->
<!--              this.todoIng = response.data.result.totalElements;-->
<!--            } else {-->
<!--              this.$message.error('无法获取数据');-->
<!--            }-->
<!--          })-->
<!--          .catch(() => {-->
<!--            this.$message.error('请求失败，请检查网络或联系管理员');-->
<!--          });-->
<!--    },-->
<!--    fetchTodoFinish() {-->
<!--      const params2 = {-->
<!--        page: 1,  // 当前页数-->
<!--        todoStatus: "3"  // 每页显示条数-->
<!--      };-->
<!--      this.axios-->
<!--          .post('/imchat/order/page', params2)-->
<!--          .then((response) => {-->
<!--            if (response.data.success) {-->
<!--              this.todoFinish = response.data.result.totalElements;-->
<!--            } else {-->
<!--              this.$message.error('无法获取数据');-->
<!--            }-->
<!--          })-->
<!--          .catch(() => {-->
<!--            this.$message.error('请求失败，请检查网络或联系管理员');-->
<!--          });-->
<!--    },-->
<!--    fetchTodoBack() {-->
<!--      const params3 = {-->
<!--        page: 1,  // 当前页数-->
<!--        todoStatus: "6"  // 每页显示条数-->
<!--      };-->
<!--      this.axios-->
<!--          .post('/imchat/order/page', params3)-->
<!--          .then((response) => {-->
<!--            if (response.data.success) {-->
<!--              this.todoBack = response.data.result.totalElements;-->
<!--            } else {-->
<!--              this.$message.error('无法获取数据');-->
<!--            }-->
<!--          })-->
<!--          .catch(() => {-->
<!--            this.$message.error('请求失败，请检查网络或联系管理员');-->
<!--          });-->
<!--    },-->
<!--    getInfo() {-->
<!--      this.axios.get('/dashboard/info').then((response) => {-->
<!--        this.infoData = response.data.data;-->
<!--      });-->
<!--    },-->
<!--    getMainInfo(index) {-->
<!--      this.axios-->
<!--          .get('/index/main', {params: {pindex: index}})-->
<!--          .then((response) => {-->
<!--            this.mainInfo = response.data.data;-->
<!--            this.newData = response.data.data.newData;-->
<!--            this.oldData = response.data.data.oldData;-->
<!--            this.userData = this.newData;-->
<!--          });-->
<!--    },-->
<!--    userTabClick(tab) {-->
<!--      this.userData = tab.name === 'first' ? this.newData : this.oldData;-->
<!--    },-->
<!--    seeClick() {-->
<!--      console.log('查看详细');-->
<!--    },-->
<!--    handleClick(tab) {-->
<!--      this.related_pop = false;-->
<!--      this.userTab = 'first';-->
<!--      this.getMainInfo(tab.name === 'first' ? 0 : 1);-->
<!--    }-->
<!--  },-->
<!--  filters: {-->
<!--    numFilter(value) {-->
<!--      return Number(value).toFixed(2);-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--/* 整体布局样式 */-->
<!--.content-page {-->
<!--  padding: 20px;-->
<!--}-->

<!--.content-nav {-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--/* 卡片布局 */-->
<!--.header {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: stretch;-->
<!--  margin-bottom: 30px;-->
<!--}-->

<!--.box-card {-->
<!--  width: 32%;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  text-align: center;-->
<!--  padding: 20px;-->
<!--  min-height: 120px;-->
<!--  border-radius: 10px;-->
<!--  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);-->
<!--  transition: transform 0.2s ease;-->
<!--}-->

<!--.box-card:hover {-->
<!--  transform: translateY(-5px);-->
<!--}-->

<!--.card-content {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  align-items: center;-->
<!--}-->

<!--.number {-->
<!--  font-size: 2em;-->
<!--  font-weight: bold;-->
<!--}-->

<!--.large-number {-->
<!--  font-size: 3em;-->
<!--  font-weight: bold;-->
<!--  margin-left: 10px;-->
<!--}-->

<!--.text {-->
<!--  font-size: 1.2em;-->
<!--}-->

<!--/* 卡片颜色 */-->
<!--.card-red {-->
<!--  background-color: #ff4d4f;-->
<!--  color: #fff;-->
<!--}-->

<!--.card-green {-->
<!--  background-color: #52c41a;-->
<!--  color: #fff;-->
<!--}-->
<!--.card-red {-->
<!--  background-color: #FF5733;-->
<!--  color: #fff;-->
<!--}-->

<!--.card-blue {-->
<!--  background-color: #1AB6C4FF;-->
<!--  color: #fff;-->
<!--}-->

<!--.card-purple {-->
<!--  background-color: #6F42C1;-->
<!--  color: #fff;-->
<!--}-->

<!--.card-yellow {-->
<!--  background-color: #E8BE17FF;-->
<!--  color: #fff;-->
<!--}-->
<!--.card-gray {-->
<!--  background-color: #6C757D;-->
<!--  color: #fff;-->
<!--}-->

<!--.card-pink {-->
<!--  background-color: #D63384;-->
<!--  color: #fff;-->
<!--}-->

<!--.card-black {-->
<!--  background-color: #1f2037;-->
<!--  color: #fff;-->
<!--}-->

<!--/* 其他样式 */-->
<!--.box-card2 {-->
<!--  width: 32%;-->
<!--  float: left;-->
<!--  margin-right: 17px;-->
<!--  padding: 15px;-->
<!--}-->

<!--.box-card2:last-child {-->
<!--  margin-right: 0;-->
<!--}-->

<!--.tab-content {-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.block-4 {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--}-->

<!--.tips {-->
<!--  color: #8c939d;-->
<!--  font-size: 13px;-->
<!--}-->

<!--.float-right {-->
<!--  float: right;-->
<!--}-->
<!--</style>-->
<template>
  <div class="login">
    <div class="login-box">
      <div class="welcome-message">
        欢迎来到战盟及时通讯后台<br>
        一起探索宇宙的奥妙
          </div>
        </div>
      </div>
</template>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.welcome-message {
  font-size: 50px; /* 设置字体大小 */
  font-weight: bold; /* 字体加粗 */
  margin-bottom: 10px; /* 底部留空 */
  margin-top: 10px;
}
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 设置高度为视口高度 */
  width: 85vw; /* 设置宽度为视口宽度 */
  background: url("https://project2024-1304457300.cos.ap-guangzhou.myqcloud.com/taikong.jpg") no-repeat center center;
  background-size: cover; /* 背景图片保持比例覆盖整个页面 */
  font-family: Lato, Helvetica, sans-serif;
  text-align: center;
}

.login-box {
  width: 700px;
  background: rgba(128, 124, 189, 0.83);
  border-radius: 200px;
  box-shadow: 10px 2px 12px #151515;
  padding: 30px; /* 添加内边距，使文字和内容不紧贴边缘 */
  text-align: center; /* 文字居中 */
  color: #f10e0e; /* 字体颜色为白色 */
  left: 10px;
  background-color: #fff;
  margin-top: 10px;
}

.login-box .logo {
  height: 100px;
  padding-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-box .logo img {
  width: 80px;
  height: 80px;
}

.login-box .body {
  padding: 10px 30px 30px 30px;
}

.login-box .body .tips {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 30px;
}

.login-box .body .author {
  display: block;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #656565;
  margin-bottom: 10px;
  text-decoration: none;
}

.login-box .body .author a {
  text-decoration: none;
}
</style>

<script>
import BackgroundVideo from "@/components/BackgroundVideo";
export default {
  components: {BackgroundVideo}
}
</script>