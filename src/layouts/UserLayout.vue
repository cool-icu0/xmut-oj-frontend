<template>
  <div id="UserLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/oj.png" class="logo" />
          <div>Xmut OJ</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://yuque.com/icu0" target="_blank">
          厦门理工学院在线判题系统 By Cool
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#UserLayout {
  text-align: center;
  background: url("../assets/userLayout_bg1.png") no-repeat;
  width: 100%;
  height: 100%;
  /*下面是在线的壁纸链接*/
  /*background: url("https://dogefs.s3.ladydaily.com/~/source/wallhaven/full/yj/wallhaven-yjd5jk.png?w=2560&h=1440&fmt=webp");*/
}

#UserLayout .logo {
  width: 64px;
  height: 64px;
}

#UserLayout .header {
  margin-top: 16px;
  /*box-shadow: #eee 1px 1px 5px;*/
}

#UserLayout .content {
  /*background: linear-gradient(to right, #bbb, #fff);*/
  margin-bottom: 16px;
  padding: 20px;
}

#UserLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts"></script>
