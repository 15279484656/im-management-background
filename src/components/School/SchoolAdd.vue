<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/school')">学校列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑学校' : '新增学校' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="school-form" :rules="rules" ref="form">
        <el-form-item label="学校名称" prop="schoolName">
          <el-input v-model="form.schoolName" placeholder="请输入学校名称"></el-input>
        </el-form-item>
        <el-form-item label="学校代码" prop="schoolCode">
          <el-input v-model="form.schoolCode" placeholder="请输入学校代码"></el-input>
        </el-form-item>
        <el-form-item label="代理商ID" prop="agentId">
          <el-input v-model="form.agentId" placeholder="请输入代理商ID"></el-input>
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="区域ID" prop="regionId">
          <el-input v-model="form.regionId" placeholder="请输入区域ID"></el-input>
        </el-form-item>
        <el-form-item label="区域名称" prop="regionName">
          <el-input v-model="form.regionName" placeholder="请输入区域名称"></el-input>
        </el-form-item>
        <el-form-item label="学校图片" prop="schoolPicture">
          <el-input v-model="form.schoolPicture" placeholder="请输入学校图片URL"></el-input>
        </el-form-item>
        <el-form-item label="学校简介">
          <el-input v-model="form.schoolDesc" placeholder="请输入学校简介"></el-input>
        </el-form-item>
        <el-form-item label="备注">
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
        schoolName: '',
        schoolCode: '',
        regionId: '',
        regionName: '',
        userName: '',
        agentId: '',
        userId: '',
        schoolPicture: '',
        remark: '',
        schoolDesc: '',
      },
      isEdit: false,
      rules: {
        schoolName: [
          { required: true, message: '学校名称不能为空', trigger: 'blur' },
        ],
        schoolCode: [
          { required: true, message: '学校代码不能为空', trigger: 'blur' },
        ],
        agentId: [
          { required: true, message: '代理商ID不能为空', trigger: 'blur' },
        ],
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        userId: [
          { required: true, message: '用户ID不能为空', trigger: 'blur' },
        ],
        regionId: [
          { required: true, message: '区域ID不能为空', trigger: 'blur' },
        ],
        regionName: [
          { required: true, message: '区域名称不能为空', trigger: 'blur' },
        ],
        schoolPicture: [
          { required: false },
        ],
        schoolDesc: [
          { required: false },
        ],
        remark: [
          { required: false },
        ],
      }
    };
  },
  methods: {
    handleError(message) {
      this.$message.error(message);
    },
    fetchSchoolData(id) {
      this.axios.get('/newspace/schoolInfo/getById', {
        params: { id: id },
        headers: { 'accept': '*/*' }
      }).then(response => {
        if (response.data.success) {
          Object.assign(this.form, response.data.result);
          console.log('School data loaded successfully:', response.data.result);
        } else {
          this.handleError('无法获取学校数据，请检查网络或联系管理员。');
        }
      }).catch(() => {
        this.handleError('无法获取学校数据，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      delete this.form.createTime;
      delete this.form.updateTime;
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 根据是否编辑来确定HTTP方法，URL保持不变
          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/schoolInfo';  // RESTful 风格下路径不变

          this.axios({
            method: method,
            url: url,
            data: this.form  // 发送表单数据
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '学校信息更新成功!' : '新增学校成功!');
              this.$router.push('/dashboard/school');  // 操作成功后返回列表页
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
    }
    ,
    onCancel() {
      this.$router.push('/dashboard/school');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchSchoolData(id);
    }
  }
};
</script>

<style scoped>
.school-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
