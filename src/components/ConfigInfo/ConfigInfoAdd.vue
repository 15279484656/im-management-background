<template>
  <BackgroundVideo>
    <div class="content-page">
      <div class="content-container">
        <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/configInfo')">配置列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑配置' : '新增配置' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="config-form" :rules="rules" ref="form">
        <el-form-item label="配置名称" prop="configName">
          <el-input v-model="form.configName" placeholder="请输入配置名称"></el-input>
        </el-form-item>
        <el-form-item label="配置Key" prop="configKey">
          <el-input v-model="form.configKey" placeholder="请输入配置Key"></el-input>
        </el-form-item>
        <el-form-item label="配置Value" prop="configValue">
          <el-input v-model="form.configValue" placeholder="请输入配置Value"></el-input>
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
        configName: '',
        configKey: '',
        configValue: ''
      },
      isEdit: false,
      rules: {
        configName: [
          { required: true, message: '配置名称不能为空', trigger: 'blur' },
        ],
        configKey: [
          { required: true, message: '配置Key不能为空', trigger: 'blur' },
        ],
        configValue: [
          { required: true, message: '配置Value不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    fetchConfigData(id) {
      this.axios.get('/imchat/configInfo/getById', {
        params: { id }
      }).then(response => {
        if (response.data.success) {
          this.form = response.data.result;
        } else {
          this.$message.error('获取配置信息失败');
        }
      }).catch(() => {
        this.$message.error('获取配置信息失败，请检查网络或联系管理员。');
      });
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.axios.put('/imchat/configInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('配置更新成功');
                    this.$router.push('/dashboard/configInfo');
                  } else {
                    this.$message.error('更新失败');
                  }
                }).catch(() => {
              this.$message.error('更新失败，请检查网络或联系管理员。');
            });
          } else {
            this.axios.post('/imchat/configInfo', this.form)
                .then(response => {
                  if (response.data.success) {
                    this.$message.success('配置添加成功');
                    this.$router.push('/dashboard/configInfo');
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
      this.$router.push('/dashboard/configInfo');
    }
  },
  mounted() {
    const id = this.$route.query.id;
    if (id) {
      this.isEdit = true;
      this.fetchConfigData(id);
    }
  },
};
</script>

<style scoped>
.config-form {
  max-width: 600px;
  margin: 20px auto;
}
</style>
