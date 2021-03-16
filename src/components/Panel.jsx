// react
import React, { useState } from 'react';
// material-ui
import {
  Drawer,
  CssBaseline,
  Divider,
  IconButton
} from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
// styles
import useStyles from './PanelStyles';
// components
import TopBar from './TopBar';
import ListMenu from './ListMenu';


// PANEL COMPONENT
export default function Panel() {
  const [open, setOpen] = useState(true);

  const styles = useStyles();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.root}>
      <CssBaseline />

      <TopBar handleDrawerOpen={handleDrawerOpen} open={open} />

      <Drawer
        variant="permanent"
        className={clsx(styles.drawer, {
          [styles.drawerOpen]: open,
          [styles.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [styles.drawerOpen]: open,
            [styles.drawerClose]: !open,
          }),
        }}
      >
        <div className={styles.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />

        <ListMenu />

        <Divider />
      </Drawer>
    </div>
  );
};