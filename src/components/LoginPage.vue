<template>
  <div class="login">
    <div class="login-box">
      <div class="logo">
        <img src="static/images/logo.jpg"/>
      </div>
      <div class="body">
        <p class="tips">官方工作人员入口</p>
        <el-form ref="form" :model="form" :rules="rules" label-position="top">
          <el-form-item label="" prop="userName">
            <el-input v-model="form.userName" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
                type="password"
                v-model="form.password"
                placeholder="密码"
                @keyup.enter.native="startLogin"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                @click="startLogin"
                :loading="loading"
                style="width: 100%"
            >
              {{ loading ? "登录中..." : "登录" }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/config/api";

export default {
  data() {
    return {
      root: "",
      form: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          {required: true, message: "请输入用户名", trigger: "blur"},
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 3, message: "密码不得低于3个字符", trigger: "blur"},
        ],
      },
      loading: false,
    };
  },
  components: {},
  methods: {
    startLogin() {
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          return false;
        }
        this.loading = true;
        let root = this.root;
        this.axios
            .get(root + "/imchat/userInfo/login", {
              params: {
                userName: this.form.userName,
                password: this.form.password,
              }
            })
            .then((res) => {
              let call = res.data;
              console.log("res.data:", call);
              this.loading = false;
              if (res.data.code === 200) {
                console.log(res.data.result);
                localStorage.setItem("token", res.data.result.token);
                localStorage.setItem("userId", res.data.result.id);

                // localStorage.setItem(
                //     "userInfo",
                //     JSON.stringify(res.data.userInfo)
                // );
                console.log(JSON.stringify(res.data.result));
                console.log(JSON.stringify(res.data.timestamp));
                this.$router.push({name: "welcome"});
                let sUserAgent = navigator.userAgent;
                // todo 手机端
                let mobileAgents = [
                  "Android",
                  "iPhone",
                  "Symbian",
                  "WindowsPhone",
                  "iPod",
                  "BlackBerry",
                  "Windows CE",
                ];
                let goUrl = 0;
                for (var i = 0; i < mobileAgents.length; i++) {
                  if (sUserAgent.indexOf(mobileAgents[i]) > -1) {
                    goUrl = 1;
                    break;
                  }
                }
                console.log(goUrl);
                if (goUrl == 1) {
                  this.$router.push({name: "wap"});
                }
              } else {
                this.$message({
                  type: "error",
                  message: call.errmsg,
                });
                return false;
              }
            })
            .catch((err) => {
              this.loading = false;
            });
      });
    },
  },
  mounted() {
    this.root = api.rootUrl;
  },
};
</script>
<style>
.login{
  align-items: center;
  /*background: url("https://gd-hbimg.huaban.com/19fa5356ea7caae2256c4a0ca33d442bcc663dd25b5111-J2Z1ns_fw658webp");*/
  background: url("https://project2024-1304457300.cos.ap-guangzhou.myqcloud.com/taikong.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  display: flex;
  font-family: Lato, Helvetica, sans-serif;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 100%;
  color: #656565;
}

.login-box {
  width: 320px;
  background: rgba(32, 160, 255, 0.58);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 12px #ccc;
  margin-top: 180px; /* 调整该值控制整体向下移动的距离 */
}

.login-box .logo {
  height: 100px;
  padding-top: 30px;
  background: rgba(32, 160, 255, 0.58);
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
  color: #fafafa;
  background: rgba(32, 160, 255, 0.58);
}

.login-box .body .tips {
  font-size: 26px;
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
