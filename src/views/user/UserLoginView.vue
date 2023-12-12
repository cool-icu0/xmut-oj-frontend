<template>
  <div class="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button
            style="margin: 25px; width: 150px"
            size="large"
            shape="round"
            type="primary"
            html-type="submit"
            @click="handleSubmit"
          >
            登录
          </a-button>
          <a-button
            style="margin: 25px; width: 150px"
            size="large"
            shape="round"
            type="primary"
            html-type="submit"
            @click="toRegister"
          >
            注册
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();
/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  //登录成功跳转到主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    await router.push({
      path: "/",
      replace: true,
    });
    // alert("登录成功" + JSON.stringify(res.data));
  } else {
    message.error("登录失败" + res.message);
  }
};
const toRegister = () => {
  router.push({
    path: "/user/register",
  });
};
</script>
<style>
.arco-form-item-content-flex {
  justify-content: center !important;
}
</style>
