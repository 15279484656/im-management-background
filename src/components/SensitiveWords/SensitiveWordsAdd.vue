<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/sensitiveWords')">敏感词列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑敏感词' : '新增敏感词' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="sensitive-words-form" :rules="rules" ref="form">
        <el-form-item label="敏感词" prop="word">
          <el-input v-model="form.word" placeholder="请输入敏感词"></el-input>
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
        word: ''
      },
      isEdit: false,
      rules: {
        word: [
          { required: true, message: '敏感词不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    fetchSensitiveWordData(id) {
      this.axios.get('/imchat/sensitiveWords/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取敏感词信息失败');
        }
      }).catch(() => {
        this.$message.error('获取敏感词信息失败，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.axios.put('/imchat/sensitiveWords', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('敏感词更新成功');
                    this.$router.push('/dashboard/sensitiveWords');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/sensitiveWords', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('敏感词添加成功');
                    this.$router.push('/dashboard/sensitiveWords');
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
      this.$router.push('/dashboard/sensitiveWords');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchSensitiveWordData(id);
    }
  },
};
</script>

<style scoped>
.sensitive-words-form {
  max-width: 600px;
  margin: 20px auto;
}
</style>
