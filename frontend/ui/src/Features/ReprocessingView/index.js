import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReprocessingList from './components/reprocessingList';
import ReprocessingDetail from './components/reprocessingDetail'

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
            status:"",
            reprocessing:{
                origin:{
                    payload:{},
                },
                events:[],
                pendingEvent: {},
                history:[]
            }
        }
        this.onDetailHandler = this.onDetailHandler.bind(this)
    }

    onDetailHandler(reprocessing) {
        this.setState(s => {
            s.reprocessing = reprocessing
            return s
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Header systemId={this.props.match.params.id} />
            <div className={classes.root}>
                <div className="col">
                    <ReprocessingList systemId={this.props.match.params.id} status={this.state.status} onDetailHandler={(rep)=>this.onDetailHandler(rep)}/>
                </div>
                <div className="col">
                    <ReprocessingDetail reprocessing={this.state.reprocessing} />
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