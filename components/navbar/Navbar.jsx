import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [transparent, setTransparent] = useState(false);
  const [username, setUsername] = useState(null);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleScroll = () => {
    setActive(window.scrollY > 0);
    setTransparent(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUsername(storedUser.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUsername(null);
    navigate('/');
    window.location.reload();
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div className={`${active || pathname !== "/" ? "navbar active" : "navbar"} ${transparent ? "transparent" : ""}`}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <img src="./img/logo.png" className="logo-image" alt="FreelanceFiesta Logo"/>
            <span className="text">reelanceFiesta</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span><Link to="/add" className="link">Add Jobs</Link></span><span>|</span>
          <span><Link to="/Messages" className="link">Messages</Link></span><span>|</span>
         
        
          <span>English</span><span>|</span>
          {username ? (
            <Stack direction="row" spacing={2}>
              <div>
                <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  {username}
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom-start' ? 'left top' : 'left bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </Stack>
          ) : (
            <>
              <Link to="/signin" className="link"><button>Log In</button></Link>
              <span>|</span>
              <Link to="/signinuser" className="link"><button>Register</button></Link>
            </>
          )}
        </div>
      </div>
      <div className="menu">
        <Link className="link menuLink" to="/gigs">Graphics & Design</Link><span>|</span>
        <Link className="link menuLink" to="/gigs">Video & Animation</Link><span>|</span>
        <Link className="link menuLink" to="/gigs">Writing & Translation</Link><span>|</span>
        <Link className="link menuLink" to="/gigs">AI Services</Link><span>|</span>
        <Link className="link menuLink" to="/gigs">Digital Marketing</Link><span>|</span>
        <Link className="link menuLink" to="/gigs">Music & Audio</Link><span>|</span>
        <Link className="link menuLink" to="/gigs">Programming & Tech</Link><span>|</span>
        <Link className="link menuLink" to="/gigs">Business</Link><span>|</span>
        <Link className="link menuLink" to="/gigs">Lifestyle</Link>
      </div>
    </div>
  );
}

export default Navbar;
