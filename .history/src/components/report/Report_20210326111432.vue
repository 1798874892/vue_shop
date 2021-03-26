<template>
   <div>
     <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 100%;height:700px" ref="chart"></div>
    </el-card>
   </div>
</template>

<script>
// 导入echarts
import echarts from 'echarts'
import _ from 'lodash'

export default {
  name: 'Report',
  data() {
    return {
      // 需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          cotainLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    };
  },
  created() {
    // 此时，页面上的元素，已经被渲染完毕了！
  },
  // DOM初始化完成
  async mounted() {
    // 基于准备好的dom初始化echarts实例
    let myChart = echarts.init(document.getElementById('main'))
    
    const { data:res } = await this.$http.get('reports/type/1')
    if(res.meta.status !== 200) {
       this.$message.error('请求失败！')
    }

    // 指定图表的配置项和数据
    const result = _.merge(res.data, this.options)
    // 展示数据
    myChart.setOption(result)
  }
}
</script>

<style scoped lang='less'>

</style>