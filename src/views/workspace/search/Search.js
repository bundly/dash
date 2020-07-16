import React, {useState} from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import ReactMarkdown from 'react-markdown';
import {githubSearch} from '../../../scripts/githubAPI'
import SearchBar from "@bit/lekanmedia.shared-ui.search-bar";

const style = {
  margin: "40px",
  display: "block",
  justifyContent: "center",
  alignItem: "center",
  textAlign: "center",
  fontSize: "1.5em",
};

const processResults = (searchResults) => {
  const results = searchResults.map(result=>{
    return (
      <CCol xs="12" sm="6" md="12">
        <CCard accentColor="success">
    <CCardHeader><b><a href={result.html_url}>Title: {result.title}</a></b><a href={result.repository_url.replace('api.','').replace('repos/','')}>{'      '}{result.repository_url.replace('https://api.github.com/repos/','')}</a> Search Score: {result.score}</CCardHeader>
          <CCardBody>
            <ReactMarkdown source={result.body} />
          </CCardBody>
        </CCard>{" "}
      </CCol>
    );
  })
  return results;
};
const Search = () => {
  const [done,setDone] = useState(false)
  const [results,setResults] = useState([])
  const [count,setCount] = useState(undefined)
  const handleSearch = (query) => {
    setDone(false)
    githubSearch(query).then((res)=>{
      setCount(res.data.total_count)
      setResults(res.data.items)
      setDone(true)
    })
  }


  return (
    <>
      <CCard>
        <CCardHeader>
          Search your discord and github
          <div className="card-header-actions">
            <a href="https://github.com/bundly" className="card-header-action">
              {/* <small className="text-muted">@discord</small> */}
            </a>
          </div>
        </CCardHeader>
        <CCardBody>
          <div className="card text-center">
            <div style={style}>
              <SearchBar placeholder="Search here..." done={done} onSearch={(e)=>handleSearch(e)} />
            </div>
          </div>
        </CCardBody>
        <CCardBody>
          {count>0?`Found ${count} results`:''}
          <CRow>
            {processResults(results)}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Search;

let PRinfo = "- [x] Add custom message support in jest-worker \n - [x] Update `onCustomMessage` functions to pass tests (caused by updating its Type)\n API implemented as suggested here - https://github.com/facebook/jest/issues/6616#issuecomment-402782271 \n- [x] Fix the memory leak issue";
