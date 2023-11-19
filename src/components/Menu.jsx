import { memo } from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? {
                  color: "lightyellow",
                  textDecoration: "none",
                  display: "none",
                }
              : {}
          }
          className="menu"
          to="user"
          end
        >
          User-page
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? {
                  color: "lightyellow",
                  textDecoration: "none",
                  display: "none",
                }
              : {}
          }
          className="menu"
          to="/"
          end
        >
          Admin
        </NavLink>
      </>
    </div>
  );
}

export default memo( Menu)
