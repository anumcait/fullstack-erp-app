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
            <div className="menu-item">PLANNING</div>
            <div className="menu-item">ENGINEERING</div>
            <div className="menu-item dropdown">
                PURCHASE
                <ul className="dropdown-content">
                  <li className="has-submenu">
                    <span className="dropdown-text">Site</span>
                    <ul className="submenu">
                      <li><Link to="/mrn-list" className="link-style">MRN List</Link></li>
                      <li>MRN</li>
                      <li><Link to="/quality-approval" className="link-style">Quality Approval</Link></li>
                      <li className="has-submenu">
                        Opening
                        <ul className="submenu">
                          <li><Link to="/opening-quantity" className="link-style">Add</Link></li>
                          <li><Link to="/opening-add" className="link-style">Edit</Link></li>
                        </ul>
                      </li>
                      <li><Link to="/stock-variation" className="link-style">Stock Variation</Link></li>
                    </ul>
                  </li>
                  <li className="has-submenu">
                    <span className="dropdown-text">Store</span>
                    <ul className="submenu">
                      <li><Link to="/issue-material" className="link-style">Issue</Link></li>
                      <li><Link to="/contractor-out-material" className="link-style">Contractor Out</Link></li>
                      <li>Manual Material Transfer</li>
                      <li>Issue Return</li>
                      <li>Receive Transfer Material</li>
                      <li>Return Rejected Material</li>
                      <li>Set Surplus Item</li>
                      <li>Freeze Quantity Issue</li>
                      <li>Contractor Debit Note</li>
                      <li>Report</li>
                      <li>Vendor Material Return</li>
                    </ul>
                  </li>
                  <li className="has-submenu">
                    <span className="dropdown-text">Store Reports</span>
                    <ul className="submenu">
                      <li><Link to="/stock-in-hand" className="link-style">Stock In Hand</Link></li>
                      <li><Link to="/stock-valuation" className="link-style">Stack Valuation In Hand</Link></li>
                      <li><Link to="/construction-Stock-issue" className="link-style">Construction & Stock Issue</Link></li>
                      <li><Link to="/stock-transfer-register" className="link-style">Stock Transfer Register</Link></li>
                      <li><Link to="/stock-transit-register" className="link-style">Stock Transit Register</Link></li>
                      <li><Link to="/item-stock-group" className="link-style">Item Group Wise Stock</Link></li>
                      <li><Link to="/pending-item-stock" className="link-style">Stock Aging Report</Link></li>
                      <li><Link to="/company-stock" className="link-style">Company Stock</Link></li>
                      <li><Link to="/item-stock-report" className="link-style">Company Item Wise Stock</Link></li>
                      <li><Link to="/material-stock-wages" className="link-style">Material Stock Wages</Link></li>
                      <li><Link to="/rejected-stock" className="link-style">Rejected Stock</Link></li>
                      <li><Link to="/process-item-stock" className="link-style">Item Process Stock</Link></li>
                      <li><Link to="/project-material" className="link-style">Project Material Qty</Link></li>
                      <li><Link to="/local-issue-report" className="link-style">Location Wise Issue</Link></li>
                      <li className="has-submenu">
                        Contractor
                        <ul className="submenu">
                          <li><Link to="/contractor-stock" className="link-style">Stock</Link></li>
                          <li><Link to="/Contractor-closing-stock" className="link-style">Closing Stock</Link></li>
                          <li><Link to="/Contractor-wastage-report" className="link-style">Wastage</Link></li>
                        </ul>
                      </li>
                      <li><Link to="/report-builder" className="link-style">Report Builder</Link></li>
                    </ul>
                  </li>
                </ul>
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
