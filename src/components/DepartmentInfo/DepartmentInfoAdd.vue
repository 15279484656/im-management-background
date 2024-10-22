<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/departmentInfo')">院系信息列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑院系信息' : '新增院系信息' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="department-info-form" :rules="rules" ref="form">
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
        <el-form-item label="学院" prop="college">
          <el-input v-model="form.college" placeholder="请输入学院"></el-input>
        </el-form-item>
        <el-form-item label="院系" prop="department">
          <el-input v-model="form.department" placeholder="请输入院系"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="form.major" placeholder="请输入专业"></el-input>
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
        schoolId: '',
        schoolName: '',
        college: '',
        department: '',
        major: '',
        remark: ''
      },
      schoolOptions: [], // 存储学校列表
      isEdit: false,
      rules: {
        schoolId: [
          {required: true, message: '学校ID不能为空', trigger: 'blur'},
        ],
        college: [
          {required: true, message: '学院不能为空', trigger: 'blur'},
        ],
        department: [
          {required: true, message: '院系不能为空', trigger: 'blur'},
        ],
        major: [
          {required: true, message: '专业不能为空', trigger: 'blur'},
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
  fetchDepartmentData(id) {
    this.axios.get('/newspace/departmentInfo/getById', {
      params: {id}
    }).then(response => {
      if (response.data.success) {
        Object.assign(this.form, response.data.result);
      } else {
        this.$message.error('无法获取院系信息，请检查网络或联系管理员。');
      }
    }).catch(() => {
      this.$message.error('无法获取院系信息，请检查网络或联系管理员。');
    });
  },
  onSubmit() {
    this.$refs.form.validate((valid) => {
      if (valid) {
        const { createTime, updateTime, ...formDataToSend } = this.form;

        const method = this.isEdit ? 'put' : 'post';
        const url = '/newspace/departmentInfo';
        this.axios({
          method,
          url,
          data: formDataToSend
        }).then(response => {
          if (response.data.success) {
            this.$message.success(this.isEdit ? '院系信息更新成功!' : '新增院系信息成功!');
            this.$router.push('/dashboard/departmentInfo');
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
    this.$router.push('/dashboard/departmentInfo');
  }
},
mounted()
{
  const id = this.$route.query.id;
  if (id) {
    this.isEdit = true;
    this.fetchDepartmentData(id);
  }
  this.fetchSchoolOptions();
}
}
;
</script>

<style scoped>
.department-info-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
