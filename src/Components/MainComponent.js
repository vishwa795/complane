import React,{Component} from 'react';
import Header from './navComponent'
import Home from './HomeComponent';
import {Route,Redirect,withRouter, Switch} from 'react-router-dom';
class Main extends Component{
    render(){
        return(
            <div className="Main">
                <Header/>
                    <Switch location={this.props.location}>
                        <Route path="/home" component={Home} />
                        <Redirect to ="/home" />
                    </Switch>
            </div>
        )
    }
}

export default withRouter(Main);