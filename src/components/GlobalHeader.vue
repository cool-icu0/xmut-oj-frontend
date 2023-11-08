<template>
  <a-row id="globalHeader" style="margin-bottom: 16px" align="center">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/oj.png" />
            <div class="title">XMUT-OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in routes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

const router = useRouter();

//默认主页
const selectedKeys = ref(["/"]);
//路由跳转时候，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const store = useStore();
console.log(store.state.user.loginUser.userName);

// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "Cool",
//   });
// }, 3000);

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
  margin-left: 16px;
}

.title {
  color: #444;
}

.logo {
  height: 48px;
}
</style>
