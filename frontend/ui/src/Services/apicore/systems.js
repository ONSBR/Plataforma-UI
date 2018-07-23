import ApiCore from './index'

class SystemService {
    constructor(){
        this.apicore = new ApiCore()
    }

    findAll(){
        return this.apicore.Query("system")
    }
}

export default SystemService