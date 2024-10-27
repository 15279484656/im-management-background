<template>
  <BackgroundVideo>
    <div class="content-page">
      <div class="content-container">
        <div class="content-nav">
          <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item>群组管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-main">
          <div class="filter-box">
            <el-form :inline="true" :model="filterForm">
              <el-form-item label="群组名称">
                <el-input v-model="filterForm.name" placeholder="群组名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmitFilter">查询</el-button>
                <el-button type="primary" @click="handleAddNew">新增群组</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="form-table-box el-table-01">
            <div class="table-scroll-container">
              <el-table :data="tableData" style="width: 100%;margin: auto;" border stripe>
              <el-table-column prop="id" label="ID" width="60"/>
              <el-table-column prop="name" label="群组名称" width="200"/>
              <el-table-column prop="roomNumber" label="群组编号" width="200"/>
              <el-table-column prop="roomType" label="群组类型" width="150"/>
              <el-table-column label="创建时间" prop="createTime" :formatter="formatDateColumn" width="150"/>
              <el-table-column label="操作" width="150" fixed="right">
                <template slot-scope="scope">
                  <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
              </el-table>
            </div>
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
<style>

.el-table {
  /*width: 80%; !* 表格宽度调整为80% *!*/
  /*max-width: 900px; !* 限制表格的最大宽度 *!*/
  width: 100%; /* 将表格宽度设为页面容器的100% */
  max-width: none; /* 移除宽度上限 */
  font-size: 16px; /* 保持适中的字体大小 */
  margin: 0 auto; /* 让表格居中显示 */
}
</style>
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
        name: ''
      },
      tableData: [],
      pageSize: 10,
    };
  },
  methods: {
    formatDateColumn(row, column, cellValue) {
      return this.formatDate(cellValue); // 调用全局混入的 formatDate 方法
    },
    handlePageChange(val) {
      this.page = val;
      this.getList();
    },
    handleRowEdit(index, row) {
      this.$router.push({name: 'room_info_add', query: {id: row.id}});
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/imchat/roomInfo', {params: {id: row.id}}).then(response => {
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
      this.$router.push({name: 'room_info_add'});
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
      if (this.filterForm.name) {
        params.name = this.filterForm.name;
      }
      this.axios.get('/imchat/roomInfo/page', {params})
          .then(response => {
            if (response.data.success) {
              this.tableData = response.data.result.content;
              this.total = response.data.result.totalElements;
            } else {
              this.$message.error('获取群组信息失败');
            }
          }).catch(() => {
        this.$message.error('获取群组信息失败，请检查网络或联系管理员。');
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

