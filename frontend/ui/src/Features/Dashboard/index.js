import React from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../Header'
import ProcessInstanceList from '../ProcessInstancesView/components/processInstanceList'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            systemId: props.match.params.id
        }
    }
    render() {
        return (
            <div>
                <Header systemId={this.state.systemId} />
                <ProcessInstanceList systemId={this.state.systemId} />
                <div>Dashboard para o sistema {this.state.systemId}</div>
            </div>
        )
    }
}
export default withRouter(Dashboard)