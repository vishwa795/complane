import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import { Spinner } from 'reactstrap';

export default function ProtectedRoute({component:Component,isAuthenticated,isLoading, isAuthenticationReq,...rest}){
    return(
        <Route {...rest} render={(props) =>{
            if(isLoading){
                return(
                    <div className="container">
                        <div className="text-center mt-5">
                            <Spinner color="primary" />
                        </div>
                    </div>
                )
            }
            else if((isAuthenticated && !isLoading) || (!isAuthenticationReq && !isLoading)){
                return <Component {...props} />
            }
            else{
                return <Redirect to="/home" />
            }
        }} />
    )
}