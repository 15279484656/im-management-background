<template>
  <BackgroundVideo>
    <div class="content-page">
      <div class="content-container">
        <div class="content-nav">
          <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item>语言管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="content-main">
          <div class="filter-box">
            <el-form :inline="true" :model="filterForm">
              <el-form-item label="语言代码">
                <el-input v-model="filterForm.languageCode" placeholder="请输入语言代码"></el-input>
              </el-form-item>
              <el-form-item label="位置">
                <el-input v-model="filterForm.languageRegion" placeholder="请输入位置"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmitFilter">查询</el-button>
                <el-button type="primary" @click="handleAddNew">新增语言</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="form-table-box el-table-01">
            <div class="table-scroll-container">
              <el-table :data="tableData" style="width: 100%" border stripe>
              <el-table-column prop="id" label="ID" width="60"/>
              <el-table-column prop="languageCode" label="语言代码" width="150"/>
              <el-table-column prop="languageRegion" label="位置" width="150"/>
              <el-table-column prop="languageContext" label="内容" width="200"/>
              <el-table-column label="创建时间" prop="createTime" width="300"/>
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
        languageCode: '',
        languageRegion: ''
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
      this.$router.push({name: 'language_info_add', query: {id: row.id}});
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/imchat/languageInfo', {params: {id: row.id}}).then(response => {
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
      this.$router.push({name: 'language_info_add'});
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
      if (this.filterForm.languageCode) {
        params.languageCode = this.filterForm.languageCode;
      }
      if (this.filterForm.languageRegion) {
        params.languageRegion = this.filterForm.languageRegion;
      }
      this.axios.get('/imchat/languageInfo/page', {params})
          .then(response => {
            if (response.data.success) {
              this.tableData = response.data.result.content;
              this.total = response.data.result.totalElements;
            } else {
              this.$message.error('获取语言信息失败');
            }
          }).catch(() => {
        this.$message.error('获取语言信息失败，请检查网络或联系管理员。');
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
