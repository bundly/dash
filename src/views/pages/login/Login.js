import React, { useEffect } from "react";
import { default as axios } from "axios";

import { host } from "../../../App";
import styled from "../../../scss/login.module.scss";

const loginUrl = `${host}/auth/github/login`;

const Login = ({ authenticate }) => {
  useEffect(() => {
    const fetchData = async () => {
      const authorized = await isLoggedIn();
      return authenticate(authorized);
    };
    fetchData();
  }, [authenticate]);

  return (
    <div className="container-fluid">
      <div className={styled["landing-page-container"]}>
        <div className={styled.content__wrapper}>
          <header className={styled.header}>
            <h1 className="d-flex justify-content-center display-3">BUNDLY</h1>
            {/* <ul
              className={`${styled["social-container"]} ${styled.header__item}`}
            >
              <li
                className={`${styled.social__icon} ${styled["social__icon--fb"]}`}
              >
                <img
                  src="https://image.flaticon.com/icons/svg/2111/2111425.svg"
                  alt="github"
                />
              </li>
              <li
                className={`${styled.social__icon} ${styled["social__icon--dr"]}`}
              >
                <img
                  src="https://image.flaticon.com/icons/svg/841/841568.svg"
                  alt="website"
                />
              </li>
            </ul> */}
          </header>
          <p className={styled.coords}>S 75° 6' 0.027" / E 123° 19' 59.998"</p>
          <div className={styled["ellipses-container"]}>
            <div className={styled.greeting}></div>
            <div
              className={`${styled.ellipses} ${styled["ellipses__outer--thin"]}`}
            ></div>
            <div
              className={`${styled.ellipses} ${styled["ellipses__outer--thick"]}`}
            />
          </div>
          <div className={styled.scroller}>
            <p className={styled["page-title"]}>MLH</p>
            <div className={styled.timeline}>
              <span className={styled.timeline__unit} />
              <span
                className={`${styled.timeline__unit} ${styled["timeline__unit--active"]}`}
              />
              <span className={styled.timeline__unit} />
            </div>
          </div>
          <div className="text-center">
            <div className={styled["login-github"]}>
              <a
                className={`${styled.button} ${styled["button--social-login"]} ${styled["button--github"]}`}
                href={loginUrl}
              >
                Login With Github
              </a>
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

  // console.log(`${host}/auth/verify`);
  // console.log(JSON.stringify({ username: tokenb64.username, ...tokens }));

  const isAuthorized = await axios.post(`${host}/auth/verify`, {
    username: tokenb64.username,
    ...tokens,
  });

  return isAuthorized && isAuthorized.data.success;
};

export default Login;
