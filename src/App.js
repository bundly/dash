import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { default as axios } from 'axios';
import jwt_decode from 'jwt-decode';
import Auth from './views/auth/Auth';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Host
const host = process.env.NODE_ENV === 'production' ? 'https://bundly.tech/api' : 'http://localhost:5000';

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

  async componentDidUpdate() {
    let JWTtoken;
    try {
      JWTtoken = jwt_decode(localStorage.getItem("bundly-token"));
    } catch {
      return;
    }

    if (!JWTtoken) return;

    const tokens = {};
    JWTtoken.tokens.forEach((account) => {
      if (account.kind === "github") {
        tokens["githubToken"] = account.token.accessToken;
      } else if (account.kind === "discord") {
        tokens["discordToken"] = account.token.accessToken;
      }
    });

    console.log(`${host}/auth/verify`);

    const isAuthorized = await axios.post(`${host}/auth/verify`, { username: JWTtoken.username, ...tokens });

    if (isAuthorized && isAuthorized.data.success) {
      return this.setState({ isLoggedIn: true });
    }
  }

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/auth" name="Auth Callback" render={props => <Auth {...props} />} />
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}


export default App;
