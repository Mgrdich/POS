import React, {useCallback, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import {drawerRoutes, IDrawerRoute, nestedRoutes} from "./config";
import {INestedMenuList} from "../../../interfaces/layout/Drawer";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
})); //TODO to be removed

const NestedMenuList: React.FC<INestedMenuList> = ({menuOpen}) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState<{ open: boolean, index: number }>({open: false, index: -1});
  const history = useHistory();

  const handleClick = useCallback(function (index: number) {
    let obj: any = {};

    if (open.open) {
      //open case
      if (index === open.index) {
        obj.open = false;
        obj.index = -1;
      } else {
        obj.index = index;
        obj.open = true;
      }
      setOpen(obj);
      return 0;
    }
    obj.open = true;
    obj.index = index;
    setOpen(obj);
  }, [open]);


  useEffect(() => {
    if (!menuOpen) {
      // when it closed
      setOpen({open: false, index: -1});
    }
  }, [menuOpen]);

  //TODO convert the  Click route  to a function cached

  return (
      <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.root}
      >
        {drawerRoutes.map((route: IDrawerRoute, index: number) => {
          return route.location ? (
              <ListItem key={index} button onClick={() => route.location ? history.push(route.location) : null}>
                <ListItemIcon>
                  <route.icon/>
                </ListItemIcon>
                <ListItemText primary={route.translation}/>
              </ListItem>
          ) : (
              <React.Fragment key={index}>
                <ListItem button onClick={() => handleClick(index)}>
                  <ListItemIcon>
                    <route.icon/>
                  </ListItemIcon>
                  <ListItemText primary={route.translation}/>
                  {open.open && open.index === index ? (
                      <ExpandLess/>
                  ) : (
                      <ExpandMore/>
                  )}
                </ListItem>
                <Collapse
                    in={open.open && open.index === index}
                    timeout="auto"
                    unmountOnExit
                >
                  <List component="div" disablePadding>
                    {route.nested ? route.nested.map((nestedRoute: nestedRoutes, index: number) => {
                      return (
                          <ListItem key={index} button className={classes.nested} onClick={() => route.location ? history.push(route.location) : null}>
                            <ListItemIcon>
                              <StarBorder/>
                            </ListItemIcon>
                            <ListItemText primary={nestedRoute.translation}/>
                          </ListItem>
                      );
                    }) : null}
                  </List>
                </Collapse>
              </React.Fragment>
          );
        })}
      </List>
  );
};

export default NestedMenuList;
