import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Auth from './views/auth/Auth';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Host
export const host =
  process.env.NODE_ENV === "production"
    ? "https://bundly.tech/api"
    : "http://localhost:5000";

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {
  state = {
    isLoggedIn: false,
  };

  authorize = (isAuthorized) => {
    if (isAuthorized) {
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    const { isLoggedIn } = this.state;
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/auth" name="Auth Callback" render={props => <Auth {...props} /> } />
              <Route exact path="/login" name="Login Page" render={props => !isLoggedIn ? <Login authenticate={this.authorize} {...props}/> : <Redirect to='/' /> } />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => isLoggedIn ? <TheLayout {...props}/> : <Redirect to='/login' />} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
