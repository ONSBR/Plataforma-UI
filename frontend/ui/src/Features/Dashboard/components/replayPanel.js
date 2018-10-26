import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReplayService from '../../../Services/api/replay'

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });

class ReplayPanel extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        console.log(props);
        this.service = new ReplayService()
    }

    render(){
        const {classes} = this.props;
        return (
            <div>
            <Paper className={classes.root} elevation={1}>
                 <Typography variant="headline" component="h3">
                 Replay
                 </Typography>
                 <button>Rec</button>
                 <button>Stop</button>
            </Paper>
            </div>
        )
    }
}

ReplayPanel.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ReplayPanel);