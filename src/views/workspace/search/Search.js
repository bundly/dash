import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import ReactMarkdown from 'react-markdown';

import SearchBar from "@bit/lekanmedia.shared-ui.search-bar";

const style = {
  margin: "40px",
  display: "block",
  justifyContent: "center",
  alignItem: "center",
  textAlign: "center",
  fontSize: "1.5em",
};

const showResults = () => {
  const results = [];
  for (let index = 0; index < 4; index++) {
    results.push(
      <CCol xs="12" sm="6" md="12">
        <CCard accentColor="success">
          <CCardHeader><b>Github: </b>@Kunal made a Pull Request for #1</CCardHeader>
          <CCardBody>
            <ReactMarkdown source={PRinfo} />
          </CCardBody>
        </CCard>{" "}
      </CCol>
    );
  }

  return results;
};
const Search = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          Search your discord and github
          <div className="card-header-actions">
            <a href="https://github.com/bundly" className="card-header-action">
              <small className="text-muted">@discord</small>
            </a>
          </div>
        </CCardHeader>
        <CCardBody>
          <div className="card text-center">
            <div style={style}>
              <SearchBar placeholder="Search here..." />
            </div>
          </div>
        </CCardBody>
        <CCardBody>
          <CRow>
            {showResults()}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Search;

let PRinfo = "- [x] Add custom message support in jest-worker \n - [x] Update `onCustomMessage` functions to pass tests (caused by updating its Type)\n API implemented as suggested here - https://github.com/facebook/jest/issues/6616#issuecomment-402782271 \n- [x] Fix the memory leak issue";
