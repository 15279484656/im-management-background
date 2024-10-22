<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/station_message')">站内信列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑站内信' : '新增站内信' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="station-message-form" :rules="rules" ref="form">
        <el-form-item label="发件人" prop="fromId">
          <el-input v-model="form.fromId" placeholder="请输入发件人ID" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="收件人" prop="toId">
          <el-input v-model="form.toId" placeholder="请输入收件人ID"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="msg">
          <el-input type="textarea" v-model="form.msg" placeholder="请输入站内信内容" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="未读" :value="0"></el-option>
            <el-option label="已读" :value="1"></el-option>
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
        fromId: '',
        toId: '',
        msg: '',
        status: 0
      },
      isEdit: false,
      rules: {
        fromId: [
          { required: true, message: '发件人不能为空', trigger: 'blur' },
        ],
        toId: [
          { required: true, message: '收件人不能为空', trigger: 'blur' },
        ],
        msg: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'change' },
        ]
      }
    };
  },
  methods: {
    fetchMessageData(id) {
      this.axios.get('/newspace/stationMessage/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          Object.assign(this.form, response.data.result);
        } else {
          this.$message.error('无法获取站内信信息，请检查网络或联系管理员。');
        }
      }).catch(() => {
        this.$message.error('无法获取站内信信息，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/stationMessage';
          this.axios({
            method,
            url,
            data: this.form
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '修改成功!' : '添加成功!');
              this.$router.push('/dashboard/stationMessage');
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
      this.$router.push('/dashboard/stationMessage');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchMessageData(id);
    }
  }
};
</script>

<style scoped>
.station-message-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
