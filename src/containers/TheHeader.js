import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CBreadcrumbRouter,
  CSubheader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { TheHeaderDropdown } from "./index";
import { getToken as getGithubToken } from "../scripts/githubAPI";
import { getToken as getDiscordToken } from "../scripts/discordAPI";

// routes config
import routes from "../routes";
import { host } from "../App";

const githubToken = getGithubToken().token;
const discordToken = getDiscordToken().token;
const loginUrl = `${host}/auth/discord/login?token=${githubToken}`;

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto"></CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          {!discordToken && (
            <a href={loginUrl}>
              <button type="button" className="btn btn-dark">
                <i className="cib-discord"> </i> Login with Discord
              </button>
            </a>
          )}
          {discordToken && (
            <button type="button" className="btn btn-dark" disabled>
              <i className="cib-discord"> </i> Discord Logged In
            </button>
          )}
          <div style={{paddingLeft: 10}}>
            <button type="button" className="btn btn-dark">
                <i className="cib-github"> </i> Github Logged In
            </button>
          </div>
        </div>
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
