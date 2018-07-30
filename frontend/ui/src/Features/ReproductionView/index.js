import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header'
import ProcessService from '../../Services/api/process'
import Grid from '@material-ui/core/Grid';
import MemoryPanel from '../ProcessInstancesView/components/memoryPanel';
import ReproductionList from './components/reproductionList'

const styles = theme => ({
  root: {
    width: '99%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto auto'
  }
});

class ReproductionView extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            instances:[],
            origin:{},
            reproduction:{},
        }
        this.service = new ProcessService()
        this.handleOnClickInstance = this.handleOnClickInstance.bind(this)
    }

    handleOnClickInstance(instance) {
        var original = this.service.findById(instance.originalId)
        var repro = this.service.findById(instance.instanceId)

        Promise.all([original,repro]).then(responses => {
            this.setState(s => {
                s.origin = responses[0].data
                s.reproduction = responses[1].data
                return s
            })
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Header systemId={this.props.match.params.id} />
            <Grid container spacing={8} className={classes.root}>
                <Grid item xs={12}>
                    <ReproductionList systemId={this.props.match.params.id} onClickHandler={(instance)=> this.handleOnClickInstance(instance) }/>
                </Grid>
            </Grid>
            <Grid container spacing={8} className={classes.root}>
                <Grid item xs={6}>
                    <MemoryPanel instance={this.state.origin} />
                </Grid>
                <Grid item xs={6}>
                    <MemoryPanel instance={this.state.reproduction} />
                </Grid>
            </Grid>
            </div>
        );
    }
}
ReproductionView.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ReproductionView)