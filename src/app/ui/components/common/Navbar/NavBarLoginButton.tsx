"use client";

import type { Session } from "next-auth";
import { useState } from "react";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import IconGenerator from "../IconGenerator";
// import { HotelOutlined } from "@mui/icons-material";
import { logOut } from "~/app/(authentication)/signin/actions";
import Link from "next/link";

const NavBarLoginButton = ({
  session,
  isWhiteVariant,
}: {
  session: Session;
  isWhiteVariant: boolean;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <button
        className={`flex items-center rounded-full px-4 py-2 text-sm font-normal  ${isWhiteVariant ? "bg-white text-black" : "bg-primary text-white"}`}
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        {`${session.user?.name}` + " " + `${session.user?.lastName}`}
        <span className="ml-2">
          <IconGenerator
            alt="avatar icon"
            src={`/avatar_${isWhiteVariant ? "white" : "blue"}.svg`}
            width="32px"
          />
        </span>
      </button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link href="/profile">
          <MenuItem>
            <ListItemIcon>
              <IconGenerator
                alt="avatar icon"
                src={`/avatar_${isWhiteVariant ? "white" : "blue"}.svg`}
                width="24px"
              />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>
        {/* TODO: check if we will add other items */}
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <HotelOutlined sx={{ color: "#ADB5BD", width: "24px" }} />
          </ListItemIcon>
          My reservation
        </MenuItem> */}
        <Divider />
        {/* <form action={logOut}> */}
        <MenuItem onClick={async () => await logOut()}>
          <ListItemIcon>
            <Logout fontSize="medium" sx={{ color: "#ADB5BD" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
        {/* </form> */}
      </Menu>
    </>
  );
};

export default NavBarLoginButton;
