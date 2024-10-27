<template>
  <BackgroundVideo>
    <div class="content-page">
      <div class="content-container">
        <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/userFriendRelationship')">好友关系列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑好友关系' : '新增好友关系' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="friend-form" :rules="rules" ref="form">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="好友ID" prop="friendId">
          <el-input v-model="form.friendId" placeholder="请输入好友ID"></el-input>
        </el-form-item>
        <el-form-item label="添加状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="待确认" :value="0"></el-option>
            <el-option label="同意" :value="1"></el-option>
            <el-option label="拒绝" :value="2"></el-option>
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
        friendId: '',
        status: 0, // 默认值
      },
      isEdit: false,
      rules: {
        userId: [
          { required: true, message: '用户ID不能为空', trigger: 'blur' },
        ],
        friendId: [
          { required: true, message: '好友ID不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    fetchFriendData(id) {
      this.axios.get('/imchat/userFriendRelationship/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取好友关系信息失败');
        }
      }).catch(() => {
        this.$message.error('获取好友关系信息失败，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.axios.put('/imchat/userFriendRelationship', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('好友关系更新成功');
                    this.$router.push('/dashboard/userFriendRelationship');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/userFriendRelationship', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('好友关系添加成功');
                    this.$router.push('/dashboard/userFriendRelationship');
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
      this.$router.push('/dashboard/userFriendRelationship');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchFriendData(id);
    }
  },
};
</script>

<style scoped>
.friend-form {
  max-width: 600px;
  margin: 20px auto;
}
</style>
