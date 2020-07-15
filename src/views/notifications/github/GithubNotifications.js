import React from 'react';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
  CRow,
} from '@coreui/react';

import useSWR from 'swr';
import { githubNotificationFetcher } from '../../../scripts/githubAPI';

const getBadge = (type) => {
  switch (type) {
    case 'Issue': return 'primary';
    case 'Commit': return 'secondary';
    case 'PullRequest': return 'warning';
    default: return 'success';
  }
};

const GithubNotifications = () => {
  const { data, error } = useSWR('https://api.github.com/notifications', githubNotificationFetcher);

  const fields = ['notification', 'type', 'status'];
  const scopedSlots = {
    type:
      (item) => (
        <td>
          <CBadge color={getBadge(item.subject.type)} shape='pill'>
            {item.subject.type}
          </CBadge>
        </td>
      ),
    notification: (item) => (
      <td>
        <a href={item.subject.url}>{item.subject.title}</a>
      </td>
    ),
    status: (item) => (
      <td>
        <CButton block variant="outline" color="dark">{ item.unread ? 'Mark Read' : 'Mark Unread'}</CButton>
        <CButton block variant="outline" color="success">Add to ToDo</CButton>
      </td>
    ),

  };
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Github Notifications
            </CCardHeader>
            <CCardBody>
              {error && <p>Error Fetching Data</p>}
              {!data && !error && <p>Loading </p>}
              {data && (
              <CDataTable
                items={data}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={scopedSlots}
              />
              ) }
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default GithubNotifications;
