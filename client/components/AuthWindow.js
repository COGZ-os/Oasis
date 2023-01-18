import React, { useEffect } from "react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const AuthWindow = (props) => {
  useEffect(() => console.log('rendering Auth window'), []);

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
      <Typography sx={{ p: 2 }}>This is the auth popover.</Typography>
    </Popover>
  </>)
}

export default AuthWindow;