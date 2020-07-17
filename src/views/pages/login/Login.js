import React, { useEffect } from "react";
import { default as axios } from 'axios';

// Host
const host = process.env.NODE_ENV === 'production' ? 'https://bundly.tech/api' : 'http://localhost:5000';

const loginUrl = `${host}/auth/github/login`;

const Login = ({ authenticate }) => {
  useEffect(() => {
    const fetchData = async () => {
      const authorized = await isLoggedIn();
      return authenticate(authorized);
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="container__item landing-page-container">
        <div className="content__wrapper">
          <header className="header">
            <h1 className="d-flex justify-content-center display-1">BUNDLY</h1>
            <ul className="social-container header__item">
              <li className="social__icon social__icon--fb">
                <img
                  src="https://image.flaticon.com/icons/svg/2111/2111425.svg"
                  alt="github"
                />
              </li>
              <li className="social__icon social__icon--dr">
                <img
                  src="https://image.flaticon.com/icons/svg/841/841568.svg"
                  alt="website"
                />
              </li>
            </ul>
          </header>
          <p className="coords">N 49° 16' 35.173" / W 0° 42' 11.30"</p>
          <div className="ellipses-container">
            <div className="greeting">
              <img
                src="https://i.giphy.com/media/l0iVAuEtPF5KRbqmvd/source.gif"
                alt="MLH thingy"
              />
            </div>
            <div className="login-github">
              <a
                className="button button--social-login button--github"
                href={loginUrl}
              >
                <i className="cib-github"></i>Login With Github
              </a>
            </div>
            <div className="ellipses ellipses__outer--thin">
              <div className="ellipses ellipses__orbit" />
            </div>
            <div className="ellipses ellipses__outer--thick" />
          </div>
          <div className="scroller">
            <p className="page-title">MLH</p>
            <div className="timeline">
              <span className="timeline__unit" />
              <span className="timeline__unit timeline__unit--active" />
              <span className="timeline__unit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const isLoggedIn = async () => {
  const base64Enc = localStorage.getItem("bundly-token");
  if (!base64Enc) { 
    return false;
  }

  const tokenb64 = JSON.parse(atob(base64Enc));

  const tokens = {};
  tokenb64.tokens.forEach((account) => {
    if (account.kind === "github") {
      tokens["githubToken"] = account.token.accessToken;
    } else if (account.kind === "discord") {
      tokens["discordToken"] = account.token.accessToken;
    }
  });

  console.log(`${host}/auth/verify`);
  console.log(JSON.stringify({ username: tokenb64.username, ...tokens }));

  const isAuthorized = await axios.post(`${host}/auth/verify`, {
    username: tokenb64.username,
    ...tokens,
  });

  return isAuthorized && isAuthorized.data.success;
};

export default Login;
