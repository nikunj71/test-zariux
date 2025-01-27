'use client';

import { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import { useDispatch } from 'react-redux';
import { getScanDetails, startScan } from '@/store/toolsSlice';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';

const ScanToolConfigForm = ({ open, setOpen, tool }) => {
  const [targetValue, setTargetValue] = useState({});
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const pathname = usePathname();
  const userType = pathname.split('/')[1];
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    if (open) {
      dispatch(getScanDetails(tool?.tool_id, userType)).then((res) => {
        if (res?.status === 200) {
          setAttributes(res?.data?.attributes?.inputs || '');
        }
      });
    }
  }, [open]);
  const handleChange = (event, attributeName) => {
    setTargetValue({ ...targetValue, [attributeName]: event.target.value });
    if (error) {
      setError('');
    }
  };

  const handleClose = () => {
    setTargetValue({});
    setOpen(false);
  };

  const handleStartScan = () => {
    const payload = {
      scan_type: tool?.tool_name,
      target_variable: { ...targetValue },
    };
    dispatch(startScan(payload))
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          toast.success('Scan started successfully');
        } else {
          toast.error('Failed to start scan');
        }
      })
      .catch(() => {
        toast.error('Failed to start scan');
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'md'}>
      <DialogTitle>Scan Configuration</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          {attributes?.length ? (
            <>
              {attributes?.map((item, index) => (
                <Grid size={{ xs: 12, md: 12 }} key={index}>
                  <CustomFormLabel htmlFor="target url or ip">{item?.desc}</CustomFormLabel>
                  <CustomTextField
                    autoFocus
                    id="target-input"
                    type="text"
                    fullWidth
                    placeholder={`Enter ${item?.desc}`}
                    value={targetValue[item?.attribute]}
                    onChange={(e) => handleChange(e, item?.attribute)}
                    error={Boolean(error)}
                    helperText={error}
                  />
                </Grid>
              ))}
            </>
          ) : (
            <></>
          )}
          <Grid size={{ xs: 12 }} mt={2}>
            <Stack direction={'row'} justifyContent="end">
              <Stack direction={'row'} gap={2}>
                <Button color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleStartScan}>Start Scan</Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ScanToolConfigForm;
