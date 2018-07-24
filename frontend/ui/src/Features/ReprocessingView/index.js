import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header'
import ReprocessingList from './components/reprocessingList';
import ReprocessingDetail from './components/reprocessingDetail'
import ReprocessingService from '../../Services/api/reprocessing'
import Snackbar from '@material-ui/core/Snackbar';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
      display:'flex',
    }
  });
class ReprocessingView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status:"",
            reprocessing:{
                origin:{
                    payload:{},
                },
                events:[],
                pendingEvent: {},
                history:[]
            },
            open: false,
            vertical: 'top',
            horizontal: 'right',
            message: '',
        }
        this.onDetailHandler = this.onDetailHandler.bind(this)
        this.service = new ReprocessingService()
    }

    onDetailHandler(reprocessing) {
        this.setState(s => {
            s.reprocessing = reprocessing
            return s
        })
    }
    approve(reprocessing){
        //TODO alterar para quando tiver o usuário logado
        this.service.approve(reprocessing.id,"user")
        this.setState(s => {
            s.open = true;
            s.message = 'O reprocessamento será iniciado'
            return s
        })
    }

    skip(reprocessing){
        //TODO alterar para quando tiver o usuário logado
        this.service.skip(reprocessing.id,"user")
        this.setState(s => {
            s.open = true;
            s.message = 'O reprocessamento será abortado'
            return s
        })
    }

    onClose(){
        this.setState(s => {
            s.open = false;
            s.message = '';
            return s
        })
    }

    onActionHandler(reprocessing, action) {
        if (action === "check") {
            this.approve(reprocessing)
        }else{
            this.skip(reprocessing)
        }
    }

    render() {
        const { classes } = this.props;
        const { vertical, horizontal, open } = this.state;
        return (
            <div>
            <Header systemId={this.props.match.params.id} />
            <div className={classes.root}>
                <div className="col">
                    <ReprocessingList systemId={this.props.match.params.id} status={this.state.status} onActionHandler={(rep,action)=>this.onActionHandler(rep,action)}  onDetailHandler={(rep)=>this.onDetailHandler(rep)}/>
                </div>
                <div className="col">
                    <ReprocessingDetail reprocessing={this.state.reprocessing} />
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={()=>this.onClose()}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.state.message}</span>}
                />
            </div>
        );
    }
}
ReprocessingView.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ReprocessingView)