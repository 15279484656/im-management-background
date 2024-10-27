<template>
  <BackgroundVideo>
    <div class="content-page">
      <div class="content-container">
        <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/loginLog')">登录日志列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑登录日志' : '新增登录日志' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="login-log-form" :rules="rules" ref="form">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="form.createTime" placeholder="自动生成，无需填写" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{ isEdit ? '保存修改' : '提交' }}</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </BackgroundVideo>
</template>

<script>
import BackgroundVideo from '@/components/BackgroundVideo.vue'
export default {
  components: {
    BackgroundVideo,
  },
  data() {
    return {
      form: {
        userId: '',
        createTime: '', // 自动生成的时间
      },
      isEdit: false,
      rules: {
        userId: [
          { required: true, message: '用户ID不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    fetchLogData(id) {
      this.axios.get('/imchat/loginLog/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取登录日志信息失败');
        }
      }).catch(() => {
        this.$message.error('获取登录日志信息失败，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.axios.put('/imchat/loginLog', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('登录日志更新成功');
                    this.$router.push('/dashboard/loginLog');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/loginLog', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('登录日志添加成功');
                    this.$router.push('/dashboard/loginLog');
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
      this.$router.push('/dashboard/loginLog');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchLogData(id);
    }
  },
};
</script>

<style scoped>
.login-log-form {
  max-width: 600px;
  margin: 20px auto;
}
</style>
