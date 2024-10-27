<template>
  <div class="background-video-container">
    <video autoplay muted loop class="background-video">
      <source :src="require('@/assets/backvideo/back.mp4')" type="video/mp4"/>
      Your browser does not support the video tag.
    </video>
    <!-- 用于展示页面内容的插槽 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackgroundVideo',
}
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden; /* 避免出现滚动条 */
}

.background-video-container {
  position: fixed; /* 保证背景固定，不随滚动变化 */
  /*position: relative;*/
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  overflow: hidden;
  height: 100vh; /* 全屏视频 */
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: contain; /* 确保视频覆盖整个背景 */
  transform: translate(-50%, -50%);
  z-index: 1; /* 视频置于底层 */
}

.content {
  position: relative;
  z-index: 1; /* 页面内容放置于视频上层 */
  color: rgba(29, 16, 218, 0.35);
  padding: 10px;
}
</style>
