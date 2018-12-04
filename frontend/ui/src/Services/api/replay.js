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

    tapes(systemId) {
        return Axios.get(this.url(`replay/${systemId}/tapes`))
    }

    isRecording(systemId) {
        return Axios.get(this.url(`replay/${systemId}/isrecording`))
    }

    download(systemId, id) {
        return Axios.get(this.url(`replay/${systemId}/download/${id}`))
    }

    downloadURL(systemId,id){
        return this.url(`replay/${systemId}/download/${id}`)
    }

    delete(tapeId){
        return Axios.delete(this.url(`replay/tape/${tapeId}`))
    }

    play(systemId, tapeId) {
        return Axios.post(this.url(`replay/${systemId}/play/${tapeId}`))
    }

    uploadTape(inputId) {
        const file = document.getElementById(inputId).files[0]
        const formData = new FormData();
        formData.append('file',file)
        return Axios.post(this.url(`replay/upload`), formData, {
        headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }

}

export default ReplayService