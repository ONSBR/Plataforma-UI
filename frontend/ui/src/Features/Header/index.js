import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import PlatformService from '../../Services/api/platform'
import { withRouter } from 'react-router-dom'
import Menu from './components/menu'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },

};

class  Header extends React.Component {

    constructor(props) {
        super(props)
        this.platformService = new PlatformService()
        this.menu = React.createRef();
        this.state = {
            menuOpen:false,
            isLocked:false,
            hasNotifications:false,
            hasReprocessing:false,
            systemId:this.props.systemId,
        }
        this.toggleMenu  = this.toggleMenu.bind(this)
    }

    componentDidMount(){
        this.intervalId = setInterval(()=>{
            this.platformService.isLocked(this.state.systemId).then(({data}) => {
                if (data.locked) {
                    this.setState(s => {
                        s.isLocked = data.locked
                        return s
                    })
                }
            })
        },5000)
    }

    componentWillUnmount(){
        clearInterval(this.intervalId)
    }

    toggleMenu(){
        this.setState(state => {
            state.menuOpen = !state.menuOpen
            return state
        })
    }
    render(){
        const { classes } = this.props;
        var self = this;
        return (
            <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => this.toggleMenu()}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Plataforma
                </Typography>
                <div>
                    <IconButton color={this.props.isLocked ? "error":"inherit"} aria-label="lock">
                        <Icon>{this.props.isLocked ? "lock":"lock_open"}</Icon>
                    </IconButton>
                    <IconButton color="inherit" aria-label="notifications">
                        <Icon>notifications</Icon>
                    </IconButton>
                    <IconButton color="inherit" aria-label="reprocessing">
                        <Icon>autorenew</Icon>
                    </IconButton>
                </div>
                </Toolbar>
            </AppBar>
            <Menu open={this.state.menuOpen} systemId={this.state.systemId} toggleDrawer={()=> this.toggleMenu()}/>
            </div>
        );
    }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Header));