import { Button } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBIcon,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { useState } from "react";

export default function NavigationBar() {
  const navigate = useNavigate();
  const [showNavSecond, setShowNavSecond] = useState<boolean>(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <MDBNavbar expand="lg" light bgColor="light" className="sticky-top">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">Admin Site</MDBNavbarBrand>
          <MDBNavbarToggler
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavSecond(!showNavSecond)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar hidden={showNavSecond}>
            <MDBNavbarNav>
              <Link to="/">Home</Link>
              <Link to="/add-product">Add Product</Link>
              <Button onClick={logout} size="sm">
                Log out
              </Button>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <Outlet />
    </>
  );
}
