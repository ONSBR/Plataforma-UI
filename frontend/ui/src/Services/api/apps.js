import ApiService from './index'
import Axios from 'axios'

class AppsService extends ApiService {
    constructor(){
        super()
    }

    findAll(systemId){
        return Axios.get(this.url("apps",{ systemId}))
    }

    findAllOperations(processId,page,pageSize){
        return Axios.get(this.url("apps/operations",{ processId, page, pageSize}))
    }

    fixup(origin, destiny) {
        return Axios.post(this.url("apps/operations/fixup"),{origin, destiny})
    }

}

export default AppsService