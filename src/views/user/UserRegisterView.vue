<template>
  <div class="userRegisterView">
    <h2 style="margin-bottom: 16px">用户注册</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
    >
      <!--账号-->
      <a-form-item
        required
        field="userAccount"
        label="账号"
        tooltip="账号不少于 4 位"
        :rules="[
          { required: true, message: '账号不能为空' },
          { minLength: 4, message: '账号长度不能低于4位' },
        ]"
      >
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <!--密码-->
      <a-form-item
        field="userPassword"
        label="密码"
        tooltip="密码不少于8位"
        :rules="[
          { required: true, message: '密码不能为空' },
          { minLength: 4, message: '密码不能小于8位' },
        ]"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <!--确认密码-->
      <a-form-item
        required
        field="checkPassword"
        tooltip="密码不少于 8 位"
        label="确认密码"
        :rules="[
          { required: true, message: '密码不能为空' },
          { minLength: 4, message: '密码不能小于8位' },
        ]"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请确认密码"
        />
      </a-form-item>
      <!--注册和返回首页-->
      <a-form-item>
        <a-button
          style="width: 120px"
          size="large"
          shape="round"
          type="secondary"
          status="success"
          @click="toIndex"
        >
          首 页
        </a-button>
        <a-button
          style="margin: 25px; width: 120px"
          size="large"
          shape="round"
          type="primary"
          html-type="submit"
          @click="handleSubmit"
        >
          注 册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../backapi";
import store from "@/store";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();

const form = reactive<UserRegisterRequest>({
  checkPassword: "",
  userAccount: "",
  userPassword: "",
});
/**
 * 提交注册请求，并进行逻辑处理
 */
const handleSubmit = async () => {
  if (
    form?.checkPassword?.length !== form.userPassword?.length ||
    form.checkPassword !== form.userPassword
  ) {
    message.error("两次输入密码不一致");
    return;
  }
  // 拿到后端的响应
  const res = await UserControllerService.userRegisterUsingPost(form);
  // 登录成功跳转到主页
  if (res.code === 0) {
    // 获取到用户信息之后再跳转到主页
    await store.dispatch("user/getLoginUser");
    await router.push({
      path: "/user/login",
      replace: true,
    });
    message.success("注册成功！");
  } else {
    message.error("注册失败！" + res.message);
  }
};
/**
 * 回到首页
 * @param question
 */
const toIndex = () => {
  router.push({
    path: "/",
  });
};
</script>
