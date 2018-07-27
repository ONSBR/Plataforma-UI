import ApiService from './index'
import Axios from 'axios'

class AppsService extends ApiService {
    constructor(){
        super()
    }

    findAll(systemId){
        return Axios.get(this.url("apps",{ systemId}))

    }

}

export default AppsService