import React, { useEffect, useState } from 'react';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
} from '@coreui/react';

import {
  githubNotificationFetcher,
  markNotification,
} from '../../../scripts/githubAPI';

const getBadge = (type) => {
  switch (type) {
    case 'Issue':
      return 'primary';
    case 'Commit':
      return 'secondary';
    case 'PullRequest':
      return 'warning';
    default:
      return 'success';
  }
};

const handleToDo = (item) => {
  const currentList = localStorage.getItem('todo');
  localStorage.setItem('todo', currentList.concat(`\n\r - [ ] Take a look at [${item.title}](${item.repo_url})`));
};

const cleanData = (data) => {
  if (data) {
    return data.map((item) => ({
      id: item.id,
      type: item.subject.type,
      title: item.subject.title,
      unread: item.unread,
      reason: item.reason,
      repo: item.repository.full_name,
      repo_url: item.repository.html_url,
      subject: {
        type: item.subject.type,
        url: item.subject.url.replace('api.', '').replace('repos/', ''),
      },
    }));
  }
};

const GithubNotifications = () => {
  const [cleanedData, setcleanedData] = useState(undefined);
  const [error, seterror] = useState(false);
  useEffect(() => {
    githubNotificationFetcher().then((res) => {
      if (res.status === 200) {
        setcleanedData(cleanData(res.data));
      } else seterror(true);
    });
  }, []);

  const handleRead = (id) => {
    markNotification(id).then((res) => {
      if (res.status === 205) {
        setcleanedData(cleanedData.filter((item) => item.id !== id));
      }
    });
    return false;
  };
  const fields = [
    'title',
    'repo',
    'reason',
    { key: 'type', sorter: true, filter: true },
    'actions',
  ];
  const scopedSlots = {
    type: (item) => (
      <td>
        <CBadge color={getBadge(item.subject.type)} shape="pill">
          {item.subject.type}
        </CBadge>
      </td>
    ),
    title: (item) => (
      <td>
        <a href={item.subject.url} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </td>
    ),
    repo: (item) => (
      <td>
        <a href={item.repo_url} target="_blank" rel="noopener noreferrer">
          {item.repo}
        </a>
      </td>
    ),
    actions: (item) => (
      <td>
        <CButton
          block
          variant="outline"
          color="dark"
          size="sm"
          onClick={() => handleRead(item.id)}
        >
          {item.unread ? 'Mark Read' : 'Mark Unread'}
        </CButton>
        <CButton block variant="outline" color="success" onClick={() => handleToDo(item)}>Add to ToDo</CButton>
      </td>
    ),
  };
  return (
    <CCard>
      <CCardHeader>Github Notifications</CCardHeader>
      <CCardBody>
        {error && <p>Error Fetching Data</p>}

        <CDataTable
          items={cleanedData}
          fields={fields}
          pagination
          tableFilter
          sorter
          striped
          hover
          itemsPerPage={3}
          scopedSlots={scopedSlots}
          loading={!cleanedData && !error}
        />
      </CCardBody>
    </CCard>
  );
};

export default GithubNotifications;
