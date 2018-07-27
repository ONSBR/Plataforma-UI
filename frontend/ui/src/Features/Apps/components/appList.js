import React from 'react'
import AppService from '../../../Services/api/apps'
import AppCard from './appCard'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    root: {
      flexGrow: 1,
      margin:'auto auto',
      marginTop:30,
      width:'85%',

    },

  });

class AppList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            apps: [],
            systemId: props.systemId,
            classes:props.classes,
        }
        this.service = new AppService()
    }

    fetch(){
        this.service.findAll(this.state.systemId).then( ({data})=>{
            this.setState(s => {
                s.apps = data
                return s
            })
        })
    }
    componentDidMount(){
        //load apps
        this.fetch()
        this.intervalId = setInterval(()=>this.fetch(),5000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render(){
        var {apps,classes} = this.state
        return (
            <div className={classes.root}>
                <Grid container spacing={8}>
                    {apps.map(app => (
                        <Grid item xs>
                            <AppCard app={app} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }
}

AppList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(AppList);
