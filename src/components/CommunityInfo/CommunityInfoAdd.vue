<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/community')">社群列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑社群' : '新增社群' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="community-form" :rules="rules" ref="form">
        <el-form-item label="社群名称" prop="communityName">
          <el-input v-model="form.communityName" placeholder="请输入社群名称"></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="intro">
          <el-input v-model="form.intro" placeholder="请输入介绍"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactPerson">
          <el-input v-model="form.contactPerson" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="picture">
          <el-input v-model="form.picture" placeholder="请输入图片链接"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNum">
          <el-input v-model="form.phoneNum" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="学校ID" prop="schoolId">
          <el-input v-model="form.schoolId" placeholder="请输入学校ID"></el-input>
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
        communityName: '',
        intro: '',
        contactPerson: '',
        picture: '',
        phoneNum: '',
        schoolId: ''
      },
      isEdit: false,
      rules: {
        communityName: [
          { required: true, message: '社群名称不能为空', trigger: 'blur' },
        ],
        intro: [
          { required: false },
        ],
        contactPerson: [
          { required: true, message: '联系人不能为空', trigger: 'blur' },
        ],
        picture: [
          { required: false },
        ],
        phoneNum: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
        ],
        schoolId: [
          { required: true, message: '学校ID不能为空', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    handleError(message) {
      this.$message.error(message);
    },
    fetchCommunityData(id) {
      this.axios.get('/newspace/communityInfo/getById', {
        params: { id: id },
        headers: { 'accept': '*/*' }
      }).then(response => {
        if (response.data.success) {
          Object.assign(this.form, response.data.result);
        } else {
          this.handleError('无法获取社群数据，请检查网络或联系管理员。');
        }
      }).catch(() => {
        this.handleError('无法获取社群数据，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/communityInfo';

          this.axios({
            method: method,
            url: url,
            data: this.form
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '社群信息更新成功!' : '新增社群成功!');
              this.$router.push('/dashboard/community');
            } else {
              this.$message.error(this.isEdit ? '更新失败，请检查输入或联系管理员。' : '新增失败，请检查输入或联系管理员。');
            }
          }).catch(() => {
            this.$message.error(this.isEdit ? '更新失败，请检查网络或联系管理员。' : '新增失败，请检查网络或联系管理员。');
          });
        } else {
          this.$message.error('请完善表单信息');
          return false;
        }
      });
    },
    onCancel() {
      this.$router.push('/dashboard/community');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchCommunityData(id);
    }
  }
};
</script>

<style scoped>
.community-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
