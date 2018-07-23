import Axios from 'axios'


class ApiCore {

    url(){
        return "http://localhost:9091"
    }
    Query(entityName, filter, params, page, pageSize) {
        var url = `${this.url()}/core/${entityName}?`
        var queryString = ""
        if (params && filter){
            queryString = `filter=${filter}&`
            Object.keys(params).forEach(p => {
                queryString += `${p}=${params[p]}`
            })
        }
        if (page > 0 && pageSize > 0) {
            queryString += `page=${page}&page_size=${pageSize}`
        }
        url += queryString
        return Axios.get(url)
    }
}



export default ApiCore