import React, { useEffect } from "react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';

const AddLocation = (props) => {
  useEffect(() => console.log('rendering AddLocation window'), []);

  let formValues = {
    user_id: 1,
    name: null,
    location_category: 'Nightlife',
    lgbtq_category: null,
    address_street: null,
    address_city: null,
    address_state: null,
    address_zipcode: null,
    description: null,
  };

  const handleInputChange = (event, targetID) => {
    formValues[targetID] = event.target.value;
  }

  const handleSubmit = async () => {
    console.log(formValues);
    await fetch('/locations', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      body: JSON.stringify(formValues)
    })
  }

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
      <Typography sx={{ p: 2 }}>Add a new location:</Typography>
      <TextField 
              fullWidth
              variant='standard'
              margin='normal'
              type='text' 
              id='name' 
              placeholder='Location Name'
              onChange={(e) => handleInputChange(e, e.target.id)}>
            </TextField>
      <TextField 
              fullWidth
              variant='standard'
              margin='normal'
              type='text' 
              id='address_street' 
              placeholder='Address Street'
              onChange={(e) => handleInputChange(e, e.target.id)}>
      </TextField>
      <TextField 
              fullWidth
              variant='standard'
              margin='normal'
              type='text' 
              id='address_city' 
              placeholder='Address City'
              onChange={(e) => handleInputChange(e, e.target.id)}>
      </TextField>
      <TextField 
              fullWidth
              variant='standard'
              margin='normal'
              type='text' 
              id='address_state' 
              placeholder='Address State'
              onChange={(e) => handleInputChange(e, e.target.id)}>
      </TextField>
            <TextField 
              fullWidth
              variant='standard'
              margin='normal'
              type='text' 
              id='address_zipcode' 
              placeholder='Address Zip Code'
              onChange={(e) => handleInputChange(e, e.target.id)}>
      </TextField>
      <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="location_category"
              // value={age}
              label="Category"
              onChange={(e) => handleInputChange(e, "location_category")}
            >
              <MenuItem value={"restaurant"}>Restaurant</MenuItem>
              <MenuItem value={"nightlife"}>Nightlife</MenuItem>
              <MenuItem value={"venue"}>Venue</MenuItem>
              <MenuItem value={"restroom"}>Restroom</MenuItem>
              <MenuItem value={"recreation"}>Recreation</MenuItem>
              <MenuItem value={"community center"}>Community Center</MenuItem>
            </Select>
      </FormControl>
      <TextField 
              fullWidth
              variant='standard'
              margin='normal'
              type='text' 
              id='description' 
              placeholder='Location Description'
              onChange={(e) => handleInputChange(e, e.target.id)}>
      </TextField>
      <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">LGBTQ+ focused?</FormLabel>
            <RadioGroup
              id="lgbtq_category"
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Yes"
              name="radio-buttons-group"
              onChange={(e) => handleInputChange(e, "lgbtq_category")}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
      </FormControl> <br/>
      <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Safe space?</FormLabel>
            <RadioGroup
              id="safeBool"
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Yes"
              name="radio-buttons-group"
              onChange={(e) => handleInputChange(e, "safeBool")}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
      </FormControl> <br/>
      <Button onClick={handleSubmit}>Submit</Button>
    </Popover>
  </>)
}

export default AddLocation;