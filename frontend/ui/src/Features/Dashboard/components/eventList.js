import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import PlayArrow from '@material-ui/icons/PlayArrow'
import DoneIcon from '@material-ui/icons/Done';
import Error from '@material-ui/icons/Error';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 760,
    backgroundColor: theme.palette.background.paper,
    maxHeight:560,
    overflowY:'auto',
    overflowX: 'hidden',
  },

  requestIcon:{
    color:'white',
    backgroundColor:'green'
  },
  errorIcon:{
    color:'white',
    backgroundColor:'red'
  }
});

class EventList extends React.Component {
  constructor(props){
    super(props)
  }

  renderIcon(event) {
    const { classes } = this.props;
    if (event.name.endsWith(".done")){
        return (
            <Avatar className={classes.requestIcon}>
                <DoneIcon />
            </Avatar>
        )
    }else if (event.name.endsWith(".error") || event.name.endsWith(".exception")){
        return (
            <Avatar className={classes.errorIcon}>
                <Error />
            </Avatar>
        )
    }
    return (
        <Avatar className={classes.requestIcon}>
            <PlayArrow />
        </Avatar>
    )
  }

  render(){
    const { classes, events } = this.props;
    return (
        <div className={classes.root}>
        <List>
            {events.reverse().map(event => (
                <ListItem>
                    {this.renderIcon(event)}
                    <ListItemText primary={event.name} secondary={"escopo="+event.scope + " cenário=" + event.branch} />
                </ListItem>
            ))}
        </List>
        </div>
    );
  }
}

EventList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventList);