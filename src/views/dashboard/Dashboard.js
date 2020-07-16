import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import Iframe from "react-iframe";
// import CIcon from "@coreui/icons-react";

const Dashboard = () => {
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Fellowship Google Calendar</CCardHeader>
            <CCardBody>
              <Iframe
                src="https://calendar.google.com/calendar/embed?height=800&amp;wkst=2&amp;bgcolor=%2305c4e2&amp;ctz=Asia%2FKolkata&amp;src=bWFqb3JsZWFndWVoYWNraW5nLmNvbV9wcjNuampoNG9rMHBpOTNqZnFtNTFqZzJnMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23E67C73&amp;showNav=1&amp;mode=AGENDA&amp;title=MLH%20Fellowship"
                style="border-width:0"
                width="100%"
                height="400"
                frameborder="0"
                scrolling="no"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
