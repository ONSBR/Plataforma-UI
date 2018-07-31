class ApiService {
    url(s,queryString){
        if (!queryString){
            return `/ui/v1.0.0/${s}`
        }
        var qs = ""
        Object.keys(queryString).forEach(k => {
            qs += `${k}=${queryString[k]}&`
        })
        return `/ui/v1.0.0/${s}?`+qs
    }
}



export default ApiService