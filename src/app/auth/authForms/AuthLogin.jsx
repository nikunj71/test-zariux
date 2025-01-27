'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import CustomCheckbox from '@/app/components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import { useDispatch } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { loginUser } from '@/store/AuthenticationSlice';
import toast from 'react-hot-toast';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const pathname = usePathname();
  const pathWithoutLastPart = pathname.split('/')[2];

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: pathWithoutLastPart === 'a' ? 'admin' : 'user',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await dispatch(loginUser(formData));
        if (response?.status === 200) {
          if (!response.data.token) {
            toast.error(response?.data?.detail);
          } else {
            localStorage.setItem('token', response.data.token);
            toast.success(response.data.msg);
            setTimeout(() => {
              router.push(`/${pathWithoutLastPart}/dashboard`);
            }, 1000);
          }
        } else {
          toast.error('Login failed. Please check your credentials.');
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          {/* email Field */}
          <Box>
            <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
            <CustomTextField
              id="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Box>

          {/* Password Field */}
          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Box>

          {/* Remember Me & Forgot Password */}
          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label="Remember this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/auth/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Forgot Password?
            </Typography>
          </Stack>

          {/* Loading Button */}
          <LoadingButton
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            loading={loading}
            type="submit"
          >
            Sign In
          </LoadingButton>
        </Stack>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
