<!--About.vue代码-->
<template>
  <!--echarts容器 默认宽高是0 如果 我们不进行设置的话 页面是不显示的-->
  <div ref="mycharts" id="demoDiv"></div>
</template>

<script>
// 1.引用echarts
import * as echarts from "echarts";

export default {
  mounted() {
    //初始化
    const myEcharts = echarts.init(this.$refs.mycharts);
    //设置配置项
    let option = {
      title: {
        text: "雷达图",
      },
      radar: [
        //只适用于雷达图
        {
          shape: "circle",
          indicator: [
            //雷达图的指示器，用来指定雷达图中的多个变量（维度）
            { name: "基础", max: "6500" },
            { name: "队列", max: "16000" },
            { name: "贪心", max: "30000" },
            { name: "栈", max: "38000" },
            { name: "模拟", max: "52000" },
            { name: "搜索", max: "25000" },
          ],
        },
      ],
      series: [
        {
          type: "radar",
          data: [
            {
              value: [4200, 5300, 6666, 22345, 12340, 14567],
            },
          ],
        },
      ],
    };
    //绘制统计图
    myEcharts.setOption(option);
  },
};
</script>

<style>
#demoDiv {
  width: 500px;
  height: 500px;
  border: 1px solid gold;
}
</style>
