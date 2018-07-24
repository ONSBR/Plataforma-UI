import React from 'react'
import { Paper } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import ReprocessingService from '../../../Services/api/reprocessing';

class ReprocessingList extends React.Component {
    constructor(props){
        super(props)
        this.state = {}

        this.service = new ReprocessingService()
    }

    componentDidMount(){
        this.service.findAll(this.props.systemId,this.props.status).then(({data})=>{
            console.log(data)
        })
    }

    render(){
        return (
            <Paper>
            <Typography  variant="headline" component="h4">
                &nbsp;Reprocessamento
            </Typography>
            <p>Reprocessamento para o sistema {this.props.systemId}</p>
            </Paper>
        )
    }
}

export default ReprocessingList