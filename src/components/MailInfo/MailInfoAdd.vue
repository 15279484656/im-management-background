<template>
  <BackgroundVideo>
    <div class="content-page">
      <div class="content-container">
        <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/mailInfo')">站内信列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑站内信' : '新增站内信' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="mail-form" :rules="rules" ref="form">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="接收人ID" prop="toUserId">
          <el-input v-model="form.toUserId" placeholder="请输入接收人ID"></el-input>
        </el-form-item>
        <el-form-item label="接收人昵称" prop="toNickName">
          <el-input v-model="form.toNickName" placeholder="请输入接收人昵称"></el-input>
        </el-form-item>
        <el-form-item label="消息类型" prop="msgType">
          <el-input v-model="form.msgType" placeholder="请输入消息类型"></el-input>
        </el-form-item>
        <el-form-item label="消息ID" prop="msgId">
          <el-input v-model="form.msgId" placeholder="请输入消息ID"></el-input>
        </el-form-item>
        <el-form-item label="房间名称" prop="roomName">
          <el-input v-model="form.roomName" placeholder="请输入房间名称"></el-input>
        </el-form-item>
        <el-form-item label="房间号码" prop="roomNumber">
          <el-input v-model="form.roomNumber" placeholder="请输入房间号码"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="msg">
          <el-input v-model="form.msg" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="待确认" :value="0"></el-option>
            <el-option label="同意" :value="1"></el-option>
            <el-option label="拒绝" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阅读信息" prop="readInfo">
          <el-select v-model="form.readInfo" placeholder="请选择阅读状态">
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
        nickName: '',
        toUserId: '',
        toNickName: '',
        msgType: '',
        msgId: '',
        roomName: '',
        roomNumber: '',
        msg: '',
        status: 0, // 默认值
        readInfo: 0 // 默认值
      },
      isEdit: false,
      rules: {
        userId: [
          { required: true, message: '用户ID不能为空', trigger: 'blur' },
        ],
        msg: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    fetchMailData(id) {
      this.axios.get('/imchat/mailInfo/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取站内信信息失败');
        }
      }).catch(() => {
        this.$message.error('获取站内信信息失败，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.axios.put('/imchat/mailInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('站内信更新成功');
                    this.$router.push('/dashboard/mailInfo');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/mailInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('站内信添加成功');
                    this.$router.push('/dashboard/mailInfo');
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
      this.$router.push('/dashboard/mailInfo');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchMailData(id);
    }
  },
};
</script>

<style scoped>
.mail-form {
  max-width: 600px;
  margin: 20px auto;
}
</style>
