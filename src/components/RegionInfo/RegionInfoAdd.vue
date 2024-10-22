<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/regionInfo')">地域信息列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑地域信息' : '新增地域信息' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="region-info-form" :rules="rules" ref="form">
        <el-form-item label="区域Code" prop="regionCode">
          <el-input v-model="form.regionCode" placeholder="请输入区域Code"></el-input>
        </el-form-item>
        <el-form-item label="区域名称" prop="regionName">
          <el-input v-model="form.regionName" placeholder="请输入区域名称"></el-input>
        </el-form-item>
        <el-form-item label="父ID" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入父ID"></el-input>
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
        regionCode: '',
        regionName: '',
        parentId: ''
      },
      isEdit: false,
      rules: {
        regionCode: [
          { required: true, message: '区域Code不能为空', trigger: 'blur' },
        ],
        regionName: [
          { required: true, message: '区域名称不能为空', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    fetchRegionInfoData(id) {
      this.axios.get('/newspace/regionInfo/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          Object.assign(this.form, response.data.result);
        } else {
          this.$message.error('无法获取地域信息，请检查网络或联系管理员。');
        }
      }).catch(() => {
        this.$message.error('无法获取地域信息，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/regionInfo';
          this.axios({
            method,
            url,
            data: this.form
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '地域信息更新成功!' : '新增地域信息成功!');
              this.$router.push('/dashboard/regionInfo');
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
      this.$router.push('/dashboard/regionInfo');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchRegionInfoData(id);
    }
  }
};
</script>

<style scoped>
.region-info-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
