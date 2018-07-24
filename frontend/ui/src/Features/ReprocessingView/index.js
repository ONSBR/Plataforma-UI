import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReprocessingList from './components/reprocessingList';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      display:'flex',
    }
  });
class ReprocessingView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status:"all"
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
            <Header systemId={this.props.systemId} />
            <div className={classes.root}>
                <div className="col">
                    <ReprocessingList systemId={this.props.match.params.id}/>
                </div>
                <div className="col">
                    <Paper>
                    <Typography variant="headline" component="h4">
                        &nbsp;Reprocessamento
                    </Typography>
                    </Paper>
                </div>
            </div>
            </div>
        );
    }
}
ReprocessingView.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ReprocessingView)