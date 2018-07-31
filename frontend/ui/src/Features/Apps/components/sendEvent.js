import React from 'react'
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import AppsService from '../../../Services/api/apps'

class SendEvent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            body:"",
            operation:{},
            eventName:this.props.app.event_in
        }
        this.appService = new AppsService()
        this.handleSendEvent = this.handleSendEvent.bind(this)
        this.appService.findAllOperations(this.props.app.id,1,1).then(({data})=>{
            this.setState(s => {
                s.operation = data[0]
                return s
            })
        })
    }
    handleArea(e) {
        var b = e.target.value
        this.setState(s => {
            s.body = b
            return s
        })
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    handleSendEvent(){
        var parsed = this.parse(this.state.body)
        var event = {
            name:this.state.operation.event_in,
            payload:parsed,
        }
        this.appService.sendEvent(event).then(req => {
            console.log(req)
        })
    }

    parse(text) {
        var lines = text.split('\n')
        var payload = {}
        lines.forEach(line => {
            var parts = line.split('=')
            if (this.isNumeric(parts[1])) {
                payload[parts[0]] = parseFloat(parts[1])
            }else{
                payload[parts[0]] = parts[1]
            }
        })
        return payload
    }

    render(){
        return (
            <div>
                <div>
                    <textarea rows="25" cols="100" onKeyUp={(e)=>this.handleArea(e)}></textarea>
                </div>
                <IconButton aria-label="Share" onClick={()=>this.handleSendEvent()}>
                <SendIcon />
                </IconButton> Enviar evento
            </div>
        )
    }
}

SendEvent.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default SendEvent;