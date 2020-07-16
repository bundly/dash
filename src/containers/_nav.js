export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Home',
    to: '/dashboard',
    icon: 'cilHome',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Dashboard']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Search',
    to: '/workspace/search',
    icon: 'cilSearch',
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
    badge: {
      color: 'secondary',
      text: 'BETA',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'To Do',
    to: '/notes/todo',
    icon: 'cil-notes',
    badge: {
      color: 'secondary',
      text: 'BETA',
    }
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
    badge: {
      color: 'secondary',
      text: 'BETA',
    }
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
    badge: {
      color: 'secondary',
      text: 'BETA',
    }
  },
]

