import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import React from 'react';

import { Stack } from '@mui/system';
import CustomFormLabel from '../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import BlankCard from '../shared/BlankCard';

const AccountTab = () => {
  return (
    <Grid container spacing={3}>
      {/* Change Profile */}
      <Grid
        size={{
          xs: 12,
          lg: 6,
        }}
      >
        <BlankCard>
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                mb: 1,
              }}
            >
              Change Profile
            </Typography>
            <Typography
              color="textSecondary"
              sx={{
                mb: 3,
              }}
            >
              Change your profile picture from here
            </Typography>
            <Box
              sx={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box>
                <Avatar
                  src={'/images/profile/user-1.jpg'}
                  alt={'user1'}
                  sx={{ width: 120, height: 120, margin: '0 auto' }}
                />
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    justifyContent: 'center',
                    my: 3,
                  }}
                >
                  <Button variant="contained" color="primary" component="label">
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                  <Button variant="outlined" color="error">
                    Reset
                  </Button>
                </Stack>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{
                    mb: 4,
                  }}
                >
                  Allowed JPG, GIF or PNG. Max size of 800K
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>
      {/*  Change Password */}
      <Grid
        size={{
          xs: 12,
          lg: 6,
        }}
      >
        <BlankCard>
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                mb: 1,
              }}
            >
              Change Password
            </Typography>
            <Typography
              color="textSecondary"
              sx={{
                mb: 3,
              }}
            >
              To change your password please confirm here
            </Typography>
            <form>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-cpwd"
              >
                Current Password
              </CustomFormLabel>
              <CustomTextField
                id="text-cpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
              {/* 2 */}
              <CustomFormLabel htmlFor="text-npwd">New Password</CustomFormLabel>
              <CustomTextField
                id="text-npwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
              {/* 3 */}
              <CustomFormLabel htmlFor="text-conpwd">Confirm Password</CustomFormLabel>
              <CustomTextField
                id="text-conpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
            </form>
          </CardContent>
        </BlankCard>
      </Grid>
      {/* Edit Details */}
      <Grid size={12}>
        <BlankCard>
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                mb: 1,
              }}
            >
              Personal Details
            </Typography>
            <Typography
              color="textSecondary"
              sx={{
                mb: 3,
              }}
            >
              To change your personal detail , edit and save from here
            </Typography>
            <form>
              <Grid container spacing={3}>
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-name"
                  >
                    Your Name
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-name"
                    value="Mathew Anderson"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  {/* 2 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-user-name"
                  >
                    User Name
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-user-name"
                    value="Maxima Studio"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  {/* 5 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    Email
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-email"
                    value="info@modernize.com"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                  }}
                >
                  {/* 6 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-phone"
                  >
                    Phone
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-phone"
                    value="+91 12345 65478"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid size={12}>
                  {/* 7 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-address"
                  >
                    Address
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-address"
                    value="814 Howard Street, 120065, India"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </BlankCard>
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
      </Grid>
    </Grid>
  );
};

export default AccountTab;
