"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ApprovedBook from "../ResourceCategory/ApprovedBook";
import UnApprovedBook from "../ResourceCategory/UnApprovedBook";
import ResourceFilterDropDown from "../DropDown/ResourceFilterDropDown";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  items: ListItem[];
}

export interface ListItem {
  title: string;
  link: string;
}

export default function ResponsiveDrawer(props: Props) {
  const { window, items } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<string>(
    items[0].title
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (title: string) => {
    setSelectedItem(title);
    setMobileOpen(false);
  };

  const drawer = (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "8px",
        height: "100%",
        color: "rgba(255,255,255,1)",
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {items.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(item.title)}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "8px",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(10px)", // Apply blur effect
                WebkitBackdropFilter: "blur(10px)", // For Safari
                borderRadius: "8px",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="text-center z-40"
            >
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent black
                backdropFilter: "blur(10px)", // Apply blur effect
                WebkitBackdropFilter: "blur(10px)", // For Safari
                borderRadius: "8px",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(10px)", // Apply blur effect
                WebkitBackdropFilter: "blur(10px)", // For Safari
                borderRadius: "8px",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {selectedItem === "Book" && (
            <>
              <div>
                <div className="flex flex-col items-center w-full">
                  <div className="w-full flex justify-center items-center z-10 pt-20 text-white">
                    <ResourceFilterDropDown />
                  </div>
                </div>
              </div>
              <div className=" w-full relative overflow-hidden">
                <div className="text-center w-full text-5xl text-white">
                  Approved Books
                </div>
              </div>
              <ApprovedBook />
              <Divider />
              <div className=" w-full relative overflow-hidden">
                <div className="text-center w-full text-5xl text-white">
                  UnApproved Books
                </div>
              </div>
              <UnApprovedBook />
            </>
          )}
          {selectedItem === "User" && (
            <div className=" w-full relative overflow-hidden">
              <div className="text-center w-full text-5xl text-white">
                Approved Books
              </div>
            </div>
          )}
          {selectedItem === "Video" && (
            <Typography paragraph>
              <p className="text-white">
                Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
                ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
                elementum integer enim neque volutpat ac tincidunt. Ornare
                suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
                volutpat consequat mauris. Elementum eu facilisis sed odio
                morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                tincidunt ornare massa eget egestas purus viverra accumsan in.
                In hendrerit gravida rutrum quisque non tellus orci ac.
                Pellentesque nec nam aliquam sem et tortor. Habitant morbi
                tristique senectus et. Adipiscing elit duis tristique
                sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                eleifend. Commodo viverra maecenas accumsan lacus vel facilisis.
                Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
              </p>
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
