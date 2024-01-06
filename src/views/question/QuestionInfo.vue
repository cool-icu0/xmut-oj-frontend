<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件:"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制（ms）：">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制（KB）：">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制（KB）：">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="comment" title="评论"> 评论区</a-tab-pane>
          <a-tab-pane key="answer" title="答案"> 提交后显示答案</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="submitLanguage"
            label="编程语言："
            style="min-width: 240px"
          >
            <a-select v-model="form.submitLanguage" placeholder="选择编程语言">
              <a-option>java</a-option>
              <a-option disabled>敬请其他更多语言</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :language="form.submitLanguage"
          :value="form.submitCode"
          :handle-change="changeCode"
        />
        <a-divider size="0" />
        <a-button
          shape="round"
          type="primary"
          style="min-width: 200px; margin-left: 280px"
          size="large"
          @click="recordDetail"
        >
          查看提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  onMounted,
  onUnmounted,
  ref,
  watch,
  withDefaults,
} from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../backapi";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import { editor } from "monaco-editor";

interface Props {
  id: string;
}

const codeDefaultValue = ref();
/**
 * 查看提交的代码详情
 */
const recordDetail = async () => {
  const res = await QuestionControllerService.getQuestionById2AnswerUsingGet(
    props.id as any
  );
  codeDefaultValue.value = res.data?.answer;
  // console.log(codeDefaultValue.value);
  editor.getModels()[0]?.setValue(codeDefaultValue.value);
  console.log(editor.getModels()[0].getValue());
  // console.log(res.data);
};
/**
 * 获取到动态路由 id
 */
const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败，" + res.message);
  }
};
const refreshPage = () => {
  location.reload();
};

/**
 * 不同语言的默认程序
 */

const form = ref<QuestionSubmitAddRequest>({
  submitLanguage: "java",
  submitCode: codeDefaultValue as unknown as string,
});
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  recordDetail();
  loadData();
});

const changeCode = (value: string) => {
  form.value.submitCode = value;
};
</script>

<style>
#viewQuestionView {
  max-width: 1600px;
  margin: 0 auto;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
  border-radius: 10px;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
