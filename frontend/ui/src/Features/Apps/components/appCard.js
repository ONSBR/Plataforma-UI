import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppDetail from './appDetail'
const styles = theme => ({
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  area:{
      margin:'auto auto',
      textAlign:'center',
  }
});

class AppCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            expanded: false,
        };
        this.handleSendEvent = this.handleSendEvent.bind(this)
    }

    handleSendEvent(){
        console.log("send event")
    }

  handleExpandClick = () => {
    this.setState(state => {
        state.expanded = !state.expanded
        return state
    });
  };

  renderFull(){
    const {classes,app} = this.props
    return (
        <div>

        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label={app.name} className={classes.avatar}>
                {app.name[0].toUpperCase()}
              </Avatar>
            }
            title={app.name}
            subheader={app.type}
            action={<IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>}
          />
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <AppDetail handleSendEvent={(body)=> this.handleSendEvent(body)} app={app}/>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    )
  }

  renderShort(){
    const {classes,app} = this.props
    return (
        <div>

        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label={app.name} className={classes.avatar}>
                {app.name[0].toUpperCase()}
              </Avatar>
            }
            title={app.name}
            subheader={app.type}
          />
        </Card>
      </div>
    )
  }
  render() {
    const { app } = this.props;

    return (
      app.type === "domain" ? this.renderShort() : this.renderFull()
    );
  }
}

AppCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppCard);
