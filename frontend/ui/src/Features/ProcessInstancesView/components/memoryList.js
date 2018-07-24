import React from 'react'
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 1 * 1 }}>
        {props.children}
      </Typography>
    );
  }

  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };


const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  });

class MemoryList extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            value:0
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render(){
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <Tabs value={value} onChange={this.handleChange}>
                    {this.props.memories.map((mem,i) => (<Tab label={"#"+i} />))}
                </Tabs>
                <TabContainer><HotTable data={this.props.memories[value]} colHeaders={true} rowHeaders={true} width="100%" height="750" stretchH="all" /></TabContainer>
            </div>
          );
    }
}

MemoryList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(MemoryList)
