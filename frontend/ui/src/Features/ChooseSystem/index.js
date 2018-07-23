import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SystemList from './components/systemList'
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width:'400px',
    margin:'auto auto',
  },
});

const ChooseSystem = (props) => {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
         Escolha o Sistema
        </Typography>
        <SystemList/>
      </Paper>
    </div>
  );
}

ChooseSystem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChooseSystem);
