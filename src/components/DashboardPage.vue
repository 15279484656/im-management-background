<style scoped>
body {
  background: #f5f7fa;
  display: block;
}

.container {
  height: 100vh; /* 让容器高度填满整个页面视窗 */
  width: 100vw; /* 让容器宽度填满整个页面视窗 */
  /*background-image: url('../assets/back/2.webp');*/
  background-size: cover; /* 图片按比例缩放，并覆盖整个容器 */
  background-position: center; /* 图片居中 */
  background-repeat: no-repeat; /* 防止图片重复 */
}

.content {
  box-sizing: border-box;
  padding: 20px 20px 20px 220px;
  min-height: 700px;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.8); /* 给内容区添加一个半透明背景 */
}

.footer {
  margin-top: 10px;
  text-align: center;
  line-height: 30px;
  color: #999;
  display: block;
}
</style>

<template>
  <div class="container">
    <sidebar></sidebar>
    <!-- <navbar></navbar> -->
    <div class="content">
      <transition name="router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import Sidebar from './Common/Sidebar';
import Navbar from './Common/Navbar';

export default {
  data() {
    return {}
  },
  components: {
    Sidebar,
    Navbar
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
}

</script>
