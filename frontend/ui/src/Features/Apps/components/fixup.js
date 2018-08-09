import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppService from '../../../Services/api/apps'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 600,
        maxWidth: 600,
    },
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


class Fixup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            operations:[],
            current:{},
            processId:props.processId,
            origin: "",
            selected:"",
            destiny:[],
        }
        this.service = new AppService()
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeOrigin = this.handleChangeOrigin.bind(this)
        this.handleFixup = this.handleFixup.bind(this)
    }

    fetch(){
        console.log("buscar operações da app ", this.state.processId)
        this.service.findAllOperations(this.state.processId,0,0).then(({data})=>{
            this.setState(s => {
                if (data.length > 0) {
                    s.current = data[0]
                }else{
                    s.current = {}
                }
                s.operations = data;
                return s
            });
        })
    }

    componentWillMount(){
        this.fetch()
        this.interval = setInterval(()=>{
            this.fetch()
        },5000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    handleChange(event){
        this.setState(s => {
            s.destiny= event.target.value;
            return s
        });
    }

    handleFixup(){
        this.service.fixup(this.state.origin,this.state.destiny).then(()=>{
            alert("As versões foram reconfiguradas")
        })
    }

    handleChangeOrigin(event){
        this.setState(s => {
            s.origin= event.target.value;
            return s
        });
    }

    render(){
        var  {operations, current} = this.state
        var {classes} = this.props
        return (
            <div>
            <Paper className={classes.root} elevation={1}>
                <Typography>
                <b>Deploy mais recente:</b><br/>
                <b>Imagem:</b>{current.image}<br/>
                <b>Versão:</b>{current.version}
                <br/>
                <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-checkbox">Versão de Origem</InputLabel>
                        <Select
                            value={this.state.origin}
                            onChange={(e)=> this.handleChangeOrigin(e)}
                            input={<Input id="select-multiple-checkbox" />}
                            MenuProps={MenuProps}
                        >
                            {operations.map(op => (
                            <MenuItem key={op.id} value={op.id}>
                                <ListItemText primary={op.version} />
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Typography>
                <Typography>
                <br/>
                <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple-checkbox">Versões de Destino</InputLabel>
                        <Select
                            multiple
                            value={this.state.destiny}
                            onChange={(e)=> this.handleChange(e)}
                            input={<Input id="select-multiple-checkbox" />}
                            renderValue={selected => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {operations.map(op => (
                            <MenuItem key={op.id} value={op.id}>
                                <Checkbox checked={this.state.destiny.indexOf(op.id) > -1} />
                                <ListItemText primary={op.version} />
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Typography>
                <br/>
                <Button onClick={()=>this.handleFixup()}>
                  Fix Up
                </Button>
            </Paper>
            </div>
        )
    }
}

Fixup.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(Fixup);
