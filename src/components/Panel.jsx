// react
import React, { useState } from 'react';
// material-ui
import {
  Drawer,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  GridOn as GridOnIcon,
  MonetizationOn as MonetizationOnIcon,
  BarChart as BarChartIcon,
  SettingsApplications as SettingsApplicationsIcon
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
// styles
import useStyles from './PanelStyles';
// components
import TopBar from './TopBar';


// PANEL COMPONENT
export default function Panel() {
  const [open, setOpen] = useState(true);

  const styles = useStyles();
  const theme = useTheme();

  const dashboardItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />
    },
    {
      text: 'Cadastro',
      icon: <GridOnIcon />
    },
    {
      text: 'Lançamento',
      icon: <MonetizationOnIcon />
    },
    {
      text: 'Relatório',
      icon: <BarChartIcon />
    },
    {
      text: 'Utilitário',
      icon: <SettingsApplicationsIcon />
    }
  ];

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
        <List>
          {dashboardItems.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={index} onClick={onClick}>
                <ListItemIcon className={styles.itemText}>
                  {icon}
                </ListItemIcon>
                <ListItemText className={styles.itemText} primary={text} />
              </ListItem>
            )
          })}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};