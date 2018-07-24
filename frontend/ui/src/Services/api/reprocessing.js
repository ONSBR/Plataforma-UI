import ApiService from './index'
import Axios from 'axios'

class ReprocessingService extends ApiService {
    constructor(){
        super()
    }

    findAll(systemId, status){
        if (status){
            return Axios.get(this.url("reprocessing/findall",{"systemId":systemId, "status":status}))
        }else{
            return Axios.get(this.url("reprocessing/findall",{"systemId":systemId}))
        }

    }

}

export default ReprocessingService