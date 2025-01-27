import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ScanViewModel = ({ isOpen, setIsOpen, scanDetails }) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>View Scan</DialogTitle>

      <DialogContent>
        <DialogContentText>
          <strong>Command:</strong> {scanDetails?.info?.cmd}
        </DialogContentText>
        <DialogContentText>
          <strong>Time:</strong> {scanDetails?.info?.time}
        </DialogContentText>
        <DialogContentText>
          <strong>Result:</strong> {scanDetails?.result}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ScanViewModel;
