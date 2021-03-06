import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableHead, TableRow, TableCell, Icon } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import ReprocessingService from '../../../Services/api/reprocessing';

const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 550,
    },
  });

class ReprocessingList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            reprocessing:[]
        }

        this.service = new ReprocessingService()
    }

    componentDidMount(){
        this.fetch()
        this.intervalId = setInterval(()=>{
           this.fetch()
        },5000)
    }

    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    fetch(){
        this.service.findAll(this.props.systemId,this.props.status).then(({data})=>{
            this.setState(s => {
                s.reprocessing = data
                return s
            })
        })
    }

    renderActionButton(rep,action) {
        return (rep.status === 'pending_approval' ?
        <TableCell><Icon className="clickable" onClick={()=> this.props.onActionHandler(rep,action)}>{action}</Icon></TableCell>
        : <TableCell></TableCell>)
    }


    render(){
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
            <Typography  variant="headline" component="h4">
                &nbsp;Reprocessamento
            </Typography>
            <Table className={classes.table}>
                <TableHead>
                <TableRow>
                    <TableCell>Evento Origem</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Expandir</TableCell>
                    <TableCell>Aprovar</TableCell>
                    <TableCell>Abortar</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.reprocessing.map(rep => {
                    return (
                    <TableRow key={rep.id}>
                        <TableCell><span title={rep.id}>{rep.origin.name} - {rep.origin.scope}</span></TableCell>
                        <TableCell className={rep.status}>{rep.status}</TableCell>
                        <TableCell><Icon className="clickable" onClick={()=> this.props.onDetailHandler(rep)}>details</Icon></TableCell>
                        {this.renderActionButton(rep,'check')}
                        {this.renderActionButton(rep,'not_interested')}
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
            </Paper>
        )
    }
}
ReprocessingList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ReprocessingList)