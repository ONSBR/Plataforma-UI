class ApiService {
    url(s,queryString){
        if (!queryString){
            return `http://localhost:8384/v1.0.0/${s}`
        }
        var qs = ""
        Object.keys(queryString).forEach(k => {
            qs += `${k}=${queryString[k]}&`
        })
        return `http://localhost:8384/v1.0.0/${s}?`+qs
    }
}



export default ApiService