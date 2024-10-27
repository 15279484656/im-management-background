<template>
  <BackgroundVideo>
    <div class="content-page">
      <div class="content-container">
        <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/roomChatLog')">聊天记录列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑聊天记录' : '新增聊天记录' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="chat-log-form" :rules="rules" ref="form">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="房间号码" prop="roomNumber">
          <el-input v-model="form.roomNumber" placeholder="请输入房间号码"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="引用ID" prop="quoteChatLog">
          <el-input v-model="form.quoteChatLog" placeholder="请输入引用ID"></el-input>
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
        userId: '',
        roomNumber: '',
        content: '',
        quoteChatLog: '',
        msgType: '',
        fileId: '',
      },
      isEdit: false,
      rules: {
        userId: [
          { required: true, message: '用户ID不能为空', trigger: 'blur' },
        ],
        roomNumber: [
          { required: true, message: '房间号码不能为空', trigger: 'blur' },
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
      this.axios.get('/imchat/roomChatLog/getById', {
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
            this.axios.put('/imchat/roomChatLog', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('聊天记录更新成功');
                    this.$router.push('/dashboard/roomChatLog');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/roomChatLog', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('聊天记录添加成功');
                    this.$router.push('/dashboard/roomChatLog');
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
      this.$router.push('/dashboard/roomChatLog');
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
