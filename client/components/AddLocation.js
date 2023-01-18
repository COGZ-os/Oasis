import React, { useEffect } from "react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const AddLocation = (props) => {
  useEffect(() => console.log('rendering AddLocation window'), []);

  return (<>
    <Popover
      // id={id}
      open={open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      <TextField 
              fullWidth
              variant='standard'
              margin='normal'
              type='text' 
              id='email' 
              placeholder='Location Name'
              onChange={(e) => trackInputToState(e.target)}>
            </TextField>
      <TextField 
              fullWidth
              variant='standard'
              margin='normal'
              type='text' 
              id='email' 
              placeholder='Location Address'
              onChange={(e) => trackInputToState(e.target)}>
      </TextField>
      <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
      </FormControl>
      <TextField 
              fullWidth
              variant='standard'
              margin='normal'
              type='text' 
              id='email' 
              placeholder='Location Address'
              onChange={(e) => trackInputToState(e.target)}>
      </TextField>
    </Popover>
  </>)
}

export default AddLocation;