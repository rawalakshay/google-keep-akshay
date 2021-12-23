import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import Note from "./Note";
import { makeStyles } from "@material-ui/core";

//material UI icons
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import keep from "../images/keep.png";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    //width: `calc(100% - ${drawerWidth}px)`,
    width: "100%",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      width: drawerWidth,
      background: "#202124",
    },
    list: {
      color: "#e8eaed",
      background: "#202124",
    },
    root: {
      display: "flex",
      "& .MuiPaper-root": {
        background: "#202124",
        borderRight: "1px solid rgba(255, 255, 255, 0.12)",
      },
    },
    title: {
      paddingLeft: "10px",
      fontSize: "0.875 rem",
    },
    drawer: {
      width: drawerWidth,
    },

    listroot: {
      margin: "0 auto",
      paddingLeft: "8px",
    },
    appbar: {
      borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
    },
    listItemText: {
      fontSize: "1rem",
    },
  };
});

export default function MiniDrawer({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  //const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState("My Notes");
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const sideItems = [
    {
      name: "My Notes",
      icon: <LightbulbOutlinedIcon />,
      path: "/",
    },
    {
      name: "Bin",
      icon: <DeleteOutlineOutlinedIcon />,
      path: "/bin",
    },
    {
      name: "About",
      icon: <InfoOutlinedIcon />,
      path: "/about",
    },
    {
      name: "Contact",
      icon: <InfoOutlinedIcon />,
      path: "/contact",
    },
    {
      name: "Source Code",
      icon: <CodeOutlinedIcon />,
      path: "/code",
    },
  ];

  return (
    <Box sx={{ display: "flex" }} className={classes.root}>
      <AppBar
        position="fixed"
        open={open}
        className={classes.appbar}
        style={{ background: "#202124" }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src={keep} alt="fireSpot" />
          <Typography
            variant="h5"
            noWrap
            component="div"
            className={classes.title}
          >
            Google Keep
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        style={{ background: "#202124" }}
        classes={{ paper: classes.paper }}
        className={classes.drawer}
      >
        <DrawerHeader style={{ background: "#202124" }}>
          <div className={classes.title}>
            <Typography variant="h6">{title}</Typography>
          </div>
        </DrawerHeader>

        <Divider />
        <div className={classes.listroot}>
          <List className={classes.list}>
            {sideItems.map((item) => (
              <ListItem
                button
                onClick={() => {
                  setTitle(item.name);
                  navigate(item.path);
                }}
                key={item.name}
                // style={{ background: "#202124" }}
                selected={location.pathname === item.path}
              >
                <ListItemIcon style={{ color: "#e8eaed" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  className={classes.listItemText}
                  disableTypography
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div>{children}</div>
      </Box>
    </Box>
  );
}
