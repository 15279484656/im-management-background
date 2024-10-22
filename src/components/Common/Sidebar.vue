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
            <span>用户与群组管理</span>
          </template>
          <el-menu-item index="/dashboard/userInfo">
            <i class="fa fa-userInfo"></i>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/roomInfo">
            <i class="fa fa-roomInfo"></i>
            <span>群组管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/userFriendRelationship">
            <i class="fa fa-userFriendRelationship"></i>
            <span>好友关系管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/userRoomInfo">
            <i class="fa fa-userRoomInfo"></i>
            <span>用户群组关系管理</span>
          </el-menu-item>
        </el-submenu>
        <!-- 聊天记录管理 -->
        <el-submenu index="chatLogManager">
          <template slot="title">
            <i class="fa fa-chatlog"></i>
            <span>聊天记录管理</span>
          </template>
          <el-menu-item index="/dashboard/singleChatLog">
            <i class="fa fa-singleChatLog"></i>
            <span>单聊聊天记录</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/roomChatLog">
            <i class="fa fa-roomChatLog"></i>
            <span>群聊聊天记录</span>
          </el-menu-item>
        </el-submenu>

        <!-- 敏感词管理模块 -->
        <el-submenu index="sensitiveManagement">
          <template slot="title">
            <i class="fa fa-shopping-cart"></i>
            <span>敏感词管理</span>
          </template>
          <el-menu-item index="/dashboard/sensitiveWords">
            <i class="fa fa-sensitiveWords"></i>
            <span>敏感词管理</span>
          </el-menu-item>
        </el-submenu>

        <!-- 充值管理 -->
        <el-submenu index="chargeManager">
          <template slot="title">
            <i class="fa fa-comments"></i>
            <span>充值管理</span>
          </template>
          <el-menu-item index="/dashboard/rechargeInfo">
            <i class="fa fa-rechargeInfo"></i>
            <span>充值管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/currencyInfo">
            <i class="fa fa-currencyInfo"></i>
            <span>货币管理</span>
          </el-menu-item>
        </el-submenu>

        <!-- 系统日志模块 -->
        <el-submenu index="sysLog">
          <template slot="title">
            <i class="fa fa-file-alt"></i>
            <span>系统日志管理</span>
          </template>
          <el-menu-item index="/dashboard/loginLog">
            <i class="fa fa-loginLog"></i>
            <span>登录日志管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/mailInfo">
            <i class="fa fa-mailInfo"></i>
            <span>站内信日志管理</span>
          </el-menu-item>
        </el-submenu>
        <!-- 系统配置管理 -->
        <el-submenu index="sysConfigManager">
          <template slot="title">
            <i class="fa fa-cogs"></i>
            <span>系统配置管理</span>
          </template>
          <el-menu-item index="/dashboard/configInfo">
            <i class="fa fa-configInfo"></i>
            <span>系统配置管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/websiteInfo">
            <i class="fa fa-sys-websiteInfo"></i>
            <span>网站站点管理</span>
          </el-menu-item>
        </el-submenu>
        <!-- 其他模块管理-->
        <el-submenu index="sysConfigManager">
          <template slot="title">
            <i class="fa fa-cogs"></i>
            <span>其他模块管理</span>
          </template>
          <el-menu-item index="/dashboard/upload">
            <i class="fa fa-upload"></i>
            <span>上传管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/customizeUserImg">
            <i class="fa fa-customizeUserImg"></i>
            <span>表情管理</span>
          </el-menu-item>
          <el-menu-item index="/dashboard/languageInfo">
            <i class="fa fa-languageInfo"></i>
            <span>语言管理</span>
          </el-menu-item>
        </el-submenu>
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
