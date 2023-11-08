<template>
  <div id="BasicLayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">
        <global-header />
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
#BasicLayout {
}

#BasicLayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#BasicLayout .content {
  background: linear-gradient(to right, #bbb, #fff);
  margin-bottom: 16px;
}

#BasicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
