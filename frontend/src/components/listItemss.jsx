import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LogoutIcon from '@mui/icons-material/Logout';


export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <AddAPhotoIcon />
      </ListItemIcon>
      <ListItemText primary="Upload Videos" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AutoGraphIcon />
      </ListItemIcon>
      <ListItemText primary="Visualization" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SportsCricketIcon />
      </ListItemIcon>
      <ListItemText primary="Playing Areas" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PsychologyIcon />
      </ListItemIcon>
      <ListItemText primary="Adaptive Learning" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);