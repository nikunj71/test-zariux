import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { Stack } from '@mui/system';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import BlankCard from '../shared/BlankCard';

const APISettings = () => {
  const [apiKey, setApiKey] = useState('key1234567890'); // Replace with actual key fetching logic

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    alert('API Key copied to clipboard');
  };

  const handleRegenerate = () => {
    const newKey = `key_${Math.random().toString(36).substr(2, 16)}`; // Replace with your regeneration logic
    setApiKey(newKey);
    alert('API Key regenerated');
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: 'center',
        }}
      >
        <Grid
          size={{
            xs: 12,
            lg: 9,
          }}
        >
          <BlankCard>
            <CardContent>
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                }}
              >
                API Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <CustomFormLabel htmlFor="api-key">API Key</CustomFormLabel>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CustomTextField
                      id="api-key"
                      variant="outlined"
                      value={apiKey}
                      fullWidth
                      readOnly
                      disabled
                    />
                    <IconButton onClick={handleCopy} color="primary">
                      <ContentCopyIcon />
                    </IconButton>
                    <IconButton onClick={handleRegenerate} color="primary">
                      <AutorenewIcon />
                    </IconButton>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CustomFormLabel htmlFor="webhook-url">Webhook URL</CustomFormLabel>
                  <CustomTextField id="webhook-url" variant="outlined" fullWidth type={'text'} />
                </Grid>
              </Grid>
            </CardContent>
          </BlankCard>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mt: 3,
          justifyContent: 'end',
        }}
      >
        <Button size="large" variant="contained" color="primary">
          Save
        </Button>
        <Button size="large" variant="text" color="error">
          Cancel
        </Button>
      </Stack>
    </>
  );
};

export default APISettings;
