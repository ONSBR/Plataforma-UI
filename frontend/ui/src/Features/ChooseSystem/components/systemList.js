import React from 'react'
import SystemService from '../../../Services/api/systems'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from 'react-router-dom'

const Button = withRouter(({ history }) => (
    <button
      type='button'
      onClick={() => { history.push('/new-location') }}
    >
      Click Me!
    </button>
  ))

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });


class SystemList extends React.Component {
    constructor(props){
        super(props)
        this.service = new SystemService()
        this.state = {
            systems:[],
        }
        this.selectSystemHandler = this.selectSystemHandler.bind(this)
    }
    selectSystemHandler(system){
       this.props.history.push("/system/"+system.id)
    }
    componentDidMount(){
        this.service.findAll().then(systems => {
            this.setState(s => {
                s.systems.push(...systems.data)
                return s
            })
        })
    }
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
              <List component="nav">
                {this.state.systems.map(system => (
                    <ListItem button>
                        <ListItemText onClick={() => this.selectSystemHandler(system)} primary={system.name} />
                    </ListItem>
                ))}
              </List>
            </div>
          );
    }
}

SystemList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SystemList));
