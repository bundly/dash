import React, {useEffect, useState} from 'react';
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

import { githubNotificationFetcher, markNotification } from '../../../scripts/githubAPI';

const getBadge = (type) => {
  switch (type) {
    case 'Issue': return 'primary';
    case 'Commit': return 'secondary';
    case 'PullRequest': return 'warning';
    default: return 'success';
  }
};

const cleanData = (data) => {
  if(data) return data.map(item => {
    return {
        id: item.id,
        type: item.subject.type,
        title: item.subject.title,
        unread: item.unread,
        reason: item.reason,
        repo: item.repository.full_name,
        repo_url: item.repository.html_url,
        subject: {type: item.subject.type, url: item.subject.url.replace('api.','').replace('repos/','')}
    }
  })
}

  const GithubNotifications = () => {

  const [cleanedData, setcleanedData] = useState(undefined);
  const [error, seterror] = useState(false);
  useEffect(()=>{
    githubNotificationFetcher().then( res => {
      if(res.status === 200){
        setcleanedData(cleanData(res.data))
      }
      else seterror(true)
    })
  }, [])

  const handleRead = (id) => { markNotification(id).then((res)=>{
    if(res.status === 205) {
      setcleanedData(cleanedData.filter(item => item.id!==id));
    }

  })
  return false}
  const fields = ['title', 'repo', 'reason',{key:'type', sorter:true, filter: true} ,'actions'];
  const scopedSlots = {
    type:
      (item) => (
        <td>
          <CBadge color={getBadge(item.subject.type)} shape='pill'>
            {item.subject.type}
          </CBadge>
        </td>
      ),
    title: (item) => (
      <td>
        <a href={item.subject.url} target="_blank">{item.title}</a>
      </td>
    ),
    repo: (item) => (
      <td>
        <a href={item.repo_url} target="_blank">{item.repo}</a>
      </td>
    ),
    // status: (item) => (
    //   <td>
    //     {item.unread? <CBadge color="danger">Unread</CBadge>:<CBadge color="success">Read</CBadge>}
    //   </td>
    // ),
    actions: (item) => (
      <td>
        <CButton block variant="outline" color="dark" onClick={()=>handleRead(item.id)}>{ item.unread ? 'Mark Read' : 'Mark Unread'}</CButton>
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

              <CDataTable
                items={cleanedData}
                fields={fields}
                itemsPerPage={5}
                pagination
                tableFilter
                sorter
                striped
                hover
                scopedSlots={scopedSlots}
                loading={!cleanedData && !error }
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default GithubNotifications;
