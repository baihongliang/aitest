<template>
    <div>
        <template>
            <v-tabs :value="0" background-color="primary">
                <v-tab @click="$router.push({name:'Case'})">用例管理</v-tab>
                <v-tab @click="$router.push({name:'Task'})">任务管理</v-tab>
                <v-tab @click="$router.push({name:'Jenkins'})">Jenkins管理</v-tab>
                <v-tab @click="$router.push({name:'Report'})">报告管理</v-tab>
            </v-tabs>
        </template>

        <v-dialog 
        v-model="addDialog"
        max-width="500px"
        >
        <v-card>
            <v-card-title>
                添加测试用例
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-text-field label="用例名称" v-model="addItem.name"></v-text-field>
                    <v-select :items="selectItem" v-model="addItem.type" label="用例类型"></v-select>
                    <v-textarea label="用例数据" v-model="addItem.data" v-if="addItem.type=='文本'"></v-textarea>
                    <v-file-input label="用例数据" v-model="addItem.file" v-if="addItem.type=='文件'"></v-file-input>
                    <v-text-field label="备注" v-model="addItem.remark"></v-text-field>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="addCase()">确定</v-btn>
                <v-btn color="primary" text @click="addDialog = false">取消</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>

        <v-btn color="primary" class="btn" @click="addDialog = true">添加用例</v-btn>
        <v-btn color="success" class="btn">生成任务</v-btn>
        <template>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="desserts"
                item-key="id"
                show-select
                class="elevation-1"
            >
            <template v-slot:[`item.operate`] = "{item}">
                <v-btn color="primary" text small>编辑</v-btn>
                <v-btn color="error" text small @click="deleteCase(item)">删除</v-btn>

            </template>
            </v-data-table>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addDialog:false,
            selectItem:['文本','文件'],
            addItem:{
                name:'',
                type:'',
                data:'',
                file:'',
                remark:''
            },
            selected:[],
            headers:[
                {
                    text:'id',
                    value:'id'
                },
                {
                    text:'用例名称',
                    value:'caseName'
                },
                {
                    text:'用例数据',
                    value:'caseData'
                },
                {
                    text:'操作',
                    value:'operate'
                },
            ],
            desserts:[],
        }
    },
    created(){
        let post_data = {
            pageNum:1,
            pageSize:10,
        }
        this.$api.cases.getList(post_data).then(res=>{
            console.log(res)
            this.desserts = res.data.data.data
        })
    },
    methods: {
        addCase(){
            if(this.addItem.type=='文本'){
                let post_data = {
                    caseData: this.addItem.data,
                    caseName: this.addItem.name,
                    remark: this.addItem.remark,
                }
                this.$api.cases.creatCaseByText(post_data).then(res=>{
                    console.log(res)
                    let post_data = {
                        pageNum:1,
                        pageSize:10,
                    }
                    // 添加用例后，刷新用例列表。注意：由于上传文件后端处理较慢，并没有及时生成新的用例
                    this.$api.cases.getList(post_data).then(res=>{
                        console.log(res)
                        this.desserts = res.data.data.data
                    })
                })
            } else if(this.addItem.type=='文件'){
                let post_data = new FormData()
                post_data.append('caseFile',this.addItem.file)
                post_data.append('caseData',this.addItem.data)
                post_data.append('caseName',this.addItem.name)
                post_data.append('remark',this.addItem.remark)
                this.$api.cases.creatCaseByFile(post_data).then(res=>{
                    console.log(res)
                    let post_data = {
                        pageNum:1,
                        pageSize:10,
                    }
                    // 添加用例后，刷新用例列表。注意：由于上传文件后端处理较慢，并没有及时生成新的用例
                    this.$api.cases.getList(post_data).then(res=>{
                        console.log(res)
                        this.desserts = res.data.data.data
                    })
                })
            }
            console.log(this.addItem)
            this.addDialog = false
        },
        deleteCase(item){
            console.log(item)
            let post_data = {
                caseId:item.id
            }
            this.$api.cases.deleteCase(post_data).then(res=>{
                console.log(res)
                let post_data = {
                    pageNum:1,
                    pageSize:10,
                }
                // 添加用例后，刷新用例列表。注意：由于上传文件后端处理较慢，并没有及时生成新的用例
                this.$api.cases.getList(post_data).then(res=>{
                    console.log(res)
                    this.desserts = res.data.data.data
                })
            })
        }
    },
}
</script>

<style scoped>
.btn{
    margin: 10px;
}
</style>