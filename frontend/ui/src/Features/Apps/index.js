import React from 'react'
import Header from '../Header'
import AppList from './components/appList'
class Apps extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            systemId:props.match.params.id,
        }

    }

    render(){
        var {systemId} = this.state
        return (
            <div>
                <Header systemId={systemId} />
                <AppList systemId={systemId} />
            </div>
        )
    }
}


export default Apps