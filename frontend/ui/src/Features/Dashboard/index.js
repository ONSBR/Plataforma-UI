import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom'
import Header from '../Header'
import LastEvents from './components/lastEvents'
import QueuePanel from './components/queuePanel'

const styles = theme => ({
    root: {
      flexGrow: 1,
      marginTop:30
    },
});


class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            systemId: props.match.params.id
        }
    }
    render() {
        const { classes } = this.props;
        const { spacing } = this.state;
        return (
            <div>
                <Header systemId={this.state.systemId} />
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12}>
                    <Grid container className={classes.demo} justify="center" spacing={16}>
                        <Grid key={1} item>
                            <LastEvents/>
                        </Grid>
                        <Grid key={2} item>
                            <QueuePanel systemId={this.state.systemId}/>
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>

            </div>
        )
    }
}


Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Dashboard))
