import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './components/style.css'
import ProcessInstanceList from './components/processInstanceList'
import Header from '../Header'
import MemoryList from './components/memoryList'
import ProcessService from '../../Services/api/process'

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
            memories:[]
        }
        this.service = new ProcessService()
        this.handleOnClickInstance = this.handleOnClickInstance.bind(this)
    }

    handleOnClickInstance(instance) {
        this.service.getHistory(instance.id).then(({data})=>{
            var memories = data.map(this.transformMemoryToTable)
            var final = []
            var biggerColumns = 0;
            memories.forEach(m => {
                if (m.biggerColumn > biggerColumns) {
                    biggerColumns = m.biggerColumn
                }
                final.push(...(m.table))
            })
            console.log(biggerColumns)
            var blankColumns = []
            var i = 0;
            while (i < biggerColumns) {
                blankColumns.push("")
                i++
            }
            final.unshift(blankColumns)
            console.log(final)
            this.setState(s => {
                s.memories = final
                return s
            })
        })

    }

    transformMemoryToTable(memory, i) {
        var header = []
        var body = []
        var table = [];
        var biggerColumn = 0;
        if (!memory.dataset){
            //primeira memoria
            header.push("Evento")
            header.push(...Object.keys(memory.event.payload))
            table.push(header)
            body.push(memory.event.name)
            Object.keys(memory.event.payload).forEach(k => {
                body.push(memory.event.payload[k])
            })
            biggerColumn = body.length
            table.push(body)
        }else{
            Object.keys(memory.dataset.entities).forEach(entity => {
                var header = []
                table.push([entity])
                if (memory.dataset.entities[entity].length === 0) {
                    return table;
                }
                Object.keys(memory.dataset.entities[entity][0]).forEach(attr => {
                    if (attr === "_metadata"){
                        return
                    }
                    header.push(attr)
                })
                table.push(header)

                memory.dataset.entities[entity].forEach(entity => {
                    var body = []
                    Object.keys(entity).forEach(attr => {
                        if (attr === "_metadata"){
                            return
                        }
                        body.push(entity[attr])
                    })
                    if (body.length > biggerColumn){
                        biggerColumn = body.length
                    }
                    table.push(body)
                })
            })
            table.push([""])
        }
        table.push([""])
        return {table,biggerColumn}
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
                    <MemoryList memories={this.state.memories}/>
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