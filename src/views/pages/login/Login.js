import React, { useEffect } from "react";
import { default as axios } from "axios";
import AboutImage from "../../../assets/Images/abstract-595.png";
import ContributeImage from "../../../assets/Images/bundlybox.png";
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
    <div className={styled["main-container"]}>
      <div className={styled.containerfluid}>
        <div className={styled["landing-page-container"]}>
          <div className={styled.content__wrapper}>
            <header className={styled.header}>
              <h1 className="d-flex justify-content-center display-3">
                BUNDLY
              </h1>
            </header>
            <p className={styled.coords}>
              S 75° 6' 0.027" / E 123° 19' 59.998"
            </p>
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
                  className={`${styled.button} ${styled["btn-effect"]} ${styled["button--social-login"]} ${styled["button--github"]}`}
                  href={loginUrl}
                >
                  Login With Github
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styled["features-container"]}>
        <div className={`${styled.features} ${styled.slide}`}>
          <div className={styled["text-container"]}>
            <div className={styled["intro-text"]}>
              <h1>Generate Standup Notes in markdown automatically</h1>
              <p>
                Bundly Looks through the Pull Requests Reviewed, Issues
                inreracted with, Pull requests opened, commits made and even the
                previous day's standup and generates standup notes.
              </p>
              <p>
                Also supports people in multiple pods and shows sugessions from
                previous day's standup notes from all pods !
              </p>
            </div>
          </div>
          <div className={styled["gif-card"]}>
            <img
              src="https://user-images.githubusercontent.com/11258286/87809620-50c66a00-c879-11ea-8f1b-b7885c828333.gif"
              alt="gif-Feature"
            ></img>
          </div>
        </div>

        <div className={`${styled.features} ${styled.slide}`}>
          <div className={styled["text-container"]}>
            <div className={styled["intro-text"]}>
              <h1>Access internal discussions instantly</h1>
              <p>
                Quickly search through MLH Fellowship Org discussions with the
                search tool.
              </p>
            </div>
          </div>
          <div className={styled["gif-card"]}>
            <img
              src="https://user-images.githubusercontent.com/28642011/87812445-d6e4af80-c87d-11ea-923e-5efeebf950dc.gif"
              alt="gif-Feature"
            ></img>
          </div>
        </div>

        <div className={`${styled.features} ${styled.slide}`}>
          <div className={styled["text-container"]}>
            <div className={styled["intro-text"]}>
              <h1>Never miss out on the important stuff</h1>
              <p>
                Receive personalized notifications for your repositories
                including:
              </p>
              <ul>
                <li>Issues and their comments</li>
                <li>Pull Requests and their comments</li>
                <li>Comments on any commits</li>
              </ul>
              Notifications are also sent for conversations in unwatched
              repositories when the user is involved including:
              <ul>
                <li>@mentions</li>
                <li>Issue assignments</li>
                <li>Commits the user authors or commits</li>
                <li>Any discussion in which the user actively participates</li>
              </ul>
            </div>
          </div>
          <div className={styled["gif-card"]}>
            <img
              src="https://user-images.githubusercontent.com/11258286/87809923-cfbba280-c879-11ea-8364-a0dee9df61e2.gif"
              alt="gif-Feature"
            ></img>
          </div>
        </div>

        <div className={`${styled.features} ${styled.slide}`}>
          <div className={styled["text-container"]}>
            <div className={styled["intro-text"]}>
              <h1>Track tasks easily</h1>
              <p>Add notifications from github to your ToDo list directly</p>
            </div>
          </div>
          <div className={styled["gif-card"]}>
            <img
              src="https://user-images.githubusercontent.com/11258286/87809923-cfbba280-c879-11ea-8364-a0dee9df61e2.gif"
              alt="gif-Feature"
            ></img>
          </div>
        </div>
      </div>

      <div className={`${styled.about} ${styled.slide}`}>
        <div className={styled["text-container"]}>
          <div className={styled["intro-text"]}>
            <h1>What is Bundly?</h1>
            <ul>
              <li>Let Bundly do its work, so you can focus on yours.</li>
              <li>
                Bundly is a single heaven to find all your information regarding
                the MLH Fellowship at once place!
              </li>
              <li>
                It let's you take your utility tools, a step further. Designed
                specifically to enhance your Fellowship experience.
              </li>
            </ul>
          </div>
        </div>
        <div className={styled["gif-card"]}>
          <img src={AboutImage} alt="About"></img>
        </div>
      </div>

      <div className={`${styled["contribute"]} ${styled.slide}`}>
        <div className={styled["img-container"]}>
          <img src={ContributeImage} alt="ContributeImg"></img>
          <h2>Let's set up your developer dashboard</h2>
        </div>
        <div className={styled["btn-container"]}>
          <a href={loginUrl} className={`${styled["contribute-button"]}`}>
            Login to Bundly
          </a>
          <a
            href="https://github.com/bundly/dash"
            className={`${styled["contribute-button"]}`}
          >
            Contribute to development
          </a>
        </div>
      </div>

      <div className={styled.copyright}>Copyright &copy; 2020 Bundly</div>
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
