<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item>社群列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <!-- 添加一个右上角的新增按钮 -->
      <div class="table-header">
        <el-button type="primary" @click="handleAddNew">新增社群</el-button>
      </div>
      <div class="filter-box">
        <el-form :inline="true" :model="filterForm" class="demo-form-inline">
          <el-form-item label="社群名称">
            <el-input v-model="filterForm.communityName" placeholder="社群名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFilter">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-table-box">
        <el-table :data="tableData" style="width: 100%" border stripe>
          <!-- 固定在左侧的列 -->
          <el-table-column prop="id" label="ID" width="50" fixed="left" class="fixed-column"/>
          <el-table-column prop="communityName" label="社群名称" width="150" fixed="left" class="fixed-column"/>
          <el-table-column prop="intro" label="介绍" width="200"/>
          <el-table-column prop="contactPerson" label="联系人" width="120"/>
          <el-table-column prop="phoneNum" label="手机号" width="120"/>
          <el-table-column label="图片" width="120">
            <template slot-scope="scope">
              <img :src="scope.row.picture" alt="" style="width: 50px;height: 50px"/>
            </template>
          </el-table-column>
          <el-table-column prop="schoolId" label="学校ID"/>
          <el-table-column prop="createTime" label="创建时间" width="180"/>
          <el-table-column prop="updateTime" label="更新时间" width="180"/>
          <el-table-column prop="isDelete" label="是否删除" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.isDelete === 1 ? '已删除' : '未删除' }}</span>
            </template>
          </el-table-column>
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
        communityName: ''
      },
      showTooltip: false,
      tableData: [],
    }
  },
  methods: {
    handlePageChange(val) {
      this.page = val;
      this.getList();
    },
    handleRowEdit(index, row) {
      this.$router.push({name: 'CommunityInfoEdit', query: {id: row.id}});
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post('/newspace/communityInfo/delete', {id: row.id}).then(response => {
          if (response.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          } else {
            this.$message.error('删除失败，可能是网络问题或者服务器错误。');
          }
        }).catch(error => {
          this.$message.error('删除失败，请检查网络或联系管理员。');
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleAddNew() {
      // 跳转到新增社群页面
      this.$router.push({name: 'community_info_add'});
    },
    onSubmitFilter() {
      this.page = 1;
      this.getList();
    },
    getList() {
      const params = {
        page: this.page,
        pageSize: 10,
      };

      if (this.filterForm.communityName) {
        params.communityName = this.filterForm.communityName;
      }

      this.axios.get('/newspace/communityInfo/page', {params})
          .then((response) => {
            if (response.data.success && response.data.result) {
              const communityData = response.data.result;
              this.tableData = communityData.content;
              this.page = communityData.number + 1;
              this.total = communityData.totalElements;
            } else {
              this.$message.error('获取社群数据失败，数据结构异常！');
            }
          }).catch(error => {
        this.$message.error('无法加载社群数据，请检查网络或联系管理员！');
      });
    }
  },
  mounted() {
    this.getList();
  }
}
</script>

<style scoped>
.table-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.fixed-column {
  background-color: rgba(219, 27, 27, 0.6);
  color: rgba(51, 51, 51, 0.97);
}

.fixed-column .cell {
  color: #db1b1b;
}
</style>
