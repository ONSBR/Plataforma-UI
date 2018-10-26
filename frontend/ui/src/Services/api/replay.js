import ApiService from './index'
import Axios from 'axios'

class ReplayService extends ApiService {
    constructor(){
        super()
    }

    rec(systemId){
        return Axios.post(this.url(`replay/${systemId}/rec`))
    }

    stop(systemId) {
        return Axios.post(this.url(`replay/${systemId}/stop`))
    }

}

export default ReplayService