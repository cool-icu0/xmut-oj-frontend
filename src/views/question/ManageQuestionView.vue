<template>
  <div id="manageQuestionView">
    <a-form
      :model="searchParams"
      layout="inline"
      style="justify-content: center; align-content: center; margin: 25px"
    >
      <a-form-item field="title" label="题目：">
        <a-input v-model="searchParams.title" placeholder="请输入搜索题目" />
      </a-form-item>
      <a-form-item field="title" label="用户：">
        <a-input v-model="searchParams.userId" placeholder="请输入搜索用户" />
      </a-form-item>
      <a-form-item field="title" label="题目内容：">
        <a-input v-model="searchParams.content" placeholder="请输入题目内容" />
      </a-form-item>
      <a-form-item field="tags" label="题目标签：" style="min-width: 280px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入题目标签" />
      </a-form-item>
      <a-space>
        <a-form-item>
          <a-button
            type="outline"
            shape="round"
            status="normal"
            @click="doSubmit"
            >搜索
          </a-button>
        </a-form-item>
        <a-form-item>
          <a-popconfirm
            content="确定要批量删除这些题目吗?"
            type="error"
            okText="是"
            cancelText="否"
            @cancel="
              () => {
                console.log(`已取消`);
              }
            "
            @ok="batchDelete"
          >
            <a-button shape="round" type="outline" status="danger"
              >批量删除
            </a-button>
          </a-popconfirm>
        </a-form-item>
        <a-form-item>
          <a-button
            type="outline"
            shape="round"
            status="success"
            @click="batchDownload"
            >批量下载
          </a-button>
        </a-form-item>
      </a-space>
    </a-form>
    <a-table
      row-key="id"
      :row-selection="rowSelection"
      :column-resizable="true"
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
        showJumper: true,
        showPageSize: true,
      }"
      v-model:selectedKeys="selectedKeys"
      @page-change="onPageChange"
      @pageSizeChange="onPageSizeChange"
    >
      <template #id="{ record }">
        <a-link
          status="normal"
          style="color: blue"
          @click="toQuestionPage(record)"
          >{{ record.id }}
        </a-link>
      </template>
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of JSON.parse(record.tags)"
            :key="index"
            color="cyan"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #judgeConfig="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(config, index) of JSON.parse(record.judgeConfig)"
            :key="index"
            color="orangered"
            >{{
              `${
                index === "timeLimit"
                  ? "时间(ms)"
                  : index === "memoryLimit"
                  ? "内存(Kb)"
                  : "堆栈(Kb)"
              }`
            }}
            {{ "：" + config }}
          </a-tag>
        </a-space>
      </template>
      <template #info="{ record }">
        <a-button shape="round" type="outline" @click="handleClick"
          >查看
        </a-button>
        <a-drawer
          :width="340"
          :visible="visible"
          @ok="handleOk"
          @cancel="handleCancel"
          unmountOnClose
        >
          <template #title> 详情</template>
          <div>
            <h4>题目：</h4>
            <MdViewer :value="record.content" />
            <h4>答案</h4>
            <MdViewer :value="record.answer" />
            <h4>判题用例</h4>
            <a-space
              wrap
              v-for="(config, index) of JSON.parse(record.judgeCase)"
              :key="index"
            >
              示例{{ index + 1 }}: 输入：{{ config.input }} ，输出：{{
                config.output
              }}
            </a-space>
          </div>
        </a-drawer>
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button shape="round" type="outline" @click="doUpdate(record)"
            >修改
          </a-button>
          <a-popconfirm
            content="确定要删除此题目吗?"
            type="error"
            okText="是"
            cancelText="否"
            @cancel="
              () => {
                console.log(`已取消`);
              }
            "
            @ok="doDelete(record)"
          >
            <a-button shape="round" type="outline" status="danger"
              >删除
            </a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../backapi";
import message from "@arco-design/web-vue/es/message";

import { useRouter } from "vue-router";
import axios from "axios";
import MdEditor from "@/components/MdEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

const visible = ref(false);

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};
const selectedKeys = ref<Array<number>>([]);
// const selectedKeys = ref<number[]>([]);

const rowSelection = reactive({
  type: "checkbox",
  showCheckedAll: true,
});
const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  userId: undefined,
  tags: [],
  title: "",
  pageSize: 10,
  current: 1,
  content: "",
});
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost({
    ...searchParams.value,
    sortField: "createTime",
    sortOrder: "descend",
  });
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
  // console.log("111:" + dataList.value);
};
/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "判题题目",
    slotName: "judgeConfig",
  },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "详情",
    slotName: "info",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
/**
 * 分页
 * @param page
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
// todo 1
/**
 * 分页大小
 * @param size
 */
const onPageSizeChange = (size: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: size,
  };
};
/**
 * 删除
 * @param question
 */
const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    // 更新数据
    loadData();
  } else {
    message.error("删除失败");
  }
};
/**
 * 批量删除
 */
const batchDelete = async () => {
  // 假设这里是发送批量删除请求的代码
  console.log("要删除的ID列表：", selectedKeys.value);
  // 在这里可以调用API或者其他方法来发送批量删除请求
  const res = await QuestionControllerService.batchDeleteQuestionUsingPost({
    ids: selectedKeys.value,
  });
  if (res.code === 0) {
    message.success("删除成功");
    // 更新数据
    loadData();
  } else {
    message.error("删除失败");
  }
};
/**
 * 批量下载
 */
const batchDownload = async () => {
  // 假设这里是发送批量删除请求的代码
  console.log("要下载的ID列表：", selectedKeys.value);
  // 在这里可以调用API或者其他方法来发送批量删除请求
  try {
    const response = await axios.post(
      "http://localhost:8101/api/question/batchDownload",
      selectedKeys.value,
      { responseType: "blob" }
    );
    //此次没办法集成项目的axios，因为没办法定义axios的返回类型为blob
    // const response =
    //   await QuestionControllerService.batchDownloadQuestionsUsingPost(
    //     selectedKeys.value
    //   );
    console.log("当前代码格式", response);
    const blob = new Blob([response.data], { type: "application/zip" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "questions.zip");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success("下载成功");
  } catch (error) {
    message.error("下载失败");
    console.error("Error downloading questions:", error);
  }
};
const router = useRouter();

//todo 2
/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (questionId: QuestionSubmitQueryRequest) => {
  router.push({
    path: `/question/view/${questionId.questionId}`,
  });
};
/**
 * 修改 / 更新操作
 * @param question
 */
const doUpdate = (question: Question) => {
  router.push({
    path: "/question/update",
    query: {
      id: question.id,
    },
  });
};
// todo 3
/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  // 且这里不需要手动更新页面，因为页面数据被监听了，所有操作只要发生改变就会自动更新
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>
<style scoped>
#manageQuestionView {
  padding: 5px;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
  border-radius: 10px;
}
</style>
