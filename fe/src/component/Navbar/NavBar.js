import { Navbar, Button,  Link, Text, Dropdown } from "@nextui-org/react";
import React from "react";


const NavBar = () => {
    return (
        <Navbar isBordered variant="floating">
            <Navbar.Brand>
                <Link href="/">
                    <Text h3>URBAN</Text>
                </Link>
            </Navbar.Brand>
            <Navbar.Content
                hideIn="xs"
                variant="highlight-rounded"
            >
                {/* <Navbar.Link href="/students">Employees</Navbar.Link>
                <Navbar.Link href="#">Teachers</Navbar.Link>
                <Navbar.Link href="#">Employees</Navbar.Link>
                <Navbar.Link href="#">Centers</Navbar.Link> */}
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Link color="inherit" href="/login">
                    Login
                </Navbar.Link>
                <Navbar.Item>
                    <Button auto flat as={Link} href="/register">
                        Sign Up
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    );
};



export default NavBar;
