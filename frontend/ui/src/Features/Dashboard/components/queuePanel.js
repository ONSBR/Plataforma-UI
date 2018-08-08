import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PlatformService from '../../../Services/api/platform'
import QueueList from './queueList'

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });

class QueuePanel extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            queues:[]
        }
        this.queuesMap = {}
        this.queuesMap["event.executor.queue"] = "Executor"
        this.queuesMap["event.executor.queue.error"] = "Erro do Executor"
        this.queuesMap[`persist.${props.systemId}.queue`] = "Fila de Persistência"
        this.queuesMap[`persist.${props.systemId}.queue.error`] = "Erro de Persistência"
        this.queuesMap[`reprocessing.${props.systemId}.error.queue`] = "Erro Reprocessamento"
        this.queuesMap[`reprocessing.${props.systemId}.events.control.queue`] = "Fila de Controle do Reprocessamento"
        this.queuesMap[`reprocessing.${props.systemId}.events.queue`] = "Fila de Eventos do Reprocessamento"
        this.queuesMap[`reprocessing.${props.systemId}.queue`] = "Fila de Reprocessamento"


        this.service = new PlatformService()
    }
    refresh(){
        setTimeout(()=>{
            this.service.getQueuesStatus().then(({data})=>{
                this.setState(s => {
                    s.queues = data.filter(d => this.queuesMap[d.name] !== undefined).map(d => {
                        d.name = this.queuesMap[d.name]
                        return d
                    });
                    return s
                })
            })
        },1)
    }
    componentWillMount(){
        this.refresh()
        this.interval = setInterval(()=>{
            this.refresh()
        },5000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render(){
        const {classes} = this.props;
        return (
            <div>
            <Paper className={classes.root} elevation={1}>
                 <Typography variant="headline" component="h3">
                 Mensagens
                 </Typography>
                 <QueueList queues={this.state.queues} />
            </Paper>
            </div>
        )
    }
}

QueuePanel.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(QueuePanel);