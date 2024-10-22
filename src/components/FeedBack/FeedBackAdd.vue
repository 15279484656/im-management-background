<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/feedback')">意见反馈列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑反馈' : '新增反馈' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="feedback-form" :rules="rules" ref="form">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="反馈内容" prop="msg">
          <el-input type="textarea" v-model="form.msg" placeholder="请输入反馈内容" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="1">已读</el-radio>
            <el-radio label="0">未读</el-radio>
          </el-radio-group>
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
        title: '',
        msg: '',
        status: '0'
      },
      isEdit: false,
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
        ],
        msg: [
          { required: true, message: '反馈内容不能为空', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    fetchFeedbackData(id) {
      this.axios.get('/newspace/feedBack/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          Object.assign(this.form, response.data.result);
        } else {
          this.$message.error('无法获取反馈信息，请检查网络或联系管理员。');
        }
      }).catch(() => {
        this.$message.error('无法获取反馈信息，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/feedBack';
          this.axios({
            method,
            url,
            data: this.form
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '反馈信息更新成功!' : '新增反馈成功!');
              this.$router.push('/dashboard/feedback');
            } else {
              this.$message.error('提交失败，请检查输入或联系管理员。');
            }
          }).catch(() => {
            this.$message.error('提交失败，请检查网络或联系管理员。');
          });
        } else {
          this.$message.error('请完善表单信息');
        }
      });
    },
    onCancel() {
      this.$router.push('/dashboard/feedBack');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchFeedbackData(id);
    }
  }
};
</script>

<style scoped>
.feedback-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
