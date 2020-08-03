import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
function getAvatar() {
  const bundlyToken = localStorage.getItem("bundly-token");
  let avatar_url;
  if (bundlyToken) avatar_url = JSON.parse(atob(bundlyToken)).avatar;
  return avatar_url;
}
const TheHeaderDropdown = () => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={getAvatar()??'https://avatars.dicebear.com/api/male/example.svg'}
            className="c-avatar-img"
            alt="fellowship@mlh.io"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem onClick={() => { localStorage.removeItem("bundly-token")} } >
          <CIcon name="cil-user" className="mfe-2" />Logout
        </CDropdownItem>

      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
