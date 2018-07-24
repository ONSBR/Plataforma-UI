import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './components/style.css'
import ProcessInstanceList from './components/processInstanceList'
import Header from '../Header'
import MemoryList from './components/memoryList'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    display:'flex',
  }
});

class ProcessInstanceView extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            memory:{}
        }
        this.handleOnClickInstance = this.handleOnClickInstance.bind(this)
    }

    handleOnClickInstance(instance) {

        this.setState(s => {
            s.memory = instance
            return s
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Header systemId={this.props.systemId} />
            <div className={classes.root}>
                <div className="col">
                    <ProcessInstanceList systemId={this.props.match.params.id} onClickHandler={(instance)=> this.handleOnClickInstance(instance) }/>
                </div>
                <div className="col">
                    <Paper className="memory">
                    <Typography variant="headline" component="h4">
                        &nbsp;Memória
                    </Typography>
                    <MemoryList memory={this.state.memory}/>
                    </Paper>
                </div>
            </div>
            </div>
        );
    }
}
ProcessInstanceView.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ProcessInstanceView)