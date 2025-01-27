'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CustomFormLabel from '@/app/components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import { useDispatch } from 'react-redux';
import { registerNewUser } from '@/store/AuthenticationSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { LoadingButton } from '@mui/lab';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
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
        const response = await dispatch(registerNewUser(formData));
        if (response?.status === 200) {
          setLoading(false);
          toast.success(response?.data?.msg);
          setTimeout(() => {
            router.push('/u/auth/login');
          }, 2000);
        } else {
          setLoading(false);
          toast.error('Registration failed. Please try again.');
        }
      } catch (error) {
        setLoading(false);
        toast.error('Registration error:', error);
      }
    }
  };

  return (
    <>
      {title && (
        <Typography
          variant="h3"
          sx={{
            fontWeight: '700',
            mb: 1,
          }}
        >
          {title}
        </Typography>
      )}

      {subtext}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack
          sx={{
            mb: 3,
          }}
        >
          <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
          <CustomTextField
            id="name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

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
        </Stack>
        <LoadingButton
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          loading={loading}
        >
          Sign Up
        </LoadingButton>
        {/* <Button color="primary" variant="contained" size="large" fullWidth type="submit">
          Sign Up
        </Button> */}
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
