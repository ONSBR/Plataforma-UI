import React from 'react'
import Header from '../Header'
import Log from './components/log'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      width:'100%',
      height:'700px',
    },
  });


class Logs extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            systemId:props.match.params.id,
        }

    }

    render(){
        var {systemId} = this.state
        var {classes} = this.props
        return (
            <div>
                <Header systemId={systemId} />
                <div className={classes.root}>
                    <Log />
                </div>
            </div>
        )
    }
}

Logs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Logs);