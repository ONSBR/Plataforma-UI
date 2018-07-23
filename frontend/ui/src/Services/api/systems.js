import ApiService from './index'
import Axios from 'axios'

class SystemService extends ApiService {
    constructor(){
        super()
    }

    findAll(){
        return Axios.get(this.url("system"))
    }
}

export default SystemService