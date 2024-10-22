<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/agent')">代理商列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑代理商' : '新增代理商' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="agent-form" :rules="rules" ref="form">
        <el-form-item label="代理商名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入代理商名称"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactUserName">
          <el-input v-model="form.contactUserName" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入代理商地址"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
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
        name: '',
        contactUserName: '',
        phone: '',
        email: '',
        address: '',
        status: '',
      },
      isEdit: false,
      rules: {
        name: [
          { required: true, message: '代理商名称不能为空', trigger: 'blur' },
        ],
        contactUserName: [
          { required: true, message: '联系人姓名不能为空', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'change' },
        ],
      },
    }
  },
  methods: {
    onSubmit() {
      delete this.form.createTime;
      delete this.form.updateTime;
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 根据是否编辑来确定HTTP方法，URL保持不变
          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/agentsInfo';  // RESTful 风格下路径不变

          this.axios({
            method: method,
            url: url,
            data: this.form  // 发送表单数据
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '代理商信息更新成功!' : '新增代理商成功!');
              this.$router.push('/dashboard/agent');  // 操作成功后返回列表页
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
      this.$router.push({ name: 'agent' });
    },
    getDetail(id) {
      this.axios.get(`/newspace/agentsInfo/getById?id=${id}`).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取代理商详情失败，请稍后再试！');
        }
      }).catch(error => {
        this.$message.error('网络异常，请稍后再试！');
      });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.isEdit = true;
      this.getDetail(this.$route.query.id);
    }
  },
}
</script>

<style scoped>
.agent-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
