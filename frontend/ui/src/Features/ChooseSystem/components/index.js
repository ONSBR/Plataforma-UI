import React from 'react'
import SystemService from '../../../Services/apicore/systems'

class App extends React.Component {
    constructor(props){
        super(props)
        this.service = new SystemService()
        this.state = {
            systems:[],
            count:0,
        }
        this.selectSystemHandler = this.selectSystemHandler.bind(this)
    }
    selectSystemHandler(){
        this.setState(s => {
            s.systems.push("Ola "+s.count)
            s.count++
            return s
        })
        console.log("Selecionar sistema")
    }
    componentDidMount(){
        this.service.findAll().then(s => {
            console.log(s)
        })
        this.setState(s => {
            s.systems.push("Ola "+s.count)
            s.count++
            return s
        })
    }
    render(){
        return (
            <div>
                <ul>
                {this.state.systems.map(s => <li key={s}>{s}</li>)}
                </ul>
                <div>Listar os sistemas</div>
                <button onClick={()=>this.selectSystemHandler()}>Selecionar</button>
            </div>
        )
    }
}
export default App