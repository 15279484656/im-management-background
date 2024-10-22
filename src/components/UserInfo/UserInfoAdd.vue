<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/userInfo')">用户列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑用户' : '新增用户' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="user-form" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="邮件" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮件"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phoneNum">
          <el-input v-model="form.phoneNum" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="picture">
          <el-input v-model="form.picture" placeholder="请输入头像链接"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{ isEdit ? '保存修改' : '提交' }}</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userName: '',
        nickName: '',
        openId: '',
        password: '',
        salt: '',
        email: '',
        phoneNum: '',
        picture: '',
        sex: '1',
        idCard: ''
      },
      isEdit: false,
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    fetchUserData(id) {
      this.axios.get('/imchat/userInfo/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取用户信息失败');
        }
      }).catch(() => {
        this.$message.error('获取用户信息失败，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            const { createTime, updateTime, ...formDataToSend } = this.form;
            this.axios.put('/imchat/userInfo', formDataToSend)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('用户信息更新成功');
                    this.$router.push('/dashboard/userInfo');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/userInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('用户添加成功');
                    this.$router.push('/dashboard/userInfo');
                  } else {
                    this.$message.error('添加失败');
                  }
                }).catch(() => {
              this.$message.error('添加失败，请检查网络或联系管理员。');
            });
          }
        }
      });
    },
    onCancel() {
      this.$router.push('/dashboard/userInfo');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchUserData(id);
    }
  }
};
</script>

<style scoped>
.user-form {
  max-width: 600px;
  margin: 20px auto;
}
</style>
