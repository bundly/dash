export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Home',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Workspace']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Search',
    to: '/workspace/search',
    icon: 'cil-zoom',
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Colors',
    to: '/workspace/colors',
    icon: 'cil-drop',
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
    to: '/notes/standup',
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
    icon: 'cil-github',
    badge: {
      color: 'secondary',
      text: 'BETA',
    }
  },
]

