import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React, { useState, useEffect } from "react";
import ReactMde from "react-mde";
import { Converter as ShowdownConverter } from "showdown";

import yesterdayNotes from "../../../scripts/notesGenerator";
import { githubQuery } from "../../../scripts/githubAPI";
import { getUsername } from "../helpers";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new ShowdownConverter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const StandupNotes = (props) => {
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
  const currentTime = new Date();

  const username = getUsername();

  useEffect(() => {
    githubQuery({ time: currentTime.toISOString(), username: username }).then(
      (data) => {
        console.log(data);
        if (!data.errors)
          setValue(
            yesterdayNotes(data.data, currentTime.toISOString(), username)
          );
      }
    );
  }, [currentTime, username]);

  return (
    <CCard accentColor="primary">
      <CCardHeader>Standup Notes</CCardHeader>
      <CCardBody>
        <ReactMde
          value={value}
          onChange={setValue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          minEditorHeight={props.height ?? 650}
          minPreviewHeight={props.height ?? 650}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
      </CCardBody>
    </CCard>
  );
};

export default StandupNotes;
