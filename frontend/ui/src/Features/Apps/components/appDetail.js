import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SendEvent from './sendEvent'
import AppVersions from './appVersions'
import Fixup from './fixup'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
});

class AppDetails extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { handleSendEvent,classes, theme, app } = this.props;
    const {value} = this.state
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Evento" />
            <Tab label="Versões" />
            <Tab label="Fixup de Imagens" />
            <Tab label="Deploys" />
          </Tabs>
        </AppBar>
        {value === 0 ? <TabContainer dir={theme.direction}><SendEvent handleSendEvent={(body)=> handleSendEvent(body)}/></TabContainer>
          : value === 1 ?  <TabContainer dir={theme.direction}><AppVersions processId={app.id} /></TabContainer>
          : value === 2 ? <TabContainer dir={theme.direction}><Fixup processId={app.id} /></TabContainer>
          : <TabContainer dir={theme.direction}>Item 4</TabContainer>
        }
      </div>
    );
  }
}

AppDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppDetails);
