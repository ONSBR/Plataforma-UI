import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom'
import Header from '../Header'
import LastEvents from './components/lastEvents'
import QueuePanel from './components/queuePanel'
import ReplayPanel from './components/replayPanel'
import Log from '../Logs/components/log'

const styles = theme => ({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: `${theme.spacing.unit * 3}px`,
    },
    paper: {
      padding: theme.spacing.unit,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing.unit,
    }
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
                <div>
                    <Grid container spacing={24}>
                        <Grid item xs={8}>
                            <Log container="event_manager" />
                        </Grid>
                        <Grid item xs={4}>
                            <ReplayPanel systemId={this.state.systemId}/><br/>
                            <LastEvents systemId={this.state.systemId}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Log container="maestro" systemId={this.state.systemId} />
                        </Grid>
                        <Grid item xs={4}>
                            <QueuePanel systemId={this.state.systemId}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Log systemId={this.state.systemId}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Log container="celery" systemId={this.state.systemId} />
                        </Grid>
                    </Grid>

                </div>
            </div>
        )
    }
}


Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Dashboard))
