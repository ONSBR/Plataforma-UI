import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReplayService from '../../../Services/api/replay'
import { Icon } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';


const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    red:{
        color:"red",
        border:"1px solid black",
        padding:"3px",
        paddingLeft:"8px",
        paddingRight:"8px",
    },

    gray:{
        color:"gray",
        border:"1px solid black",
        padding:"3px",
        paddingLeft:"8px",
        paddingRight:"8px",
    },
    rootList:{
        maxHeight:"200px",
        overflow:"auto",
    }

  });

class ReplayPanel extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            recording:false,
            playing:false,
            systemId:props.systemId,
            tapes:[],
        }
        this.service = new ReplayService()
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording  = this.stopRecording.bind(this);
        this.downloadTape = this.downloadTape.bind(this);
    }


    componentWillMount(){
        this.service.isRecording(this.state.systemId).then(req => {
            if(req.data.recording === true) {
                this.setState(s => {
                    s.recording = true
                    s.playing = false
                    return s
                })
            }
        })
        this.service.tapes(this.state.systemId).then(tapes => {
            this.setState(s => {
                s.tapes = tapes.data;
                return s;
            })
        })
    }

    startRecording(){
        this.service.rec(this.state.systemId).then(r => {
            console.log(r);
            this.setState(s => {
                s.recording = !s.recording;
                s.playing = false;
                return s;
            })
        })
    }

    stopRecording(){
        this.service.stop(this.state.systemId).then(req => {
            if (req.status === 200){
                this.setState(s => {
                    s.recording = false;
                    s.playing = false;
                    return s;
                })
                this.service.tapes(this.state.systemId).then(tapes => {
                    this.setState(s => {
                        s.tapes = tapes.data;
                        return s;
                    })
                })
            }
        })

    }

    downloadTape(tape){
        this.service.download(this.state.systemId,tape).then(req => {
            console.log(req);
        });
    }

    render(){
        const {classes} = this.props;
        return (
            <div>
            <Paper className={classes.root} elevation={1}>
                 <Typography variant="headline" component="h3">
                 Gravações
                 </Typography>
                 {(this.state.recording === true ? <Icon onClick={this.stopRecording} className={classes.gray}>stop</Icon> :  <Icon onClick={this.startRecording} className={classes.red}>lens</Icon>)}
                 &nbsp;<Icon className={classes.gray}>publish</Icon>
                 <br/>
                 <div className={classes.rootList}>
                    <List>
                        {this.state.tapes.sort().reverse().map(tape => (
                            <ListItem>
                                <ListItemText primary={tape}/>
                                <ListItemIcon>
                                    <Icon>delete</Icon>
                                </ListItemIcon>
                                <ListItemIcon>
                                    <a href={this.service.downloadURL(this.state.systemId,tape)} target={"_blank"}><Icon>cloud_download</Icon></a>
                                </ListItemIcon>
                            </ListItem>

                        ))}
                    </List>
                </div>
            </Paper>
            </div>
        )
    }
}

ReplayPanel.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ReplayPanel);