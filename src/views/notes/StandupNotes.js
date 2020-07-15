import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
} from '@coreui/react';
import React, {useState} from "react";
import ReactMde from "react-mde";
import {Converter as ShowdownConverter} from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import yesterdayNotes from '../../scripts/notesGenerator'
import {githubQuery} from '../../scripts/githubAPI'

const converter = new ShowdownConverter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});


const StandupNotes = () => {


  const [value, setValue] = useState(`
### Generating Standup Notes
**Yesterday**:
 -

**Today**:
 -

**Blockers**:
 -

**Shoutouts**:
 - @username for x
 `);
  const [selectedTab, setSelectedTab] = useState("write");
  const currentTime = new Date()

  githubQuery(currentTime.toISOString())
  .then((data)=>{
    console.log(data)
    if(!data.errors) setValue(yesterdayNotes(data.data, currentTime.toISOString()))
  })

  return(
    <CCol xs="12" sm="6" md="6" >
    <CCard accentColor="primary">
    <CCardHeader>
      Standup Notes
    </CCardHeader>
    <CCardBody>
    <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </CCardBody>
    </CCard>
    </CCol>
  )
};

export default StandupNotes;
