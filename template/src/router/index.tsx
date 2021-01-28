import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AsyncComponent from '@components/AsyncComponent';
import {baseName} from '@constant/index';
// 通用首页
const Home = AsyncComponent(()=> import('@views/Home'));
// 关于我们
const About = AsyncComponent(()=> import('@views/About'));
// Not found
const NotFound = AsyncComponent(()=> import('@views/NotFound'));

class RouteContainer extends Component<any,object> {
  constructor(props) {
    super(props);
  }
  render() {
    let routes = (
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/About' component={About} />
        <Route component={NotFound} />
      </Switch>
    );
    console.log('baseName',baseName);
    return (
      <BrowserRouter basename={baseName}>
        <div style={{height: '100vh'}}>
          {routes}
        </div>
      </BrowserRouter>
    );
  }
}
export default RouteContainer;
