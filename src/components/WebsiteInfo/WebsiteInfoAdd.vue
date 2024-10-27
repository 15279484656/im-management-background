<template>
  <BackgroundVideo>
    <div class="content-page">
      <div class="content-container">
        <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/websiteInfo')">网站信息列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑网站信息' : '新增网站信息' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="website-form" :rules="rules" ref="form">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="context">
          <el-input v-model="form.context" placeholder="请输入内容"></el-input>
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
        name: '',
        context: ''
      },
      isEdit: false,
      rules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
        context: [
          { required: true, message: '内容不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    fetchWebsiteData(id) {
      this.axios.get('/imchat/websiteInfo/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取网站信息失败');
        }
      }).catch(() => {
        this.$message.error('获取网站信息失败，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.axios.put('/imchat/websiteInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('网站信息更新成功');
                    this.$router.push('/dashboard/websiteInfo');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/websiteInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('网站信息添加成功');
                    this.$router.push('/dashboard/websiteInfo');
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
      this.$router.push('/dashboard/websiteInfo');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchWebsiteData(id);
    }
  },
};
</script>

<style scoped>
.website-form {
  max-width: 600px;
  margin: 20px auto;
}
</style>
