<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/languageInfo')">语言信息列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑语言信息' : '新增语言信息' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="language-form" :rules="rules" ref="form">
        <el-form-item label="语言代码" prop="languageCode">
          <el-input v-model="form.languageCode" placeholder="请输入语言代码"></el-input>
        </el-form-item>
        <el-form-item label="位置" prop="languageRegion">
          <el-input v-model="form.languageRegion" placeholder="请输入位置"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="languageContext">
          <el-input v-model="form.languageContext" placeholder="请输入内容"></el-input>
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
        languageCode: '',
        languageRegion: '',
        languageContext: ''
      },
      isEdit: false,
      rules: {
        languageCode: [
          { required: true, message: '语言代码不能为空', trigger: 'blur' },
        ],
        languageRegion: [
          { required: true, message: '位置不能为空', trigger: 'blur' },
        ],
        languageContext: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    fetchLanguageData(id) {
      this.axios.get('/imchat/languageInfo/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取语言信息失败');
        }
      }).catch(() => {
        this.$message.error('获取语言信息失败，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.axios.put('/imchat/languageInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('语言信息更新成功');
                    this.$router.push('/dashboard/languageInfo');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/languageInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('语言信息添加成功');
                    this.$router.push('/dashboard/languageInfo');
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
      this.$router.push('/dashboard/languageInfo');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchLanguageData(id);
    }
  },
};
</script>

<style scoped>
.language-form {
  max-width: 600px;
  margin: 20px auto;
}
</style>
