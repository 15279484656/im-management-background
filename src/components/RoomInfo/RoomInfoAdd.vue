<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/roomInfo')">群组列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑群组' : '新增群组' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="room-form" :rules="rules" ref="form">
        <el-form-item label="群组名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入群组名称"></el-input>
        </el-form-item>
        <el-form-item label="群组编号" prop="roomNumber">
          <el-input v-model="form.room_number" placeholder="请输入群组编号"></el-input>
        </el-form-item>
        <el-form-item label="群组类型" prop="roomType">
          <el-input v-model="form.room_type" placeholder="请输入群组类型"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="picture">
          <el-input v-model="form.picture" placeholder="请输入头像链接"></el-input>
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
        room_number: '',
        room_type: '',
        picture: '',
      },
      isEdit: false,
      rules: {
        name: [
          { required: true, message: '群组名称不能为空', trigger: 'blur' },
        ],
        room_number: [
          { required: true, message: '群组编号不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    fetchRoomData(id) {
      this.axios.get('/imchat/roomInfo/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取群组信息失败');
        }
      }).catch(() => {
        this.$message.error('获取群组信息失败，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            const { create_time, update_time, ...formDataToSend } = this.form;
            this.axios.put('/imchat/roomInfo', formDataToSend)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('群组信息更新成功');
                    this.$router.push('/dashboard/roomInfo');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/roomInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('群组添加成功');
                    this.$router.push('/dashboard/roomInfo');
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
      this.$router.push('/dashboard/roomInfo');
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
