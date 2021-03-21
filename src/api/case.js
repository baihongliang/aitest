import axios from './http'

const cases = {
    getList(params){
        return axios.get('/testCase/list', {params})
    },
    creatCaseByText(params){
        return axios.post('/testCase/text', params)
    },
    creatCaseByFile(params){
        return axios.post('/testCase/file', params)
    }
}
export default cases