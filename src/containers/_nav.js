export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cilHome',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Search',
    to: '/workspace/search',
    icon: 'cilSearch',
    badge: {
      color: 'secondary',
      text: 'BETA',
    }
  },

  {
    _tag: 'CSidebarNavTitle',
    _children: ['Notes']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Standup Notes',
    to: '/notes/standup',
    icon: 'cil-notes',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'To Do',
    to: '/notes/todo',
    icon: 'cil-notes',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Notifications']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Github',
    to: '/notifications/github',
    icon: 'cibGithub',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Calendar']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Calendar',
    to: '/calendar',
    icon: 'cil-calendar',
  },
]

