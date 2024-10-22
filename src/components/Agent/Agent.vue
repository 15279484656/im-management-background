<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item>代理商列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <!-- 右上角的新增按钮 -->
      <div class="table-header">
        <el-button type="primary" @click="handleAddNew">新增代理商</el-button>
      </div>
      <div class="filter-box">
        <el-form :inline="true" :model="filterForm" class="demo-form-inline">
          <el-form-item label="代理商名称">
            <el-input v-model="filterForm.name" placeholder="代理商名称"></el-input>
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
          <el-table-column prop="name" label="代理商名称" width="150" fixed="left" class="fixed-column"/>
          <el-table-column prop="contactUserName" label="联系人" width="120"/>
          <el-table-column prop="phone" label="联系电话" width="120"/>
          <el-table-column prop="email" label="邮箱"/>
          <el-table-column prop="address" label="地址" width="200">
            <template slot-scope="scope">
              <div class="text-truncate" style="max-width: 150px;" @mouseenter="showTooltip = true"
                   @mouseleave="showTooltip = false">
                {{
                  (scope.row.address ? scope.row.address.slice(0, 10) : '') + (scope.row.address && scope.row.address.length > 10 ? '...' : '')
                }}
                <el-tooltip v-if="showTooltip && scope.row.address" effect="dark" :content="scope.row.address"
                            placement="top">
                  <i class="el-icon-arrow-right"></i>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.status === 'active' ? '启用' : '禁用' }}</span>
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
        name: ''
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
      this.$router.push({name: 'agent_add', query: {id: row.id}});
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/newspace/agentsInfo', {params: {id: row.id}}).then(response => {
          if (response.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.page = 1;
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
      // 跳转到新增代理商页面
      this.$router.push({name: 'agent_add'});
    },
    onSubmitFilter() {
      this.page = 1;
      this.getList();
    },
    getList() {
      // 创建请求参数对象
      const params = {
        page: this.page,
        pageSize: 10,
        userId: 8,
      };

      // 如果 name 不为空，则添加到请求参数中
      if (this.filterForm.name) {
        params.name = this.filterForm.name;
      }

      this.axios.get('/newspace/agentsInfo/page', {
        params
      })
          .then((response) => {
            if (response.data.success && response.data.result) {
              const agentData = response.data.result;
              this.tableData = agentData.content; // 数据列表在 result.content 中
              this.page = agentData.number; // 当前页信息在 result.number 中（注意：number 是从 0 开始的）
              this.total = agentData.totalElements; // 总条目数在 result.totalElements 中
            } else {
              this.$message.error('获取代理商数据失败，数据结构异常！');
            }
          }).catch(error => {
        this.$message.error('无法加载代理商数据，请检查网络或联系管理员！');
      });
    }
  },
  mounted() {
    this.getList();  // 页面加载时自动调用查询接口
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
  background-color: rgba(219, 27, 27, 0.6); /* 背景颜色 */
  color: rgba(51, 51, 51, 0.97); /* 文字颜色 */
}

.fixed-column .cell {
  color: #db1b1b; /* 文字颜色 */
}
</style>
