<template>
  <BackgroundVideo>
    <div class="content-page">
      <div class="content-container">
        <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item>自定义表情管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <div class="filter-box">
        <el-form :inline="true" :model="filterForm">
          <el-form-item label="用户ID">
            <el-input v-model="filterForm.userId" placeholder="请输入用户ID"></el-input>
          </el-form-item>
          <el-form-item label="文件ID">
            <el-input v-model="filterForm.fileId" placeholder="请输入文件ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFilter">查询</el-button>
            <el-button type="primary" @click="handleAddNew">新增表情</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-table-box el-table-01">
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column prop="id" label="ID" width="60"/>
          <el-table-column prop="userId" label="用户ID" width="150"/>
          <el-table-column prop="fileId" label="文件ID" width="150"/>
          <el-table-column prop="filePath" label="文件路径" width="200"/>
          <el-table-column prop="sourceType" label="来源" width="150"/>
          <el-table-column label="创建时间" prop="createTime" />
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-box">
        <el-pagination background @current-change="handlePageChange" :current-page.sync="page" :page-size="10"
                       layout="total, prev, pager, next, jumper" :total="total"/>
          </div>
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
      page: 1,
      total: 0,
      filterForm: {
        userId: '',
        fileId: ''
      },
      tableData: [],
      pageSize: 10,
    };
  },
  methods: {
    handlePageChange(val) {
      this.page = val;
      this.getList();
    },
    handleRowEdit(index, row) {
      this.$router.push({name: 'customize_user_img_add', query: {id: row.id}});
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/imchat/customizeUserImg', {params: {id: row.id}}).then(response => {
          if (response.data.success) {
            this.$message.success('删除成功!');
            this.getList();
          } else {
            this.$message.error('删除失败，可能是网络问题或服务器错误。');
          }
        }).catch(() => {
          this.$message.error('删除失败，请检查网络或联系管理员。');
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    handleAddNew() {
      this.$router.push({name: 'customize_user_img_add'});
    },
    onSubmitFilter() {
      this.page = 1;
      this.pageSize = 10;
      this.getList();
    },
    getList() {
      const params = {
        page: this.page,
        pageSize: this.pageSize
      };
      if (this.filterForm.userId) {
        params.userId = this.filterForm.userId;
      }
      if (this.filterForm.fileId) {
        params.fileId = this.filterForm.fileId;
      }
      this.axios.get('/imchat/customizeUserImg/page', {params})
          .then(response => {
            if (response.data.success) {
              this.tableData = response.data.result.content;
              this.total = response.data.result.totalElements;
            } else {
              this.$message.error('获取自定义表情信息失败');
            }
          }).catch(() => {
        this.$message.error('获取自定义表情信息失败，请检查网络或联系管理员。');
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
.table-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>
