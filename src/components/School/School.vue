<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item>学校列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <!-- 添加一个右上角的新增按钮 -->
      <div class="table-header">
        <el-button type="primary" @click="handleAddNew">新增学校</el-button>
      </div>
      <div class="filter-box">
        <el-form :inline="true" :model="filterForm" class="demo-form-inline">
          <el-form-item label="学校名称">
            <el-input v-model="filterForm.schoolName" placeholder="学校名称"></el-input>
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
          <el-table-column prop="schoolName" label="学校名称" width="150" fixed="left" class="fixed-column"/>
          <el-table-column prop="schoolCode" label="学校代码" width="120"/>
          <el-table-column prop="regionId" label="区域ID" width="120"/>
          <el-table-column prop="regionName" label="区域名称"/>
          <el-table-column label="学校图片" width="120">
            <template slot-scope="scope">
              <img :src="scope.row.schoolPicture" alt="" style="width: 50px;height: 50px"/>
            </template>
          </el-table-column>
          <el-table-column prop="agentId" label="代理商ID"/>
          <el-table-column prop="userId" label="用户ID"/>
          <el-table-column prop="userName" label="用户名"/>
          <!--          <el-table-column prop="createTime" label="创建时间" width="180"/>-->
          <!--          <el-table-column prop="updateTime" label="更新时间" width="180"/>-->
          <el-table-column prop="schoolDesc" label="学校简介" width="200">
            <template slot-scope="scope">
              <div class="text-truncate" style="max-width: 150px;" @mouseenter="showTooltip = true"
                   @mouseleave="showTooltip = false">
                {{
                  (scope.row.schoolDesc ? scope.row.schoolDesc.slice(0, 10) : '') + (scope.row.schoolDesc && scope.row.schoolDesc.length > 10 ? '...' : '')
                }}
                <el-tooltip v-if="showTooltip && scope.row.schoolDesc" effect="dark" :content="scope.row.schoolDesc"
                            placement="top">
                  <i class="el-icon-arrow-right"></i>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="remark" label="备注" width="200">
            <template slot-scope="scope">
              <div class="text-truncate" style="max-width: 150px;" @mouseenter="showTooltip = true"
                   @mouseleave="showTooltip = false">
                {{ scope.row.remark.slice(0, 10) + (scope.row.remark.length > 10 ? '...' : '') }}
                <el-tooltip v-if="showTooltip" effect="dark" :content="scope.row.remark" placement="top">
                  <i class="el-icon-arrow-right"></i>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>


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
        schoolName: ''
      },
      showTooltip: false,
      showTooltip2: false,
      tableData: [],
      schoolData: [],
    }
  },
  methods: {
    handlePageChange(val) {
      this.page = val;
      localStorage.setItem('schoolPage', this.page);
      this.getList();
    },
    handleRowEdit(index, row) {
      this.$router.push({name: 'school_add', query: {id: row.id}});
    },
    handleRowDelete(index, row) {
      console.log("row",row);
      this.$confirm('确定要删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/newspace/schoolInfo', {params: {id: row.id}}).then(response => {
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
      // 跳转到新增学校页面
      this.$router.push({name: 'school_add'});
    },
    onSubmitFilter() {
      this.page = 1;
      this.pageSize = 10;
      this.getList();
    },
    getList() {
      // 创建请求参数对象
      const params = {
        page: this.page,
        pageSize: this.pageSize,
      };

      // 如果 school_name 不为空，则添加到请求参数中
      if (this.filterForm.schoolName) {
        params.schoolName = this.filterForm.schoolName;
      }

      this.axios.get('/newspace/schoolInfo/page', {params})
          .then((response) => {
            console.log("完整响应数据:", response.data);
            if (response.data.success && response.data.result) {
              const schoolData = response.data.result;
              this.tableData = schoolData.content; // 数据列表在 result.content 中
              this.page = schoolData.number; // 当前页信息在 result.number 中（注意：number 是从 0 开始的）
              this.total = schoolData.totalElements; // 总条目数在 result.totalElements 中
              console.log('Processed school data:', this.tableData);
            } else {
              console.error('Unexpected response structure:', response.data);
              this.$message.error('获取学校数据失败，数据结构异常！');
            }
          }).catch(error => {
        console.error('Failed to load school data:', error);
        this.$message.error('无法加载学校数据，请检查网络或联系管理员！');
      });
    }
  },
  watch: {
    '$route.query.id'(newId) {
      if (newId) {
        this.isEdit = true;
        this.fetchSchoolData(newId);
      } else {
        this.isEdit = false;
      }
    }
  },
  mounted() {
    this.getList();  // 页面加载时自动调用查询接口
    const id = this.$route.query.id;
    if (id) {
      console.log("Editing school with ID:", id);  // 验证是否获取到 ID
      this.isEdit = true;
      this.fetchSchoolData(id);
    } else {
      console.log("No ID found, creating a new school.");
      this.isEdit = false;
    }
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
