<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/student')">学生列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑学生' : '新增学生' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="student-form" :rules="rules" ref="form">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studentNum">
          <el-input v-model="form.studentNum" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="微信ID" prop="weixinId">
          <el-input v-model="form.weixinId" placeholder="请输入微信ID"></el-input>
        </el-form-item>
        <el-form-item label="届别" prop="grade">
          <el-input v-model="form.grade" placeholder="请输入届别"></el-input>
        </el-form-item>
        <el-form-item label="班级信息" prop="classInfo">
          <el-input v-model="form.classInfo" placeholder="请输入班级信息"></el-input>
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
        name: '',
        studentNum: '',
        sex: '0',
        weixinId: '',
        grade: '',
        classInfo: '',
        remark: ''
      },
      isEdit: false,
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
        ],
        student_num: [
          { required: true, message: '学号不能为空', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    fetchStudentData(id) {
      this.axios.get('/newspace/student/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          Object.assign(this.form, response.data.result);
        } else {
          this.$message.error('无法获取学生信息，请检查网络或联系管理员。');
        }
      }).catch(() => {
        this.$message.error('无法获取学生信息，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 删除 createTime 和 updateTime 字段
          delete this.form.createTime;
          delete this.form.updateTime;

          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/student';

          this.axios({
            method,
            url,
            data: this.form
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '学生信息更新成功!' : '新增学生成功!');
              this.$router.push('/dashboard/student');
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
      this.$router.push('/dashboard/student');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchStudentData(id);
    }
  }
};
</script>

<style scoped>
.student-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
