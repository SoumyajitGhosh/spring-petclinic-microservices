import { NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }: { isActive: boolean }) => 'nav-link' + (isActive ? ' active' : '');

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" role="navigation">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/welcome">
          <span></span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={navLinkClass} to="/welcome" title="home page">
                <span className="fa fa-home"></span>
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/owners" title="find owners">
                <span className="fa fa-search"></span>
                <span>Find owners</span>
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/owners/new" title="register owner">
                <span className="fa fa-plus"></span>
                <span>Register owner</span>
              </NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/vets" title="veterinarians">
                <span className="fa fa-th-list"></span>
                <span>Veterinarians</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
