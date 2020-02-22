import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { nested, routes } from "./config";

const useStyles = makeStyles(theme  => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

const NestedMenuList: React.FC<any> = ({ menuOpen }) => {
  // TODO Change generic

  const classes = useStyles();
  const [open, setOpen] = React.useState({ open: false, index: -1 }); // true 3
  const handleClick = (index: number) => {
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
    console.log(obj.index + " " + obj.open);
    setOpen(obj);
  };

  useEffect(() => {
    if (!menuOpen) {
      // when it closed
      setOpen({ open: false, index: -1 });
    }
  }, [menuOpen]);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {routes.map((item: any, index: number) => {
        // TODO Change generic

        return item.location ? (
          <ListItem key={index} button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.translation} />
          </ListItem>
        ) : (
          <React.Fragment key={index}>
            <ListItem button onClick={() => handleClick(index)}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={item.translation} />
              {open.open && open.index === index ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
            <Collapse
              in={open.open && open.index === index}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {nested[index].map((item1: any, index: number) => {
                  return (
                    <ListItem key={index} button className={classes.nested}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={item1.translation} />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default NestedMenuList;
