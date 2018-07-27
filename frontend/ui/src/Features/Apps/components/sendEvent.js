import React from 'react'
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    area:{
        margin:'auto auto',
        textAlign:'center',
    }
  });


class SendEvent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            body:""
        }
    }
    handleArea(e) {
        this.setState(s => {
            s.body = e.value
            return s
        })
    }
    render(){
        var {handleSendEvent, classes} = this.props

        var {body} = this.state
        return (
            <div>
                <div className={classes.area}>
                    <textarea rows="25" cols="100" onKeyUp={(e)=>this.handleArea(e)}></textarea>
                </div>
                <IconButton aria-label="Share" onClick={()=>handleSendEvent(body)}>
                <SendIcon />
                </IconButton> Enviar evento
            </div>
        )
    }
}

SendEvent.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(SendEvent);