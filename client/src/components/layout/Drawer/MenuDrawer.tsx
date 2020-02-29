import React from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useStyles } from "./style";
import NestedMenuList from "./NestedMenuList";
import {IMenuDrawer} from "../../../interfaces/layout/Drawer";
import Logout from "../../auth/Logout";
import Grid from "@material-ui/core/Grid";


const MenuDrawer: React.FC <IMenuDrawer> = ({children}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Typography variant="h6" noWrap>
                    POS
                </Typography>
                <Logout/>
            </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <NestedMenuList menuOpen={open}/>
        <Divider />
      </Drawer>
      <main className={classes.content+ " header"}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default MenuDrawer;
