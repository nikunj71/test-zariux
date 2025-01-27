import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const CustomButton = ({ children, ...props }) => {
  return (
    <Button variant="contained" size="large" {...props}>
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node,
};

export default CustomButton;
