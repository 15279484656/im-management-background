<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "admin",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  background: #f5f7f9;
  font-family: Lato, Helvetica, sans-serif;
}

a,
a:hover {
  text-decoration: none;
}

.content-nav {
  height: 40px;
  background: #f5f7fa;
  margin: 0 0 10px 0;
  display: flex;
}

.content-nav .breadcrumb {
  height: 40px;
  line-height: 40px;
  flex: 1;
  color: #8492a6;
}

.content-nav .operation-nav {
  width: auto;
  display: flex;
  align-items: center;
}

.content-main {
  padding: 20px;
  background: #fff;
}

.filter-box {
  height: auto;
  overflow: hidden;
}

.form-table-box .el-input__inner {
  max-width: 240px;
}

.form-table-box .el-textarea {
  width: 400px;
}

.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}

.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}

.form-table-box .el-form {
  margin-top: 40px;
}

.form-tip {
  color: #888;
  font-size: 12px;
  line-height: 30px;
}

.content-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 让页面内容居中 */
}

.content-container {
  background-color: rgb(21, 21, 21); /* 半透明的背景以确保看见后面的背景框 */
  /*padding: 20px;*/
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 0 10px rgb(26, 182, 196); /* 添加一些阴影让其更立体 */
}

.form-table-box {
  display: flex;
  justify-content: center;
  size: 200vh;
  height: 50vh;
}

.el-table-01 {
  width: 100%; /* 表格宽度调整为80% */
  max-width: 900px; /* 限制表格的最大宽度 */
}

.page-box {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
/* 限制表格容器高度，启用垂直滚动 */
.table-scroll-container {
  max-height: 400px; /* 设置表格最大高度，可根据需要调整 */
  overflow-y: auto;
  width: 100%;
}
</style>
