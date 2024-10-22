<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item><a @click="$router.push('/dashboard/orderInfo')">代办列表</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ isEdit ? '编辑代办' : '新增代办' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <el-form :model="form" label-width="120px" class="order-info-form" :rules="rules" ref="form">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="form.content" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="起始地址" prop="startAddress">
          <el-input v-model="form.startAddress" placeholder="请输入起始地址"></el-input>
        </el-form-item>
        <el-form-item label="目的地址" prop="destinationAddress">
          <el-input v-model="form.destinationAddress" placeholder="请输入目的地址"></el-input>
        </el-form-item>
        <el-form-item label="代办类型" prop="todoType">
          <el-select v-model="form.todoType" placeholder="请选择代办类型">
            <el-option label="快递待办" value="0"></el-option>
            <el-option label="代购" value="1"></el-option>
            <el-option label="其他" value="9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="price">
          <el-input v-model="form.price" placeholder="请输入金额" type="number"></el-input>
        </el-form-item>
        <el-form-item label="发单人姓名" prop="senderUserName">
          <el-input v-model="form.senderUserName" placeholder="请输入发单人姓名"></el-input>
        </el-form-item>
        <el-form-item label="接单人姓名" prop="takerUserName">
          <el-input v-model="form.takerUserName" placeholder="请输入接单人姓名"></el-input>
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
        title: '',
        content: '',
        startAddress: '',
        destinationAddress: '',
        todoType: 0,
        price: 0,
        senderUserName: '',
        takerUserName: '',
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        startAddress: [{ required: true, message: '请输入起始地址', trigger: 'blur' }],
        destinationAddress: [{ required: true, message: '请输入目的地址', trigger: 'blur' }],
        price: [{ required: true, message: '请输入金额', trigger: 'blur' }],
        senderUserName: [{ required: true, message: '请输入发单人姓名', trigger: 'blur' }],
        takerUserName: [{ required: true, message: '请输入接单人姓名', trigger: 'blur' }],
      },
      isEdit: false,
      id: null,
    };
  },
  methods: {
    async onSubmit() {
      try {
        await this.$refs.form.validate();
        if (this.isEdit) {
          // 编辑
          const response = await this.axios.put('/newspace/order', this.form);
          if (response.data.success) {
            this.$message.success('修改成功');
            this.$router.push({ name: 'todo' });
          } else {
            this.$message.error('修改失败');
          }
        } else {
          // 新增
          const response = await this.axios.post('/newspace/order', this.form);
          if (response.data.success) {
            this.$message.success('添加成功');
            this.$router.push({ name: 'todo' });
          } else {
            this.$message.error('添加失败');
          }
        }
      } catch (error) {
        this.$message.error('提交失败，请检查输入或网络');
      }
    },
    onCancel() {
      this.$router.push({ name: 'todo' });
    },
    async fetchData() {
      const id = this.$route.query.id;
      if (id) {
        this.isEdit = true;
        this.id = id;
        try {
          const response = await this.axios.get(`/newspace/order/getById?id=${id}`);
          if (response.data.success) {
            this.form = response.data.result;
          } else {
            this.$message.error('获取数据失败');
          }
        } catch (error) {
          this.$message.error('获取数据失败，请检查网络');
        }
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
<style scoped>
.form-item {
  margin-bottom: 20px;
}

.form-item .el-form-item__label {
  font-weight: bold;
}

.form-item .el-form-item__content {
  padding-left: 15px;
}

.el-form-item__content .el-input,
.el-form-item__content .el-select,
.el-form-item__content .el-date-picker {
  width: 100%;
}

.el-form-item__content .el-input-number {
  width: 100%;
}

.el-form-item__content .el-button {
  margin-top: 20px;
}

.el-message {
  z-index: 9999;
}
</style>
