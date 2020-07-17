import React from "react";
import { CCol, CRow } from "@coreui/react";
import GithubNotifications from '../notifications/github/GithubNotifications';
import StandupNotes from '../notes/standup/StandupNotes';
import ToDo from '../notes/todo/ToDo';

const Dashboard = () => {
  return (
    <>
      <CRow>
      <CCol sm="12" md="12" lg="12">
      <GithubNotifications />
      </CCol>
      </CRow>
      <CRow>
      <CCol sm="12" md="6" lg="6">
      <ToDo height={200}/>
      </CCol>
      <CCol sm="12" md="6" lg="6">
        <StandupNotes height={340} />
      </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
