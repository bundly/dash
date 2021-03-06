import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Search = React.lazy(() => import('./views/workspace/search/Search'));
const GithubNotifications = React.lazy(() => import('./views/notifications/github/GithubNotifications'));
const StandupNotes = React.lazy(() => import('./views/notes/standup/StandupNotes'));
const ToDo = React.lazy(() => import('./views/notes/todo/ToDo'));
const GoogleCalendar = React.lazy(() => import('./views/calendar/GoogleCalendar'));
const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/workspace', name: 'Workspace', component: Search, exact: true },
  { path: '/workspace/search', name: 'Search', component: Search },
  { path: '/notifications', name: 'Notifications', component: GithubNotifications, exact: true },
  { path: '/notifications/github', name: 'Github', component: GithubNotifications },
  { path: '/notes/', name: 'Notes', exact: true },
  { path: '/notes/standup', name: 'Standup Notes', component: StandupNotes },
  { path: '/notes/todo', name: 'To-Do', component: ToDo },
  { path: '/calendar', name: 'Calendar', component: GoogleCalendar },
  // { path: '/notifications/discord', name: 'Discord', component: DiscordNotifications },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
