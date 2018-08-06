import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      width:'100%',
      height:'100%',
    },
  });

class Log extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            url:"/logspout/logs"
        }

        if (this.props.container !== ""){
            this.setState(s => {
               s.url = "/logspout/logs/name:"+this.props.container
               return s
            })
        }
    }

    render(){
        return (
            <iframe src={this.state.url} className={this.props.classes.root} ></iframe>
        )
    }
}

Log.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Log);
