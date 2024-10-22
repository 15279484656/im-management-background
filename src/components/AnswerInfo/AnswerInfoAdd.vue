<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/answer')">答案列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑答案' : '新增答案' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="answer-form" :rules="rules" ref="form">
        <el-form-item label="问题ID" prop="questionId">
          <el-input v-model="form.questionId" placeholder="请输入问题ID" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="回答人ID" prop="createId">
          <el-input v-model="form.createId" placeholder="请输入回答人ID"></el-input>
        </el-form-item>
        <el-form-item label="回答内容" prop="content">
          <el-input type="textarea" v-model="form.content" placeholder="请输入回答内容" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="是否采纳" prop="isAccept">
          <el-radio-group v-model="form.isAccept">
            <el-radio label="0">未采纳</el-radio>
            <el-radio label="1">已采纳</el-radio>
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
        questionId: '',
        createId: '',
        content: '',
        isAccept: '0'
      },
      isEdit: false,
      rules: {
        questionId: [
          { required: true, message: '问题ID不能为空', trigger: 'blur' },
        ],
        createId: [
          { required: true, message: '回答人ID不能为空', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '回答内容不能为空', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    fetchAnswerData(id) {
      this.axios.get('/newspace/answerInfo/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          Object.assign(this.form, response.data.result);
        } else {
          this.$message.error('无法获取答案信息，请检查网络或联系管理员。');
        }
      }).catch(() => {
        this.$message.error('无法获取答案信息，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/answerInfo';
          this.axios({
            method,
            url,
            data: this.form
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '答案信息更新成功!' : '新增答案成功!');
              this.$router.push('/dashboard/answerInfo');
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
      this.$router.push('/dashboard/answerInfo');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchAnswerData(id);
    }
  }
};
</script>

<style scoped>
.answer-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
