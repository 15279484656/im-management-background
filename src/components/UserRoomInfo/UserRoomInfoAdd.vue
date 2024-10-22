<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/userRoomInfo')">群组关系列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑群组关系' : '新增群组关系' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="room-form" :rules="rules" ref="form">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="房间号码" prop="roomNumber">
          <el-input v-model="form.roomNumber" placeholder="请输入房间号码"></el-input>
        </el-form-item>
        <el-form-item label="群聊名称" prop="roomName">
          <el-input v-model="form.roomName" placeholder="请输入群聊名称"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="userType">
          <el-select v-model="form.userType" placeholder="请选择用户类型">
            <el-option label="普通用户" :value="'普通用户'"></el-option>
            <el-option label="管理员" :value="'管理员'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="待处理" :value="0"></el-option>
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
</template>

<script>
export default {
  data() {
    return {
      form: {
        userId: '',
        roomNumber: '',
        roomName: '',
        userType: '',
        status: 0, // 默认值
      },
      isEdit: false,
      rules: {
        userId: [
          { required: true, message: '用户ID不能为空', trigger: 'blur' },
        ],
        roomNumber: [
          { required: true, message: '房间号码不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    fetchRoomData(id) {
      this.axios.get('/imchat/userRoomInfo/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取群组关系信息失败');
        }
      }).catch(() => {
        this.$message.error('获取群组关系信息失败，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.axios.put('/imchat/userRoomInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('群组关系更新成功');
                    this.$router.push('/dashboard/userRoomInfo');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/userRoomInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('群组关系添加成功');
                    this.$router.push('/dashboard/userRoomInfo');
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
      this.$router.push('/dashboard/userRoomInfo');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchRoomData(id);
    }
  },
};
</script>

<style scoped>
.room-form {
  max-width: 600px;
  margin: 20px auto;
}
</style>
