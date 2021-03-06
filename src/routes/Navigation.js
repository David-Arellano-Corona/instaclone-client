import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import { map } from 'lodash';

export default function Navigation(){
    return (
        <Router>
            <Switch>
                {
                    map(routes,(route, index) => (
                        <Route
                        key={index}
                        path={route.path}
                        render={(props) =>
                            (
                                <route.layout>
                                    <route.component
                                        {...props}
                                    />
                                </route.layout>
                            )
                        }
                        exact={route.exact}
                        />
                    ))
                }
            </Switch>
        </Router>
    )
}