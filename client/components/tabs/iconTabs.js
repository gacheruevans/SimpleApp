import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Edit from '@material-ui/icons/Edit';
import PersonPinIcon from '@material-ui/icons/PersonPin';

//Imports style
import './styles.scss';

class IconTabs extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Paper square className="root">
                <Tabs
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                >
                <Tab icon={<PersonPinIcon />} label={this.props.username} />
                <Tab icon={<Edit />} onClick={this.props.editDetails} label='Edit' />
                <Tab icon={<ExitToApp/>} onClick={this.props.exitApp} label="Exit"/>
                </Tabs>
            </Paper>
        );
    } 
}
export default IconTabs;
