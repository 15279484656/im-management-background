<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item>代办列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-main">
      <div class="table-header">
        <el-button type="primary" @click="handleAddNew">新增代办</el-button>
      </div>
      <div class="filter-box">
        <el-form :inline="true" :model="filterForm" class="demo-form-inline">
          <!-- 标题 -->
          <el-form-item label="标题">
            <el-input v-model="filterForm.keyword" placeholder="请输入关键字"></el-input>
          </el-form-item>

          <!-- 学校ID -->
          <el-form-item label="学校ID">
            <el-input v-model="filterForm.schoolId" placeholder="请输入学校ID"></el-input>
          </el-form-item>

          <!-- 发单人姓名 -->
          <el-form-item label="发单人">
            <el-input v-model="filterForm.senderUserName" placeholder="请输入发单人姓名"></el-input>
          </el-form-item>

          <!-- 接单人姓名 -->
          <el-form-item label="接单人">
            <el-input v-model="filterForm.takerUserName" placeholder="请输入接单人姓名"></el-input>
          </el-form-item>

          <!-- 待办状态 -->
          <el-form-item label="待办状态">
            <el-select v-model="filterForm.todoStatus" placeholder="请选择待办状态" clearable>
              <el-option label="待支付" value="0"></el-option>
              <el-option label="待接单" value="1"></el-option>
              <el-option label="代办中" value="2"></el-option>
              <el-option label="已完成" value="3"></el-option>
              <el-option label="已确认" value="4"></el-option>
              <el-option label="已评价" value="5"></el-option>
              <el-option label="退款售后" value="6"></el-option>
              <el-option label="售后完成" value="7"></el-option>
            </el-select>
          </el-form-item>

          <!-- 待办类型 -->
          <el-form-item label="待办类型">
            <el-select v-model="filterForm.todoType" placeholder="请选择待办类型" clearable>
              <el-option label="全部" value="0"></el-option>
              <el-option label="快递待办" value="1"></el-option>
              <el-option label="代购" value="2"></el-option>
              <el-option label="其他" value="9"></el-option>
            </el-select>
          </el-form-item>


          <!-- 查询按钮 -->
          <el-form-item>
            <el-button type="primary" @click="onSubmitFilter">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="form-table-box">
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column prop="id" label="ID" width="50" fixed="left"/>
          <el-table-column prop="title" label="标题" width="150"/>
          <el-table-column prop="content" label="内容" width="250"/>
          <el-table-column prop="startAddress" label="起始地址" width="200"/>
          <el-table-column prop="destinationAddress" label="目的地址" width="200"/>
          <el-table-column prop="todoType" label="代办类型" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.todoType === 0">快递待办</span>
              <span v-else-if="scope.row.todoType === 1">代购</span>
              <span v-else>其他</span>
            </template>
          </el-table-column>
          <el-table-column prop="senderUserName" label="发单人" width="150"/>
          <el-table-column prop="takerUserName" label="接单人" width="150"/>
          <el-table-column prop="price" label="金额" width="100"/>
          <el-table-column prop="todoStatus" label="代办状态" width="120">
            <template slot-scope="scope">
              <span>{{ mapTodoStatus(scope.row.todoStatus) }}</span>
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
        <el-pagination background @current-change="handlePageChange" :current-page.sync="page" :page-size="pageSize"
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
      pageSize: 10,  // 页大小
      total: 0,
      filterForm: {
        keyword: '',
        schoolId: '',
        senderUserName: '',
        takerUserName: '',
        todoStatus: null,  // 默认状态: 全部
        todoType: null     // 默认类型: 全部
      },
      tableData: []
    };
  },
  methods: {
    handlePageChange(val) {
      this.page = val;
      this.getList();
    },
    handleRowEdit(index, row) {
      this.$router.push({name: 'todo_add', query: {id: row.id}});
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除这条记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/newspace/order', {params: {id: row.id}}).then(response => {
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
      this.$router.push({name: 'todo_add'});
    },
    onSubmitFilter() {
      this.page = 1;
      this.getList();
    },
    mapTodoStatus(status) {
      const statusMap = {
        99: '默认',
        0: '待支付',
        1: '待接单',
        2: '代办中',
        3: '待确认',
        4: '待评价',
        5: '已评价',
        6: '退款售后',
        7: '售后完成'
      };
      return statusMap[status] || '未知';
    },
    getList() {
      const params = {
        page: this.page,  // 当前页数
        pageSize: this.pageSize  // 每页显示条数
      };
      // 条件判断并添加有值的参数
      if (this.filterForm.keyword) {
        params.keyword = this.filterForm.keyword;  // 关键字查询
      }
// 如果 `schoolId` 是需要的，请确保在 `filterForm` 中存在对应字段
// if (this.filterForm.schoolId) {
//   params.schoolId = this.filterForm.schoolId;  // 学校ID
// }
      if (this.filterForm.senderUserId) {
        params.senderUserId = this.filterForm.senderUserId;  // 发单人ID
      }
      if (this.filterForm.senderUserName) {
        params.senderUserName = this.filterForm.senderUserName;  // 发单人姓名
      }
      if (this.filterForm.takerUserId) {
        params.takerUserId = this.filterForm.takerUserId;  // 接单人ID
      }
      if (this.filterForm.takerUserName) {
        params.takerUserName = this.filterForm.takerUserName;  // 接单人姓名
      }
      if (this.filterForm.todoStatus !== undefined && this.filterForm.todoStatus !== null) {
        params.todoStatus = this.filterForm.todoStatus;  // 待办状态
      }
      if (this.filterForm.todoType !== undefined && this.filterForm.todoType !== null) {
        params.todoType = this.filterForm.todoType;  // 待办类型
      }

      // 使用 axios 发送 POST 请求
      this.axios.post('/newspace/order/page', params)
          .then(response => {
            if (response.data.success) {
              this.tableData = response.data.result.content;  // 填充表格数据
              this.total = response.data.result.totalElements;  // 更新总数
            } else {
              this.$message.error('获取代办信息失败');
            }
          })
          .catch(() => {
            this.$message.error('获取代办信息失败，请检查网络或联系管理员。');
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
