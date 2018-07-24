import ApiService from './index'
import Axios from 'axios'

class ProcessService extends ApiService {
    constructor(){
        super()
    }

    findInstancesBySystem(systemId, page, pageSize){
        return Axios.get(this.url("process/instances",{"systemId":systemId, "page":page, "pageSize":pageSize}))
    }
}

export default ProcessService