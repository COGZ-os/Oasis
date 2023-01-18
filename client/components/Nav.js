import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import AddLocation from './AddLocation.js';
import AuthWindow from './AuthWindow.js';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Nav = (props) => {
  // TODO: add conditional rendering of AddLocation and AuthWindow components tied to whether these state values are true - likely with a MUI component
  const [displayAuthWindow, toggleAuthWindow] = useState(false);
  const [displayAddLocation, toggleAddLocation] = useState(false);

  let searchCategory = 'address';
  let searchQuery = '';

  const handleTypeChange = (e) => {
    searchCategory = e.target.value;
  }

  const handleSubmit = () => {
    const route = `locations/?searchType=${searchCategory}&payload="${searchQuery}"`
    fetch(route)
      .then(response => response.json())
      .then(data => props.setReceivedData(data));
  }



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'salmon'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            oh hey sis
          </Typography>
          <FormControl style={{minWidth: 120, color: 'white'}}>
            <InputLabel id="search-category-label">Search by...</InputLabel>
            <Select
              labelId="search-category-label"
              id="search-category"
              // value={'category'}
              label="Search Category"
              onChange={(e) => handleTypeChange(e)}
            >
              <MenuItem value={'address'}>Street Address</MenuItem>
              <MenuItem value={'name'}>Business Name</MenuItem>
            </Select>
          </FormControl>
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => searchQuery = e.target.value}
            />
            <Button 
              variant="text" 
              sx={{color: 'white'}}
              onClick={handleSubmit}>
              Go
            </Button>
          </Search>
          <Button sx={{ backgroundColor: '#20B2AA'}} id="addLoc" variant="contained" onClick={() => toggleAddLocation(!displayAddLocation)}>
            Add Location
          </Button>
          <Button sx={{ backgroundColor: '#20B2AA'}} id="login" variant="contained" onClick={() => toggleAuthWindow(!displayAuthWindow)}>
            Sign up/Log in
          </Button>
        </Toolbar>
      </AppBar>
      {displayAuthWindow === true && <AuthWindow anchorEl={document.getElementById("login")} handleClose={() => toggleAuthWindow(!displayAuthWindow)}/>}
      {displayAddLocation === true && <AddLocation anchorEl={document.getElementById("addLoc")} handleClose={() => toggleAddLocation(!displayAddLocation)}/>}
    </Box>
  );
}

export default Nav;