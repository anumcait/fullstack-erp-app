import { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from "../../assets/images/EQIC_Image.jpg";
import { FiSettings } from 'react-icons/fi';


const Header = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [userName, setUserName] = useState('Guest');
  const [currentDate, setCurrentDate] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('empName') || 'Guest';
    setUserName(storedUser);

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    setUserName('Guest');
    navigate('/');
  };

  return (
    <header className="dashboard-header">
      <div className="top-bar">
        {/* Left Section with Logo and Hamburger */}
        <div className="left-bar">
          <div className="logo">
            <img src={logo} alt="Logo" className='logo-img'/>

          </div>
          <div className="menu-wrapper">
  <div className="hamburger-icon" onClick={toggleMenu}>
    &#9776;
  </div>
  <div className={`menu-container ${menuOpen ? 'show' : ''}`}>
    <div className="menu">
      {/* menu items here */}
    </div>
  </div>
</div>
        </div>

        {/* Menu */}
        <div className={`menu-container ${menuOpen ? 'show' : ''}`}>
          <div className="menu">
            <div className="menu-item">SETUP</div>
            <div className="menu-item dropdown">
              HR
              <ul className="dropdown-content">
                <li className="has-submenu">
                  <span className="dropdown-text">Leaves</span>
                  <ul className="submenu">
                    <li><Link to="/leave-form" className="link-style">Leave-Application</Link></li>
                    <li><Link to="/leave-report" className="link-style">Leaves</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="menu-item">MARKETING</div>
            <div className="menu-item">PLANNING</div>
            <div className="menu-item">ENGINEERING</div>
            <div className="menu-item dropdown">
                PURCHASE
 
              </div>
              <div className="menu-item dropdown">
                INVENTORY
                  <ul className="dropdown-content">
                      <li className="has-submenu">
                      <span className="dropdown-text">Masters</span>
                      <ul className="submenu">
                        <li><Link to="/edit-item" className="link-style">Item Master</Link></li>
                       
                      </ul>
                    </li>
                  </ul>
              </div>
              <div className="menu-item dropdown">
                QUALITY
 
              </div>
          </div>
        </div>

        {/* User Info */}
       <div className="user-info">
        <span>{userName}</span>
        <span>{currentDate}</span>
        <div className="user-icons">
            <Link to="/settings">
            <FiSettings className="icon-main" title="Settings" />
            </Link>
            <Link to="/dashboard" className="icon-link">
            <FaHome className="icon-main" />
            </Link>
            <div onClick={handleLogout} className="icon-link">
            <IoExitOutline className="icon-main" />
            </div>
        </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
