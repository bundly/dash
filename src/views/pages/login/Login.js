import React from "react";
import axios from "axios";

const loginUrl =
  process.env.NODE_ENV === "production"
    ? "https://bundly.tech/api/auth/github/login"
    : "http://localhost:5000/auth/github/login";

const Login = () => {
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
            <div className="login-github" onClick={githubLogin}>
              <div className="button button--social-login button--github">
                <i className="cib-github"></i>Login With Github
              </div>
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

const githubLogin = async () => {
  const response = await axios.get(loginUrl);
  console.log(response);
};

export default Login;
