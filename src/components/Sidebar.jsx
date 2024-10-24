import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHammer,
  faUsers,
  faTasks,
  faChartBar,
  faClock,
  faClipboardList,
  faDollarSign,
  faChevronDown,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const btnToggleRef = useRef(null); // Ref for the toggle button
  const sidebarRef = useRef(null); // Ref for the sidebar

  useEffect(() => {
    const btnToggle = btnToggleRef.current;
    const sidebar = sidebarRef.current;

    const toggleSidebar = () => {
      // const sidebar = sidebarRef.current;
      const btnToggle = btnToggleRef.current;
      const contentWrapper = document.querySelector(".content-wrapper"); // Adjust selector as necessary

      // Toggle the sidebar's 'close' class
      const isClosing = sidebar.classList.toggle("close");

      // Rotate the button icon only when closing or opening
      if (isClosing) {
        btnToggle.classList.add("rotate");
      } else {
        btnToggle.classList.remove("rotate");
      }

      // Toggle class on content wrapper to adjust width
      if (sidebar.classList.contains("close")) {
        contentWrapper.classList.remove("expanded");
        contentWrapper.classList.add("collapsed");
      } else {
        contentWrapper.classList.remove("collapsed");
        contentWrapper.classList.add("expanded");
      }

      // Close all submenus when collapsing the sidebar
      if (isClosing) {
        const openSubmenus = sidebar.querySelectorAll(".sub-menu.show");
        openSubmenus.forEach((submenu) => {
          submenu.classList.remove("show");
        });

        // Reset any rotated dropdown arrows
        const rotatedDropdowns = sidebar.querySelectorAll(
          ".dropdown-btn.rotate"
        );
        rotatedDropdowns.forEach((button) => {
          button.classList.remove("rotate");
        });
      }
    };

    // Add event listener to the toggle button
    btnToggle.addEventListener("click", toggleSidebar);

    // Cleanup event listener when the component is unmounted
    return () => {
      btnToggle.removeEventListener("click", toggleSidebar);
    };
  }, []); // Empty dependency array to run only once after the component mounts

  const handleDropClick = (e) => {
    const button = e.currentTarget;
    const submenu = button.nextElementSibling;
    const sidebar = document.getElementById("sidebar"); // Ensure this ID matches your sidebar element

    // Close any other open submenu
    const allSubmenus = sidebar.querySelectorAll(".sub-menu");
    allSubmenus.forEach((otherSubmenu) => {
      if (otherSubmenu !== submenu && otherSubmenu.classList.contains("show")) {
        otherSubmenu.classList.remove("show"); // Close other submenus
        const otherButton = otherSubmenu.previousElementSibling;
        if (otherButton.classList.contains("rotate")) {
          otherButton.classList.remove("rotate"); // Reset other dropdown buttons
        }
      }
    });

    // Toggle the clicked submenu visibility
    if (submenu) {
      submenu.classList.toggle("show");
    }

    // Rotate the clicked button's chevron icon
    button.classList.toggle("rotate");

    // Check if the sidebar is collapsed, expand it if necessary
    if (sidebar && sidebar.classList.contains("close")) {
      sidebar.classList.remove("close"); // Expand the sidebar
      const btnToggle = document.getElementById("toggle-btn"); // Update the button rotation if necessary
      btnToggle.classList.remove("rotate");
    }
  };

  return (
    <div className="sidebar" id="sidebar" ref={sidebarRef}>
      <div className="sidebar-header">
        <img
          src="/images/logo-3.png"
          alt="Gradjevinco"
          className="sidebar-logo"
        />
        <button className="toggle-sidebar" id="toggle-btn" ref={btnToggleRef}>
          <FontAwesomeIcon
            icon={faAnglesLeft}
            className="sidebar-toggle-icon"
          />
        </button>
      </div>
      <nav>
        <ul className="sidebar-nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              <FontAwesomeIcon icon={faChartBar} className="nav-icon" />
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/projects" className="nav-link">
              <FontAwesomeIcon icon={faHammer} className="nav-icon" />
              Projects
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/activities" className="nav-link">
              <FontAwesomeIcon icon={faTasks} className="nav-icon" />
              Activities
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/employees" className="nav-link">
              <FontAwesomeIcon icon={faUsers} className="nav-icon" />
              Employees
            </NavLink>
          </li>
          <li className="nav-item">
            <button
              className="dropdown-btn"
              onClick={(e) => handleDropClick(e)}
            >
              <FontAwesomeIcon icon={faTasks} className="nav-icon" />
              <span>Tasks</span>
              <FontAwesomeIcon icon={faChevronDown} className="nav-icon" />
            </button>
            <ul className="sub-menu">
              <div>
                <li>
                  <NavLink to="/prevoznice" className="nav-link">
                    Prevoznice
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/porezi" className="nav-link">
                    Porezne obaveze
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/financials" className="nav-link">
                    Isplate
                  </NavLink>
                </li>
              </div>
            </ul>
          </li>
          <li className="nav-item">
            <NavLink to="/financials" className="nav-link">
              <FontAwesomeIcon icon={faDollarSign} className="nav-icon" />
              Financials
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/reports" className="nav-link">
              <FontAwesomeIcon icon={faClipboardList} className="nav-icon" />
              Reports
            </NavLink>
          </li>
          <li className="nav-item">
            <button
              className="dropdown-btn"
              onClick={(e) => handleDropClick(e)}
            >
              <FontAwesomeIcon icon={faTasks} className="nav-icon" />
              <span>Gradilišta</span>
              <FontAwesomeIcon icon={faChevronDown} className="nav-icon" />
            </button>
            <ul className="sub-menu">
              <div>
                <li>
                  <NavLink to="/pregledgradilista" className="nav-link">
                    Pregled
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ponude" className="nav-link">
                    Ponude
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ugovori" className="nav-link">
                    Ugovori
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/fakture" className="nav-link">
                    Fakture
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/realizacije" className="nav-link">
                    Realizacije
                  </NavLink>
                </li>
              </div>
            </ul>
          </li>
          <li className="nav-item">
            <NavLink to="/time-tracking" className="nav-link">
              <FontAwesomeIcon icon={faClock} className="nav-icon" />
              Time Tracking
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
