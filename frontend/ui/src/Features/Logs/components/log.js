import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width:'100%',
        height:'100%',
    },
    paper: {
        padding: theme.spacing.unit,
        minHeight:460,
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing.unit,
      },
    frame:{
        width:'100%',
        height:'90%',
        minHeight:450,
        border:'none',
    }
  });

class Log extends React.Component {
    constructor(props){
        super(props)
        if (props.container){
            this.state = {
                url:"/logspout/logs/name:"+props.container
            }
        }else{
            this.state = {
                url:"/logspout/logs"
            }
        }
    }

    render(){
        const {classes,container} = this.props
        return (
            <Paper className={classes.paper}>
                <Typography variant="headline" component="h3">
                   {container === undefined ? "Geral" : container}
                </Typography>
                <iframe src={this.state.url+"?colors=off"} className={this.props.classes.frame} ></iframe>
            </Paper>
        )
    }
}

Log.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Log);
