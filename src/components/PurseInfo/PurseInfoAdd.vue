<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/purseInfo')">钱包列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑钱包记录' : '新增钱包记录' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="purse-info-form" :rules="rules" ref="form">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="余额" prop="balance">
          <el-input v-model.number="form.balance" placeholder="请输入余额" type="number"></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="points">
          <el-input v-model.number="form.points" placeholder="请输入积分" type="number"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="正常" :value="1"></el-option>
            <el-option label="冻结" :value="0"></el-option>
          </el-select>
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
        balance: 0,
        points: 0,
        status: 1
      },
      isEdit: false,
      rules: {
        userId: [
          { required: true, message: '用户ID不能为空', trigger: 'blur' },
        ],
        balance: [
          { required: true, message: '余额不能为空', trigger: 'blur' },
        ],
        points: [
          { required: true, message: '积分不能为空', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'change' },
        ]
      }
    };
  },
  methods: {
    fetchPurseData(id) {
      this.axios.get('/newspace/purseInfo/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          Object.assign(this.form, response.data.result);
        } else {
          this.$message.error('无法获取钱包信息，请检查网络或联系管理员。');
        }
      }).catch(() => {
        this.$message.error('无法获取钱包信息，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/purseInfo';
          this.axios({
            method,
            url,
            data: this.form
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '修改成功!' : '添加成功!');
              this.$router.push('/dashboard/purseInfo');
            } else {
              this.$message.error(this.isEdit ? '修改失败' : '添加失败');
            }
          }).catch(() => {
            this.$message.error(this.isEdit ? '修改失败' : '添加失败，请检查网络或联系管理员。');
          });
        }
      });
    },
    onCancel() {
      this.$router.push('/dashboard/purseInfo');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchPurseData(id);
    }
  }
};
</script>

<style scoped>
.purse-info-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
