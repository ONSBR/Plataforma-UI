import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withRouter } from 'react-router-dom'

const styles = {
  list: {
    width: 250,
    cursor: 'pointer',
  },
  fullList: {
    width: 'auto',
  },
};

class Menu extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        open: false,
    };
  }

  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
            <ListItem onClick={()=> this.props.history.push("/ui/process/"+this.props.systemId)}>Instâncias</ListItem>
            <ListItem onClick={()=> this.props.history.push("/ui/reproduction/"+this.props.systemId)}>Reprodução</ListItem>
            <ListItem onClick={()=> this.props.history.push("/ui/reprocessing/"+this.props.systemId)}>Reprocessamento</ListItem>
            <ListItem onClick={()=> this.props.history.push("/ui/apps/"+this.props.systemId)}>Aplicações</ListItem>
            <ListItem onClick={()=> this.props.history.push("/ui/")}>Sair</ListItem>
        </List>
      </div>
    );
    return (
      <div>
        <Drawer open={this.props.open} onClose={() => this.props.toggleDrawer()}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.props.toggleDrawer()}
            onKeyDown={() => this.props.toggleDrawer()}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Menu));