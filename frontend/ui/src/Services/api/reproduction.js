import ApiService from './index'
import Axios from 'axios'

class ReproductionService extends ApiService {
    constructor(){
        super()
    }
    reproduce(instanceId, owner){
        return Axios.post(this.url("reproduction/"+instanceId,{owner}))
    }
}

export default ReproductionService