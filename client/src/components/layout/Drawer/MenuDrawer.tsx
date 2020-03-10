import React from "react";
import {useTheme} from "@material-ui/core/styles";
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
import NestedMenuList from "./NestedMenuList";
import {IMenuDrawer} from "../../../interfaces/layout/Drawer";
import Logout from "../../auth/Logout";
import Grid from "@material-ui/core/Grid";

const MenuDrawer: React.FC <IMenuDrawer> = ({children}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Grid container>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={' appBar ' + (open ? 'appBarShift' : ' ')}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            className={' menuButton '+(open ? '  ' : ' ')}
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
        className={ (open? ' drawerOpen' : ' drawerClose ')}
      >
        <div className='toolBar'>
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
        <Grid container alignContent="space-between">
            <main className={(open ? "drawer-open" : "drawer-close") + " header"}>
                {children}
            </main>
        </Grid>
    </Grid>
  );
};

export default MenuDrawer;
