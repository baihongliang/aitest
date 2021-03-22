<template>
    <div>
        <template>
            <v-tabs :value="3" background-color="primary">
                <v-tab @click="$router.push({name:'Case'})">用例管理</v-tab>
                <v-tab @click="$router.push({name:'Task'})">任务管理</v-tab>
                <v-tab @click="$router.push({name:'Jenkins'})">Jenkins管理</v-tab>
                <v-tab @click="$router.push({name:'Report'})">报告管理</v-tab>
            </v-tabs>
        </template>
        <div id="main" style="width:500px;height:500px"></div>
        Report
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    },
    mounted() {
        var echarts = require('echarts');
        // 基于准备好的dom，初始化echarts实例
        var mychart = echarts.init(document.getElementById('main'));
        // 绘制图表
        mychart.setOption({
            title:{
                text:'ECharts 入门实例'
            },
            tooltip:{},
            xAxis:{
                data:['衬衫', '羊毛衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis:{},
            series:[{
                name:'销量',
                type:'bar',
                data:[5, 20, 36, 10, 10, 20]
            }]
        })
    },
}
</script>

<style scoped>

</style>