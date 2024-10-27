<template>
  <BackgroundVideo>
    <div class="content-page">
      <div class="content-container">
        <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/currencyInfo')">货币列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑货币信息' : '新增货币信息' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="currency-form" :rules="rules" ref="form">
        <el-form-item label="货币代码" prop="currencyCode">
          <el-input v-model="form.currencyCode" placeholder="请输入货币代码"></el-input>
        </el-form-item>
        <el-form-item label="货币名称" prop="currencyName">
          <el-input v-model="form.currencyName" placeholder="请输入货币名称"></el-input>
        </el-form-item>
        <el-form-item label="汇率" prop="exchangeRate">
          <el-input v-model="form.exchangeRate" placeholder="请输入汇率" type="number" step="0.0001"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{ isEdit ? '保存修改' : '提交' }}</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </BackgroundVideo>
</template>

<script>
import BackgroundVideo from '@/components/BackgroundVideo.vue'
export default {
  components: {
    BackgroundVideo,
  },
  data() {
    return {
      form: {
        currencyCode: '',
        currencyName: '',
        exchangeRate: ''
      },
      isEdit: false,
      rules: {
        currencyCode: [
          { required: true, message: '货币代码不能为空', trigger: 'blur' },
        ],
        currencyName: [
          { required: true, message: '货币名称不能为空', trigger: 'blur' },
        ],
        exchangeRate: [
          { required: true, message: '汇率不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    fetchCurrencyData(id) {
      this.axios.get('/imchat/currencyInfo/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取货币信息失败');
        }
      }).catch(() => {
        this.$message.error('获取货币信息失败，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.axios.put('/imchat/currencyInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('货币信息更新成功');
                    this.$router.push('/dashboard/currencyInfo');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/currencyInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('货币信息添加成功');
                    this.$router.push('/dashboard/currencyInfo');
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
      this.$router.push('/dashboard/currencyInfo');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchCurrencyData(id);
    }
  },
};
</script>

<style scoped>
.currency-form {
  max-width: 600px;
  margin: 20px auto;
}
</style>
