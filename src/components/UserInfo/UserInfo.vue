<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
<!--      <div class="table-header">-->
<!--        <el-button type="primary" @click="handleAddNew">新增用户</el-button>-->
<!--      </div>-->
      <div class="filter-box">
        <el-form :inline="true" :model="filterForm" class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input v-model="filterForm.nickName" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFilter">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-table-box">
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column v-if="false" prop="id" label="ID" width="60"/>
          <el-table-column prop="userName" label="用户名" fixed="left" width="150"/>
          <el-table-column prop="nickName" label="昵称" fixed="left" width="150"/>
          <el-table-column prop="openId" label="OpenID" width="150"/>
          <el-table-column label="头像" width="80">
            <template slot-scope="scope">
              <img :src="scope.row.userPicture" alt="" style="width: 50px;height: 50px">
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮件" width="200"/>
          <el-table-column prop="phoneNum" label="电话号码" width="150"/>
          <el-table-column prop="sex" label="性别" width="100">
            <template slot-scope="scope">
              {{ scope.row.sex === '1' ? '男' : '女' }}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180"/>
          <el-table-column prop="updateTime" label="更新时间" width="180"/>
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
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      total: 0,
      filterForm: {
        nickName: ''
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
      this.$router.push({name: 'user_info_add', query: {id: row.id}});
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/newspace/userInfo', {params: {id: row.id}}).then(response => {
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
      this.$router.push({name: 'user_info_add'});
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
      if (this.filterForm.nickName) {
        params.nickName = this.filterForm.nickName;
      }
      this.axios.get('/newspace/userInfo/page', {params})
          .then(response => {
            if (response.data.success) {
              this.tableData = response.data.result.content;
              this.total = response.data.result.totalElements;
            } else {
              this.$message.error('获取用户信息失败');
            }
          }).catch(() => {
        this.$message.error('获取用户信息失败，请检查网络或联系管理员。');
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
