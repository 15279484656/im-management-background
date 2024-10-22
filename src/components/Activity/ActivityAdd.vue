<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/community_active')">社区活动列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑活动' : '新增活动' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="active-form" :rules="rules" ref="form">
        <el-form-item v-show="false"  label="社团ID" prop="communityId">
          <el-input v-model="form.communityId" placeholder="请输入社团ID"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="activeName">
          <el-input v-model="form.activeName" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动内容" prop="activeContent">
          <el-input type="textarea" v-model="form.activeContent" placeholder="请输入活动内容"></el-input>
        </el-form-item>
        <el-form-item label="活动图片" prop="activePicture">
          <el-input v-model="form.activePicture" placeholder="请输入活动图片URL"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="weixin">
          <el-input v-model="form.weixin" placeholder="请输入微信"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNum">
          <el-input v-model="form.phoneNum" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="二维码" prop="qrCode">
          <el-input v-model="form.qrCode" placeholder="请输入二维码图片URL"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitForm">提交</el-button>
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
      isEdit: false,
      form: {
        communityId: '',
        activeName: '',
        activeContent: '',
        activePicture: '',
        startTime: '',
        endTime: '',
        phoneNum: '',
        weixin: '',
        qr_code: ''
      },
      rules: {
        // community_id: [{required: true, message: '请输入社团ID', trigger: 'blur'}],
        activeName: [{required: true, message: '请输入活动名称', trigger: 'blur'}],
        activeContent: [{required: true, message: '请输入活动内容', trigger: 'blur'}],
        // activePicture: [{required: true, message: '请输入活动图片URL', trigger: 'blur'}],
        startTime: [{required: true, message: '请选择开始时间', trigger: 'blur'}],
        endTime: [{required: true, message: '请选择结束时间', trigger: 'blur'}],
        phoneNum: [{required: true, message: '请输入电话', trigger: 'blur'}],
        weixin: [{required: true, message: '请输入微信', trigger: 'blur'}],
        // qr_code: [{required: true, message: '请输入二维码图片URL', trigger: 'blur'}],
      }
    }
  },
  methods: {
    // communityActiveInfo
    onSubmitForm() {
      delete this.form.createTime;
      delete this.form.updateTime;
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 根据是否编辑来确定HTTP方法，URL保持不变
          const method = this.isEdit ? 'put' : 'post';
          const url = '/newspace/communityActiveInfo';  // RESTful 风格下路径不变

          this.axios({
            method: method,
            url: url,
            data: this.form  // 发送表单数据
          }).then(response => {
            if (response.data.success) {
              this.$message.success(this.isEdit ? '活动信息更新成功!' : '新增活动成功!');
              this.$router.push('/dashboard/activity');  // 操作成功后返回列表页
            } else {
              this.$message.error(this.isEdit ? '更新失败，请检查输入或联系管理员。' : '新增失败，请检查输入或联系管理员。');
            }
          }).catch(() => {
            this.$message.error(this.isEdit ? '更新失败，请检查网络或联系管理员。' : '新增失败，请检查网络或联系管理员。');
          });
        } else {
          this.$message.error('请完善表单信息');
          return false;
        }
      });
    },
    onCancel() {
      this.$router.push({name: 'activity'});
    },
    getDetail() {
      const id = this.$route.query.id;
      this.axios.get(`/communityActiveInfo/getById?id=${id}`)
          .then(response => {
            if (response.data.success && response.data.result) {
              this.form = response.data.result;
            } else {
              this.$message.error('获取活动详情失败！');
            }
          }).catch(error => {
        this.$message.error('无法加载活动详情，请检查网络或联系管理员！');
      });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.isEdit = true;
      this.getDetail();
    }
  }
}
</script>

<style scoped>
.active-form {
  width: 600px;
  margin: 0 auto;
}
</style>
