<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/customizeUserImg')">自定义表情列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑自定义表情' : '新增自定义表情' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="customize-form" :rules="rules" ref="form">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="文件ID" prop="fileId">
          <el-input v-model="form.fileId" placeholder="请输入文件ID"></el-input>
        </el-form-item>
        <el-form-item label="文件路径" prop="filePath">
          <el-input v-model="form.filePath" placeholder="请输入文件路径"></el-input>
        </el-form-item>
        <el-form-item label="来源" prop="sourceType">
          <el-input v-model="form.sourceType" placeholder="请输入来源类型"></el-input>
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
        userId: '',
        fileId: '',
        filePath: '',
        sourceType: ''
      },
      isEdit: false,
      rules: {
        userId: [
          { required: true, message: '用户ID不能为空', trigger: 'blur' },
        ],
        fileId: [
          { required: true, message: '文件ID不能为空', trigger: 'blur' },
        ],
        filePath: [
          { required: true, message: '文件路径不能为空', trigger: 'blur' },
        ],
        sourceType: [
          { required: true, message: '来源不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    fetchCustomizeData(id) {
      this.axios.get('/imchat/customizeUserImg/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取自定义表情信息失败');
        }
      }).catch(() => {
        this.$message.error('获取自定义表情信息失败，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.axios.put('/imchat/customizeUserImg', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('自定义表情更新成功');
                    this.$router.push('/dashboard/customizeUserImg');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/customizeUserImg', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('自定义表情添加成功');
                    this.$router.push('/dashboard/customizeUserImg');
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
      this.$router.push('/dashboard/customizeUserImg');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchCustomizeData(id);
    }
  },
};
</script>

<style scoped>
.customize-form {
  max-width: 600px;
  margin: 20px auto;
}
</style>
