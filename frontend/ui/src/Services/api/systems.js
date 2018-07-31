import ApiService from './index'
import Axios from 'axios'

class SystemService extends ApiService {
    constructor(){
        super()
    }

    findAll(){
        var url = this.url("system")
        console.log(url)
        return Axios.get(this.url("system"))
    }
}

export default SystemService