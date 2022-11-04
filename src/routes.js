import React from 'react'

const Dashboard = React.lazy(() => import('./pages/dashboard'))
const List = React.lazy(() => import('./pages/list'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/label', name: 'List', element: List },
]

export default routes
