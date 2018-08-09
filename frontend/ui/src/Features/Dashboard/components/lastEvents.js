import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppService from '../../../Services/api/apps';
import EventList from './eventList'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import TimerIcon from '@material-ui/icons/Timer';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing.unit,
      },
    chip: {
        margin: theme.spacing.unit,
    },
  });


class LastEvents extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            events:[],
            last:"1h",
        }
        this.service = new AppService()
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){
        this.refresh()
        this.interval = setInterval(()=>{
            this.refresh()
        },3000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }


    refresh(){
        setTimeout(()=>{
            this.service.events("","",this.state.last).then( ({data}) => {
                this.setState(s => {
                    s.events = data
                    return s
                })
            })
        },1)
    }

    handleClick(last){
        this.setState(s => {
            s.last = last;
            return s
        })
        this.refresh()
    }

    render(){
        const { classes } = this.props;

        return (
            <div>
            <Paper className={classes.paper}>
                <Typography variant="headline" component="h3">
                Últimos eventos
                </Typography>
                <Typography component="p">
                <Chip avatar={
                    <Avatar>
                        <TimerIcon />
                    </Avatar>
                    }
                    label="1m"
                    onClick={()=> this.handleClick("1m")}
                    className={classes.chip}
                />
                <Chip avatar={
                    <Avatar>
                        <TimerIcon />
                    </Avatar>
                    }
                    label="10m"
                    onClick={()=> this.handleClick("10m")}
                    className={classes.chip}
                />
                <Chip avatar={
                    <Avatar>
                        <TimerIcon />
                    </Avatar>
                    }
                    label="30m"
                    onClick={()=> this.handleClick("30m")}
                    className={classes.chip}
                />
                <Chip avatar={
                    <Avatar>
                        <TimerIcon />
                    </Avatar>
                    }
                    label="1h"
                    onClick={()=> this.handleClick("1h")}
                    className={classes.chip}
                />
                <Chip avatar={
                    <Avatar>
                        <TimerIcon />
                    </Avatar>
                    }
                    label="1d"
                    onClick={()=> this.handleClick("1d")}
                    className={classes.chip}
                />
                <Chip avatar={
                    <Avatar>
                        <TimerIcon />
                    </Avatar>
                    }
                    label="5d"
                    onClick={()=> this.handleClick("5d")}
                    className={classes.chip}
                />
                </Typography>
                <Typography component="p">
                  Filtro: {this.state.last}
                </Typography>
                <EventList events={this.state.events}/>
            </Paper>
            </div>
        );
    }
}

LastEvents.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(LastEvents);
