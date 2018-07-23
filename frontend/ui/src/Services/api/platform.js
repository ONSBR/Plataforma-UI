import ApiService from './index'
import Axios from 'axios'

class PlatformService extends ApiService {
    constructor(){
        super()
    }

    isLocked(systemId){
        return Axios.get(this.url("platform/islocked",{"systemId":systemId}))
    }
}

export default PlatformService