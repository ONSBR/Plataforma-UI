import React from 'react'
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css'

class MemoryList extends React.Component {

    constructor(props){
        super(props)
    }

    componentWillUpdate(){
        console.log("ira atualizar")
    }

    render(){
        var i = 0;
        return (
            <div>
                <div>
                    <HotTable data={this.props.memories} colHeaders={true} rowHeaders={true} width="100%" height="800" stretchH="all" />
                </div>
            </div>
          );
    }
}


export default MemoryList
