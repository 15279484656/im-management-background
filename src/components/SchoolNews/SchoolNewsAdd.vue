<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/schoolNews')">校园资讯列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑资讯' : '新增资讯' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="school-news-form" :rules="rules" ref="form">
        <el-form-item v-if="false" label="学校ID" prop="schoolId">
          <el-input v-model="form.schoolId" placeholder="请输入学校ID"></el-input>
        </el-form-item>

        <!-- 学校选择框 -->
        <el-form-item v-if="!isEdit" label="学校名称" prop="schoolId">
          <el-select v-model="form.schoolId" placeholder="请选择学校">
            <el-option
                v-for="school in schoolOptions"
                :key="school.id"
                :label="school.schoolName"
                :value="school.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资讯名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入资讯名称"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" placeholder="请输入内容" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="picture">
          <el-input v-model="form.picture" placeholder="请输入图片URL"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" prop="publishTime">
          <el-date-picker v-model="form.publishTime" type="datetime" placeholder="选择发布时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
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
        picture: '',
        publishTime: '',
        schoolId: '',
        schoolName: '',
        endTime: ''
      },
      schoolOptions: [], // 存储学校列表
      isEdit: false,
      rules: {
        title: [
          { required: true, message: '资讯名称不能为空', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
        ],
        publishTime: [
          { required: true, message: '请选择发布时间', trigger: 'blur' },
        ],
        startTime: [
          { required: true, message: '请选择开始时间', trigger: 'blur' },
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    // 获取学校数据
    fetchSchoolOptions() {
      this.axios.get('/newspace/schoolInfo/page', {
        params: {
          page: 1,
          pageSize: 100
        }
      }).then(response => {
        if (response.data.success) {
          this.schoolOptions = response.data.result.content;
        } else {
          this.$message.error('获取学校数据失败');
        }
      }).catch(() => {
        this.$message.error('无法获取学校数据，请检查网络或联系管理员。');
      });
    },
    fetchNewsData(id) {
      this.axios.get('/newspace/schoolNews/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          Object.assign(this.form, response.data.result);
        } else {
          this.$message.error('无法获取资讯信息，请检查网络或联系管理员。');
        }
      }).catch(() => {
        this.$message.error('无法获取资讯信息，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { createTime, updateTime, ...formDataToSend } = this.form;
          formDataToSend.createId = localStorage.getItem('userId');
          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/schoolNews';
          this.axios({
            method,
            url,
            data: formDataToSend
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '资讯更新成功!' : '新增资讯成功!');
              this.$router.push('/dashboard/schoolNews');
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
      this.$router.push('/dashboard/schoolNews');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchNewsData(id);
    }
    this.fetchSchoolOptions();
  }
};
</script>

<style scoped>
.school-news-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
