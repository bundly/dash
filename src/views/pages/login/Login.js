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
    <div className="MainContainer">
    <div className="container-fluid">
      <div className={styled["landing-page-container"]}>
        <div className={styled.content__wrapper}>
          <header className={styled.header}>
            <h1 className="d-flex justify-content-center display-3">BUNDLY</h1>
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

{/* Features Section */}

<div className={`${styled.slide} ${styled.AlternateFeatures}`} >
            <div className={styled.TextContainer}>
                <span className={styled.upper}>
                    UpperLineText
                </span>
                
                <div className={styled.IntroText}>
                    <h1>Heading</h1>
                    <p>
                        Most bee jobs are small ones. But bees know that every small job, if it's done well means a lot. But choose carefully because you'll stay in the job you pick for the rest of your life.
                        
                    </p>
                </div>
                <span className={styled.lower}>
                    End Line with Link
                </span>
            </div>
            <div className={styled.CardsContainer}>
            <div className={styled.FeaturesFlex}>
                <div className={styled.Feature}>
                    <h1>Feature</h1>
                     
                    <span>link</span>
                </div>
                <div className={styled.Feature}>
                    <h1>Feature</h1>
                    
                    <span>link</span>
                </div>
               
            </div>
            <div className={styled.FeaturesFlex}>
                <div className={styled.Feature}>
                    <h1>Feature</h1>
                     
                    <span>link</span>
                </div>
                <div className={styled.Feature}>
                    <h1>Feature</h1>
                    
                    <span>link</span>
                </div>
               
            </div>
        </div>
        </div>

{/* AboutUS */}

<div className={`${styled.slide} ${styled.AboutUs}`} >
            <div className={`${styled.FeatureIntro} ${styled.TextCard}`}>
                
                
                <div className={styled.IntroText}>
                    <h1>AboutUs</h1>
                    <p>
                        Most bee jobs are small ones. But bees know that every small job, if it's done well means a lot. But choose carefully because you'll stay in the job you pick for the rest of your life.
                        
                    </p>
                </div>
                <span className={styled.lower}>
                    End Line with Link
                </span>
            </div>
            <div className={styled.ImageCardContainer}>
                <div className={styled.ImageCard}>
                    <span>
                        WORD
                    </span>
                   
                </div>
                <div className={styled.ImageCard}>
                    <span>
                        WORD
                    </span>
                    
                </div>
                <div className={styled.ImageCard}>
                    <span>
                        WORD
                    </span>
                    
                </div>
            </div>
        </div>

{/* OptionalSectionAccToTemplate */}

<div className={`${styled.slide} ${styled.OptionalSlide}`}>
            <div className={styled.TextContainer}>
                <span className={styled.upper}>
                    UpperLineText
                </span>
                
                <div className={styled.IntroText}>
                    <h1>Heading</h1>
                    <p>
                        Most bee jobs are small ones. But bees know that every small job, if it's done well means a lot. But choose carefully because you'll stay in the job you pick for the rest of your life.
                        
                    </p>
                </div>
                <span className={styled.lower}>
                    End Line with Link
                </span>
            </div>
            <div className={styled.FeaturesFlex}>
                <div className={styled.Feature}>
                    <h1>Feature</h1>
                    
                    <span>link</span>
                </div>
                <div className={styled.Feature}>
                    <h1>Feature</h1>
                    
                    <span>link</span>
                </div>
            </div>
        </div> 

{/* Contribute Section */}

<div className={`${styled.slide} ${styled.Contribute}`}>
            <div className={styled.TextContainer}>
                <h1>
                    Contribute
                </h1>
                <p>
                    If we lived in the topsy-turvy world Mr. Benson imagines, just think of what would it mean. I would have to negotiate with the silkworm for the elastic in my britches!
                </p>
                <span className={styled.lower}>
                    End Line with Link
                </span>
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
