<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/singleChatLog')">聊天记录列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑聊天记录' : '新增聊天记录' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="chat-log-form" :rules="rules" ref="form">
        <el-form-item label="发送人ID" prop="fromUserId">
          <el-input v-model="form.fromUserId" placeholder="请输入发送人ID"></el-input>
        </el-form-item>
        <el-form-item label="接收人ID" prop="toUserId">
          <el-input v-model="form.toUserId" placeholder="请输入接收人ID"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="消息类型" prop="msgType">
          <el-input v-model="form.msgType" placeholder="请输入消息类型"></el-input>
        </el-form-item>
        <el-form-item label="文件ID" prop="fileId">
          <el-input v-model="form.fileId" placeholder="请输入文件ID"></el-input>
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
        fromUserId: '',
        toUserId: '',
        content: '',
        msgType: '',
        fileId: '',
      },
      isEdit: false,
      rules: {
        fromUserId: [
          { required: true, message: '发送人ID不能为空', trigger: 'blur' },
        ],
        toUserId: [
          { required: true, message: '接收人ID不能为空', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
        ],
        msgType: [
          { required: true, message: '消息类型不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    fetchChatLogData(id) {
      this.axios.get('/imchat/singleChatLog/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取聊天记录信息失败');
        }
      }).catch(() => {
        this.$message.error('获取聊天记录信息失败，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.axios.put('/imchat/singleChatLog', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('聊天记录更新成功');
                    this.$router.push('/dashboard/singleChatLog');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/singleChatLog', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('聊天记录添加成功');
                    this.$router.push('/dashboard/singleChatLog');
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
      this.$router.push('/dashboard/singleChatLog');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchChatLogData(id);
    }
  },
};
</script>

<style scoped>
.chat-log-form {
  max-width: 600px;
  margin: 20px auto;
}
</style>
