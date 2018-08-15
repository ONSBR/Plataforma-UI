import ApiService from './index'
import Axios from 'axios'

class ReprocessingService extends ApiService {
    constructor(){
        super()
    }

    findAll(systemId, status){
        if (status){
            return Axios.get(this.url("reprocessing/findall",{ systemId, status}))
        }else{
            return Axios.get(this.url("reprocessing/findall",{systemId}))
        }
    }

    approve(reprocessingId, approver){
        return Axios.post(this.url("reprocessing/approve",{reprocessingId,approver}))
    }

    skip(reprocessingId, approver){
        return Axios.post(this.url("reprocessing/skip",{reprocessingId,approver}))
    }

    override(systemId, reprocessingId, status) {
        return Axios.post(this.url("reprocessing/overrideStatus",{systemId,reprocessingId,status}))
    }

}

export default ReprocessingService