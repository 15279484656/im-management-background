<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/rechargeInfo')">充值记录列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑充值记录' : '新增充值记录' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="recharge-form" :rules="rules" ref="form">
        <el-form-item label="货币代码" prop="currencyCode">
          <el-input v-model="form.currencyCode" placeholder="请输入货币代码"></el-input>
        </el-form-item>
        <el-form-item label="充值金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入充值金额" type="number"></el-input>
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
        currencyCode: '',
        amount: ''
      },
      isEdit: false,
      rules: {
        currencyCode: [
          { required: true, message: '货币代码不能为空', trigger: 'blur' },
        ],
        amount: [
          { required: true, message: '充值金额不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    fetchRechargeData(id) {
      this.axios.get('/imchat/rechargeInfo/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取充值信息失败');
        }
      }).catch(() => {
        this.$message.error('获取充值信息失败，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.axios.put('/imchat/rechargeInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('充值记录更新成功');
                    this.$router.push('/dashboard/rechargeInfo');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/rechargeInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('充值记录添加成功');
                    this.$router.push('/dashboard/rechargeInfo');
                  } else {
                    this.$message.error('添加失败');
                  }
                }).catch(() => {
              this.$message.error('添加失败，请检查网络或联系管理员。');
            });
          }
        }
      });
    },
    onCancel() {
      this.$router.push('/dashboard/rechargeInfo');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchRechargeData(id);
    }
  },
};
</script>

<style scoped>
.recharge-form {
  max-width: 600px;
  margin: 20px auto;
}
</style>
