import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ProcessInstanceList from './components/processInstanceList'
import Header from '../Header'
import ProcessService from '../../Services/api/process'
import Grid from '@material-ui/core/Grid';
import MemoryPanel from './components/memoryPanel';

const styles = theme => ({
  root: {
    width: '99%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    margin: 'auto auto',
  }
});

class ProcessInstanceView extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            instanceSelected:{}
        }
        this.service = new ProcessService()
        this.handleOnClickInstance = this.handleOnClickInstance.bind(this)
    }

    handleOnClickInstance(instance) {
        this.setState(s => {
            s.instanceSelected = instance
            return s
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Header systemId={this.props.match.params.id} />
            <Grid container spacing={8} className={classes.root}>
                <Grid item xs={8}>
                    <ProcessInstanceList systemId={this.props.match.params.id} onClickHandler={(instance)=> this.handleOnClickInstance(instance) }/>
                </Grid>
                <Grid item xs={4}>
                    <MemoryPanel instance={this.state.instanceSelected} />
                </Grid>
            </Grid>
            </div>
        );
    }
}
ProcessInstanceView.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ProcessInstanceView)