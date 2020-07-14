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
    icon: 'cil-search',
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Colors',
    to: '/workspace/colors',
    icon: 'cil-drop',
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

