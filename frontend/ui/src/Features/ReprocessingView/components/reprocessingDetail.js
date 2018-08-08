import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      minWidth: 550,
    },
    detail:{
        display:'flex',
        width:'100%'
    },
    attr:{
        fontWeight:'bolder'
    },
    eventsContainer:{
        maxHeight:450,
        overflowY:'auto',
        display:'flex',
        width:'100%'
    },
  });

class ReprocessingDetail extends React.Component {
    constructor(props){
        super(props)

    }
    renderObject(payload) {
        if (payload === null || payload === undefined){
            return
        }
        return Object.keys(payload).map(k => {
            if (k === "_metadata"){
                return
            }
            return (
            <div>
                <span>{k}:</span>&nbsp;{this.renderBolder(payload[k])}
            </div>)
        })
    }

    renderBolder(k) {
        const { classes } = this.props;
        if (typeof k !== "object") {
            return (
                <span className={classes.attr}>{k}</span>
           )
        }
        return this.renderObject(k)
    }

    renderEvent(event) {
        const { classes } = this.props;
        return (
            <Typography  component="div" style={{ padding: 2 * 1 }}>
                <div className={classes.detail}>
                <div className="col">
                    Nome: {this.renderBolder(event.name)}<br/>
                    Versão: {this.renderBolder(event.version)}<br/>
                    Cenário: {this.renderBolder(event.branch)}<br/>
                    Timestamp: {this.renderBolder(event.timestamp)}<br/>
                    Instância: {this.renderBolder(event.instanceId)}<br/>
                </div>
                <div className="col">
                    Parãmetros: <br/>
                    {this.renderObject(event.payload)}
                    </div>
                </div>
            </Typography>
        )
    }

    renderHistory(history) {
        return history.map(k => {
            return (
            <div>
                {this.renderObject(k)}<br/>
            </div>)
        })
    }

    render(){
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
            <Typography  variant="headline" component="h4">
                &nbsp;Detalhe do Reprocessamento
            </Typography>
            <div className={classes.detail}>
                <div className="col">
                    <Typography  variant="subheading">
                        Informações
                    </Typography>
                    <Typography  component="div" style={{ padding: 2 * 1 }}>
                        ID: {this.renderBolder(this.props.reprocessing.id)}<br/>
                        Status: {this.renderBolder(this.props.reprocessing.status)}<br/>
                        Tag: {this.renderBolder(this.props.reprocessing.tag)}<br/>
                        Cenário: {this.renderBolder(this.props.reprocessing.branch)}<br/>
                        Reprocessamento de abertura de cenário?: {this.renderBolder(this.props.reprocessing.isFork ? "Sim" : "Não")}<br/>
                        <br/>
                        Histórico de Status:
                        {this.renderHistory(this.props.reprocessing.history)}
                    </Typography>
                </div>
                <div className="col">
                    <Typography  variant="subheading">
                        Evento de Origem
                    </Typography>
                    <Typography  component="div" style={{ padding: 2 * 1 }}>
                        Nome: {this.renderBolder(this.props.reprocessing.origin.name)}<br/>
                        Versão:{this.renderBolder(this.props.reprocessing.origin.version)}<br/>
                        Cenário: {this.renderBolder(this.props.reprocessing.origin.branch)}<br/>
                        Timestamp: {this.renderBolder(this.props.reprocessing.origin.timestamp)}<br/>
                        Instância: {this.renderBolder(this.props.reprocessing.origin.instanceId)}<br/>
                        Parãmetros: <br/>
                        {this.renderObject(this.props.reprocessing.origin.payload)}
                    </Typography>
                </div>
            </div>
            <div className={classes.detail}>
                <div className="col">
                <Typography  variant="subheading">
                    Eventos
                </Typography>
                </div>
            </div>
            <div className={classes.detail}>
                <div className={classes.eventsContainer}>
                <div className="col">

                    {this.props.reprocessing.events.map(e => this.renderEvent(e))}
                </div>
                </div>
            </div>
            </Paper>
        )
    }
}
ReprocessingDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ReprocessingDetail)