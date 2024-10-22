<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/question')">问题列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑问题' : '新增问题' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="question-form" :rules="rules" ref="form">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="问题内容" prop="content">
          <el-input type="textarea" v-model="form.content" placeholder="请输入问题内容" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="问题状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="0">已发布</el-radio>
            <el-radio label="9">已结题</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="问题类型" prop="questionType">
          <el-radio-group v-model="form.questionType">
            <el-radio label="0">编程问题</el-radio>
            <el-radio label="1">生活问题</el-radio>
            <el-radio label="9">其他问题</el-radio>
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
        content: '',
        status: '0',
        questionType: '9'
      },
      isEdit: false,
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '问题内容不能为空', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    fetchQuestionData(id) {
      this.axios.get('/newspace/questionInfo/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          Object.assign(this.form, response.data.result);
        } else {
          this.$message.error('无法获取问题信息，请检查网络或联系管理员。');
        }
      }).catch(() => {
        this.$message.error('无法获取问题信息，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/questionInfo';
          this.axios({
            method,
            url,
            data: this.form
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '问题信息更新成功!' : '新增问题成功!');
              this.$router.push('/dashboard/questionInfo');
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
      this.$router.push('/dashboard/questionInfo');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchQuestionData(id);
    }
  }
};
</script>

<style scoped>
.question-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
