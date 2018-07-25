import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ProcessService from '../../../Services/api/process'
import { Button, Icon } from '@material-ui/core';


const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 550,
  },
});

class ProcessInstanceList extends React.Component {

    constructor(props){
        super(props)
        this.service = new ProcessService()
        this.state = {
            instances : [],
            page:1,
            pageSize:10,
        }

    }

    componentDidMount(){
        this.fetch()
        this.intervalTick = setInterval(()=>{
            this.fetch()
        },5000)
    }

    componentWillUnmount(){
        clearInterval(this.intervalTick)
    }

    fetch(){
        setTimeout(()=>{
            this.service.findInstancesBySystem(this.props.systemId,this.state.page,this.state.pageSize).then(({data})=> {
                this.setState(s => {
                    s.instances = data
                    return s
                })
            })
        },1)

    }

    handleNext() {
        this.setState(s => {
            s.page++
            return s
        })
        this.fetch()
    }

    handlePrevious(){
        this.setState(s => {
            if (s.page > 1)
                s.page--
            return s
        })
        this.fetch()
    }

    render() {
        const { classes } = this.props;

  return (
    <Paper className={classes.root}>
    <Typography variant="headline" component="h4">
        &nbsp;Instâncias
    </Typography>
    <Table className={classes.table}>
        <TableHead>
        <TableRow>
            <TableCell>Evento</TableCell>
            <TableCell>Início</TableCell>
            <TableCell>Escopo</TableCell>
            <TableCell>Cenário</TableCell>
            <TableCell>Status</TableCell>
            <TableCell> </TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {this.state.instances.map(instance => {
            return (
            <TableRow key={instance.id}>
                <TableCell component="th" scope="row">
                {instance.origin_event_name}
                </TableCell>
                <TableCell>{instance.startExecution}</TableCell>
                <TableCell>{instance.scope}</TableCell>
                <TableCell>{instance.baseline}</TableCell>
                <TableCell><span className={instance.status}>{instance.status}</span></TableCell>
                <TableCell><Icon className="clickable" onClick={()=> this.props.onClickHandler(instance)}>storage</Icon></TableCell>
            </TableRow>
            );
        })}
        </TableBody>
    </Table>
    <div>
    <Button disabled={this.state.page < 1} onClick={()=>this.handlePrevious()}>Anterior</Button>
    <span>&nbsp;{this.state.page}&nbsp;</span>
    <Button onClick={()=>this.handleNext()}>Próximo</Button>
    </div>
    </Paper>
  );
    }
}
ProcessInstanceList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ProcessInstanceList)