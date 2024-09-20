import Link from "next/link";
import Image from "next/image";
import { forwardRef } from "react";
import { logOut } from "~/app/(authentication)/actions";

import {
  Dialog,
  ListItemText,
  ListItemButton,
  List,
  Slide,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import type { TransitionProps } from "@mui/material/transitions";
import type {
  IReadOnlySiteConfigurationProperties,
  TUserData,
} from "~/app/(application)/definitions";

export default function NavBardDialog({
  openMenu,
  toggleMenu,
  session,
  siteConfigs,
}: {
  openMenu: boolean;
  toggleMenu: () => void;
  session: TUserData["profile"] | null;
  siteConfigs: IReadOnlySiteConfigurationProperties;
}) {
  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  return (
    <Dialog
      fullScreen
      open={openMenu}
      onClose={toggleMenu}
      TransitionComponent={Transition}
    >
      <div className="flex items-center justify-between border border-[#EAEAEA] bg-white px-6 py-3">
        <Link href="/">
          <Image
            src={`${siteConfigs.logo.black}`}
            alt={siteConfigs.logo.alt}
            width={0}
            height={0}
            sizes="60vw"
            className={`w-[${Number.parseInt(siteConfigs.logo.width) - 80}px]`}
          />
        </Link>
        <IconButton
          onClick={toggleMenu}
          aria-label="close"
          sx={{ width: "24px" }}
        >
          <CloseIcon sx={{ width: "24px", color: "black" }} />
        </IconButton>
      </div>
      <List>
        {siteConfigs.navBar.links.map((link) => {
          return (
            <ListItemButton
              key={link.href}
              onClick={toggleMenu}
              sx={{ padding: "12px 36px" }}
            >
              <Link href={link.href}>
                <ListItemText primary={link.name} />
              </Link>
            </ListItemButton>
          );
        })}
      </List>
      {!session ? (
        <Link href="/signin">
          <button className="my-3 ml-8 flex max-w-fit rounded-xl bg-black p-3 text-white">
            Log In or Sign Up
          </button>
        </Link>
      ) : (
        <List>
          <ListItemButton onClick={toggleMenu} sx={{ padding: "12px 36px" }}>
            <Link href="/profile">My Profile</Link>
          </ListItemButton>
          <ListItemButton onClick={toggleMenu} sx={{ padding: "12px 36px" }}>
            <Link href="/profile/reservations">My bookings</Link>
          </ListItemButton>
          <button
            onClick={async () => {
              await logOut();
              toggleMenu();
            }}
            className="my-3 ml-8 flex max-w-fit rounded-xl bg-black p-3 text-white"
          >
            Log Out
          </button>
        </List>
      )}
    </Dialog>
  );
}
