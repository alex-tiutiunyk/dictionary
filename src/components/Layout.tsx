import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header>
        <NavLink to='/' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
          Index
        </NavLink>
        <NavLink to='/words' style={({ isActive }) => (isActive ? { color: 'red' } : {})}>
          Words
        </NavLink>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
