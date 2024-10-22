<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/studentManual')">学生手册列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑手册' : '新增手册' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="student-manual-form" :rules="rules" ref="form">
        <el-form-item label="手册名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入手册名称"></el-input>
        </el-form-item>
        <el-form-item label="手册内容" prop="manual">
          <el-input v-model="form.manual" placeholder="请输入手册内容" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="版本" prop="version">
          <el-input v-model="form.version" placeholder="请输入版本"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
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
        manual: '',
        version: '',
        remark: ''
      },
      isEdit: false,
      rules: {
        title: [
          { required: true, message: '手册名称不能为空', trigger: 'blur' },
        ],
        manual: [
          { required: true, message: '手册内容不能为空', trigger: 'blur' },
        ],
        version: [
          { required: true, message: '版本不能为空', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    fetchManualData(id) {
      this.axios.get('/newspace/studentManual/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          Object.assign(this.form, response.data.result);
        } else {
          this.$message.error('无法获取手册信息，请检查网络或联系管理员。');
        }
      }).catch(() => {
        this.$message.error('无法获取手册信息，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 移除 createTime 和 updateTime 字段
          const { createTime, updateTime, ...formDataToSend } = this.form;

          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/studentManual';

          this.axios({
            method,
            url,
            data: formDataToSend
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '手册信息更新成功!' : '新增手册成功!');
              this.$router.push('/dashboard/studentManual');
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
      this.$router.push('/dashboard/studentManual');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchManualData(id);
    }
  }
};
</script>

<style scoped>
.student-manual-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
