<template>
  <div class="left-box">
    <div class="logo">
      <img src="static/images/loading.gif"/>
    </div>
    <div class="a" style="overflow-x: hidden; overflow-y: auto; height: 100%">
      <el-menu
          class="sidebar"
          :unique-opened="true"
          :default-active="currentPagePath"
          @open="handleOpen"
          :router="true"
          @close="handleClose"
      >
        <!--        <el-menu>-->
        <!-- 仪表盘 -->
        <el-menu-item index="/dashboard/welcome">
          <i class="fa fa-tachometer"></i>
          <span>后台主页</span>
        </el-menu-item>

        <!-- 用户管理 -->
        <el-submenu index="userManagement">
          <template slot="title">
            <i class="fa fa-users"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/dashboard/userInfo">
            <i class="fa fa-userInfo"></i>
            <span>用户列表</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/student">
            <i class="fa fa-graduation-cap"></i>
            <span>学生管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/studentManual">
            <i class="fa fa-book"></i>
            <span>学生手册管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/agent">
            <i class="fa fa-id-card"></i>
            <span>代理商信息</span>
          </el-menu-item>
        </el-submenu>

        <!-- 学校管理 -->
        <el-submenu index="schoolManagement">
          <template slot="title">
            <i class="fa fa-university"></i>
            <span>学校管理</span>
          </template>
          <el-menu-item index="/dashboard/school">
            <i class="fa fa-school"></i>
            <span>学校列表</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/departmentInfo">
            <i class="fa fa-building"></i>
            <span>院系信息管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/schoolNews">
            <i class="fa fa-newspaper"></i>
            <span>校园资讯</span>
          </el-menu-item>
        </el-submenu>

        <!-- 社群管理 -->
        <el-submenu index="communityManagement">
          <template slot="title">
            <i class="fa fa-users"></i>
            <span>社群管理</span>
          </template>
          <el-menu-item index="/dashboard/communityInfo">
            <i class="fa fa-info-circle"></i>
            <span>社群信息</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/activity">
            <i class="fa fa-calendar-alt"></i>
            <span>社群活动</span>
          </el-menu-item>
        </el-submenu>

        <!-- 任务与提醒 -->
        <el-submenu index="tasksReminders">
          <template slot="title">
            <i class="fa fa-tasks"></i>
            <span>代办与私信</span>
          </template>
          <el-menu-item index="/dashboard/todo">
            <i class="fa fa-tasks"></i>
            <span>代办管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/stationMessage">
            <i class="fa fa-envelope"></i>
            <span>站内信管理</span>
          </el-menu-item>
        </el-submenu>

        <!-- 内容管理 -->
        <el-submenu index="contentManagement">
          <template slot="title">
            <i class="fa fa-file-alt"></i>
            <span>内容管理</span>
          </template>
          <el-menu-item index="/dashboard/adRotation">
            <i class="fa fa-images"></i>
            <span>广告轮播图</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/confessionWall">
            <i class="fa fa-heart"></i>
            <span>表白墙管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/regionInfo">
            <i class="fa fa-region"></i>
            <span>地域信息管理</span>
          </el-menu-item>
        </el-submenu>

        <!-- 订单与支付管理 -->
        <el-submenu index="orderPaymentManagement">
          <template slot="title">
            <i class="fa fa-shopping-cart"></i>
            <span>订单与支付管理</span>
          </template>
          <el-menu-item index="/dashboard/order">
            <i class="fa fa-list"></i>
            <span>订单列表</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/orderChat">
            <i class="fa fa-comments"></i>
            <span>订单聊天管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/purseInfo">
            <i class="fa fa-purse"></i>
            <span>钱包管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/consumptionBill">
            <i class="fa fa-receipt"></i>
            <span>消费管理</span>
          </el-menu-item>
        </el-submenu>

        <!-- 反馈与支持 -->
        <el-submenu index="feedbackSupport">
          <template slot="title">
            <i class="fa fa-comments"></i>
            <span>反馈与支持</span>
          </template>
          <el-menu-item index="/dashboard/feedBack">
            <i class="fa fa-comment-dots"></i>
            <span>意见反馈管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/questionInfo">
            <i class="fa fa-question-circle"></i>
            <span>问题管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/answerInfo">
            <i class="fa fa-check-circle"></i>
            <span>答案管理</span>
          </el-menu-item>
        </el-submenu>
        <!-- 店铺设置 -->
        <el-submenu index="shopSettings">
          <template slot="title">
            <i class="fa fa-cogs"></i>
            <span>设置</span>
          </template>
          <el-menu-item index="/dashboard/settings/showset">
            <i class="fa fa-eye"></i>
            <span>显示设置</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/admin">
            <i class="fa fa-user-shield"></i>
            <span>管理员</span>
          </el-menu-item>
        </el-submenu>
        <!--        </el-menu>-->

        <el-menu-item @click="logout">
          <i class="fa fa-large fa-sign-out"></i>
          <span>退出</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPagePath: "/dashboard",
      loginInfo: null,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$confirm("是否要退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        localStorage.clear();
        this.$router.replace({name: "login"});
      });
    },
    checkLogin() {
      this.axios.get("index/checkLogin").then((response) => {
        console.log(response.data);
        if (response.data.errno === 401) {
          localStorage.clear();
          this.$router.replace({name: "login"});
        }
      });
    },
  },
  mounted() {
    console.log(this.$route.path);
    this.checkLogin();
    if (!this.loginInfo) {
      this.loginInfo = JSON.parse(
          window.localStorage.getItem("userInfo") || null
      );
    }
  },
};
</script>
<style>
.left-box {
  width: 200px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  height: 100%;
  float: left;
  flex-direction: column;
  background: #fff;
}

.left-box .sidebar {
  width: 200px;
  flex: 1;
  border-radius: 0;
  /*background: #233445;*/
}

.left-box .fa {
  margin-right: 10px;
  font-size: 18px;
  /*color: #ccc;*/
}

.left-box span {
  /*color: #ccc;*/
}

.left-box .el-submenu .el-menu-item .fa {
  margin-right: 10px;
  font-size: 10px;
}

/*渐变背景*/
.back {
  background: -webkit-linear-gradient(138deg, #8731e8 0%, #4528dc 100%);
  background: -o-linear-gradient(138deg, #8731e8 0%, #4528dc 100%);
  background: linear-gradient(-48deg, #8731e8 0%, #4528dc 100%);
  opacity: 0.7;
}

.left-box .logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  width: 200px;
  border-right: solid 1px #e6e6e6;
  /*box-shadow: 0 1px 1px rgba(0, 0, 0, .5);*/
}

.left-box .logo img {
  height: 60px;
}
</style>
