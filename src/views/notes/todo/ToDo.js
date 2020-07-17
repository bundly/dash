import {
  CCard,
  CCardBody,
  CCardHeader,
  CSwitch,
  CRow,
  CCol,
  CButton,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import ReactMde from "react-mde";
import { Converter as ShowdownConverter } from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import ReactMarkdown from "react-markdown";
import { saveToDo, getToDo } from "../helpers";

const converter = new ShowdownConverter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const ToDo = (props) => {
  const [value, setValue] = useState(`
## To Do
 - Example Task
 `);

  const [selectedTab, setSelectedTab] = useState("write");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    // getToDo().then((todo) => {
    //   setValue(todo.data.markdown);
    // });
    setValue(localStorage.getItem('todo'))
  }, []);

  return (
    <CCard accentColor="info">
      <CCardHeader>
        <CRow>
          <CCol sm="9" md="9" lg="9">
            TO DO
          </CCol>
          <CCol sm="1" md="1" lg="1">
            <CSwitch
              variant="3d"
              className="float-right mb-0"
              color="info"
              size="lg"
              tabIndex="1 "
              type="checkbox"
              checked={preview}
              onChange={() => setPreview(!preview)}
            />
          </CCol>
          <CCol sm="2" md="2" lg="2">
            <CButton
              active
              block
              color="primary"
              onClick={() => saveToDo(value)}
            >
              Save
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol>
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
            {/* <CTextarea
                      name="textarea-input"
                      id="textarea-input"
                      rows={20}
                      value={value}
                      onChange={(e)=>{setValue(e.target.value);}}
      /> */}
          </CCol>
          {preview && (
            <CCol>
              <ReactMarkdown source={value} />
            </CCol>
          )}
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default ToDo;
