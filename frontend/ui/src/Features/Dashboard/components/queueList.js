import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 760,
    backgroundColor: theme.palette.background.paper,
    maxHeight:560,
    overflowY:'auto',
    overflowX: 'hidden',
  },
});

class QueueList extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const { classes, queues } = this.props;
    return (
        <div className={classes.root}>
        <List>
            {queues.map(q => (
                <ListItem>
                    <ListItemText primary={q.name} secondary={"mensagens="+q.messages} />
                </ListItem>
            ))}
        </List>
        </div>
    );
  }
}

QueueList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QueueList);