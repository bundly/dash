import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://github.com/bundly" target="_blank" rel="noopener noreferrer">Bundly</a>
        <span className="ml-1">&copy; 2020 Bundly Team.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React </a>
        and
        <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer"> Vercel</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
