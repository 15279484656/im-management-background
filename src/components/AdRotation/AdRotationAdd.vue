<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/advertising_rotation')">广告轮播图列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑广告' : '新增广告' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="advertising-form" :rules="rules" ref="form">
        <el-form-item label="图片链接" prop="img">
          <el-input v-model="form.img" placeholder="请输入图片链接"></el-input>
        </el-form-item>
        <el-form-item label="图片描述" prop="imgDsc">
          <el-input v-model="form.imgDsc" placeholder="请输入图片描述"></el-input>
        </el-form-item>
        <el-form-item label="位置" prop="position">
          <el-input v-model="form.position" placeholder="请输入位置"></el-input>
        </el-form-item>
        <el-form-item label="区域级别" prop="regionalLevel">
          <el-input v-model="form.regionalLevel" placeholder="请输入区域级别"></el-input>
        </el-form-item>
        <el-form-item label="停留级别" prop="stayLevel">
          <el-input v-model="form.stayLevel" placeholder="请输入停留级别"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="balance">
          <el-input v-model="form.balance" placeholder="请输入单价"></el-input>
        </el-form-item>
        <el-form-item label="总价" prop="totalBalance">
          <el-input v-model="form.totalBalance" placeholder="请输入总价"></el-input>
        </el-form-item>
        <el-form-item label="折扣" prop="discount">
          <el-input v-model="form.discount" placeholder="请输入折扣"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
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
        img: '',
        img_dsc: '',
        position: '',
        regional_level: '',
        stay_level: '',
        balance: '0.00',
        total_balance: '0.00',
        discount: '0.00',
        remark: '',
        status: '0'
      },
      isEdit: false,
      rules: {
        img: [
          { required: true, message: '图片链接不能为空', trigger: 'blur' },
        ],
        img_dsc: [
          { required: true, message: '图片描述不能为空', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {
    fetchAdvertisingData(id) {
      this.axios.get('/newspace/advertisingRotationManagement/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          Object.assign(this.form, response.data.result);
        } else {
          this.$message.error('无法获取广告信息，请检查网络或联系管理员。');
        }
      }).catch(() => {
        this.$message.error('无法获取广告信息，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/advertisingRotationManagement';
          this.axios({
            method,
            url,
            data: this.form
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '广告信息更新成功!' : '新增广告成功!');
              this.$router.push('/dashboard/adRotation');
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
      this.$router.push('/dashboard/adRotation');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchAdvertisingData(id);
    }
  }
};
</script>

<style scoped>
.advertising-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
