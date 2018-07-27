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
import AppService from '../../../Services/api/apps'
import { Button, Icon } from '@material-ui/core';


const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 850,
  },
});

class AppVersions extends React.Component {

    constructor(props){
        super(props)
        this.service = new AppService()
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
            this.service.findAllOperations(this.props.processId,this.state.page,this.state.pageSize).then(({data})=> {
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
    <div>
    <Table className={classes.table}>
        <TableHead>
        <TableRow>
            <TableCell>Evento In</TableCell>
            <TableCell>Evento Out</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Versão</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {this.state.instances.map(instance => {
            return (
            <TableRow key={instance.id}>
                <TableCell component="th" scope="row">
                {instance.event_in}
                </TableCell>
                <TableCell>{instance.event_out}</TableCell>
                <TableCell>{instance.image}</TableCell>
                <TableCell>{instance.version}</TableCell>
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
    </div>
  );
    }
}
AppVersions.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(AppVersions)