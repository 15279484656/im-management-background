<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/confessionWall')">表白墙列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑表白' : '新增表白' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="confession-wall-form" :rules="rules" ref="form">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" placeholder="请输入内容" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="picUrl">
          <el-input v-model="form.picUrl" placeholder="请输入图片URL"></el-input>
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
        picUrl: ''
      },
      isEdit: false,
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
        ],
        picUrl: [
          { required: false }
        ]
      }
    };
  },
  methods: {
    fetchConfessionData(id) {
      this.axios.get('/newspace/confessionWall/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          Object.assign(this.form, response.data.result);
        } else {
          this.$message.error('无法获取表白信息，请检查网络或联系管理员。');
        }
      }).catch(() => {
        this.$message.error('无法获取表白信息，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/confessionWall';
          this.axios({
            method,
            url,
            data: this.form
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '表白更新成功!' : '新增表白成功!');
              this.$router.push('/dashboard/confessionWall');
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
      this.$router.push('/dashboard/confessionWall');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchConfessionData(id);
    }
  }
};
</script>

<style scoped>
.confession-wall-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
