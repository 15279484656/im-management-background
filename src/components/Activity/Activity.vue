<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item>社区活动列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <!-- 添加一个右上角的新增按钮 -->
      <div class="table-header">
        <el-button type="primary" @click="handleAddNew">新增活动</el-button>
      </div>
      <div class="filter-box">
        <el-form :inline="true" :model="filterForm" class="demo-form-inline">
          <el-form-item label="活动名称">
            <el-input v-model="filterForm.activeName" placeholder="活动名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFilter">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-table-box">
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column prop="id" label="ID" width="50" fixed="left" class="fixed-column" />
          <el-table-column prop="communityId" label="社团ID" width="150" fixed="left" class="fixed-column" />
          <el-table-column prop="activeName" label="活动名称" width="120" />
          <el-table-column prop="activeContent" label="活动内容" width="300">
            <template slot-scope="scope">
              <div class="text-truncate" style="max-width: 150px;" @mouseenter="showTooltip = true"
                   @mouseleave="showTooltip = false">
                {{
                  (scope.row.activeContent ? scope.row.activeContent.slice(0, 10) : '') + (scope.row.activeContent && scope.row.activeContent.length > 10 ? '...' : '')
                }}
                <el-tooltip v-if="showTooltip && scope.row.activeContent" effect="dark" :content="scope.row.activeContent"
                            placement="top">
                  <i class="el-icon-arrow-right"></i>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="活动图片" width="120">
            <template slot-scope="scope">
              <img :src="scope.row.activePicture" alt="" style="width: 50px;height: 50px" />
            </template>
          </el-table-column>
          <el-table-column prop="publishTime" label="发布时间" width="180" />
          <el-table-column prop="startTime" label="开始时间" width="180" />
          <el-table-column prop="endTime" label="结束时间" width="180" />
          <el-table-column prop="phoneNum" label="电话" width="120" />
          <el-table-column prop="weixin" label="微信" width="120" />
          <el-table-column prop="qrCode" label="二维码" width="120">
            <template slot-scope="scope">
              <img :src="scope.row.qrCode" alt="" style="width: 50px;height: 50px" />
            </template>
          </el-table-column>
          <el-table-column prop="schoolId" label="学校ID" width="100" />
          <el-table-column prop="createId" label="创建人ID" width="100" />
          <el-table-column prop="createTime" label="创建时间" width="180" />
          <el-table-column prop="updateTime" label="更新时间" width="180" />
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
                       layout="total, prev, pager, next, jumper" :total="total" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1 ,
      total: 0,
      filterForm: {
        active_name: ''
      },
      showTooltip: false,
      tableData: []
    }
  },
  methods: {
    handlePageChange(val) {
      this.page = val;
      this.getList();
    },
    handleRowEdit(index, row) {
      this.$router.push({name: 'community_active_add', query: {id: row.id}});
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('newspace/communityActiveInfo', {params:{id: row.id}}).then(response => {
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
      this.$router.push({name: 'activity_add'});
    },
    onSubmitFilter() {
      this.page = 1;
      this.pageSize = 10;
      this.getList();
    },
    getList() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
      };

      if (this.filterForm.activeName) {
        params.activeName = this.filterForm.activeName;
      }

      this.axios.get('newspace/communityActiveInfo/page', {params})
          .then((response) => {
            if (response.data.success && response.data.result) {
              const activeData = response.data.result;
              this.tableData = activeData.content;
              this.page = activeData.number;

              this.total = activeData.totalElements;
            } else {
              this.$message.error('获取活动数据失败，数据结构异常！');
            }
          }).catch(error => {
        this.$message.error('无法加载活动数据，请检查网络或联系管理员！');
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
