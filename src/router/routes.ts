import { RouteRecordRaw } from "vue-router";
import NoAuthView from "@/views/state/NoAuthView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserInfoView from "@/views/user/UserInfoView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserManageView from "@/views/user/UserManageView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";
import ChartOne from "@/views/echart/ChartOne.vue";
import ChartSkill from "@/views/echart/ChartSkill.vue";
import FirstPage from "@/views/FirstPage.vue";
import QuestionInfo from "@/views/question/QuestionInfo.vue";

export const routes: Array<RouteRecordRaw> = [
  //user路由
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/info",
        name: "用户信息",
        component: UserInfoView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  //question路由
  {
    path: "/",
    name: "主页",
    component: FirstPage,
  },
  {
    path: "/questions",
    name: "题目",
    component: QuestionsView,
  },
  {
    path: "/chart",
    name: "刷题情况",
    component: ChartSkill,
  },
  {
    path: "/question_submit",
    name: "已提交题目展示",
    component: QuestionSubmitView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/question/view/:id",
    name: "在线做题",
    component: ViewQuestionView,
    props: true, // 开启接收动态id
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
    },
  },
  // {
  //   path: "/questionInfo/view/:id",
  //   name: "查看提交代码",
  //   component: QuestionInfo,
  //   props: true, // 开启接收动态id
  //   meta: {
  //     access: ACCESS_ENUM.USER,
  //     hideInMenu: true,
  //   },
  // },
  {
    path: "/question/add",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/question/update",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      hideInMenu: true,
    },
  },
  {
    path: "/question/manage",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/manage/user",
    name: "用户管理",
    component: UserManageView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  // {
  //   path: "/questions",
  //   name: "浏览题目",
  //   component: QuestionsView,
  // },
  // {
  //   path: "/admin",
  //   name: "管理员可见",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/hide",
  //   name: "隐藏界面",
  //   component: ExampleView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/introduce",
    name: "OJ介绍",
    component: () => import("../views/SystemIntroduceView.vue"),
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/state/404View.vue"),
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/:pathMatch(.*)", // 匹配所有路由
    redirect: "/404",
  },
];
