import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const styles = {
  list: {
    width: 250,
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
            <ListItem>Instâncias</ListItem>
            <ListItem>Memória de Cálculo</ListItem>
            <ListItem>Reprocessamento</ListItem>
            <ListItem>Dashboard</ListItem>
            <ListItem>Emitir Evento</ListItem>
            <ListItem>Aplicações</ListItem>
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

export default withStyles(styles)(Menu);