'use client';
import React, { useState } from 'react';
import { Box, Grid, Typography, Container, Divider, Stack, Tooltip, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import CustomTextField from '../../forms/theme-elements/CustomTextField';

const footerLinks = [
  {
    id: 1,
    title: 'Company',
    links: [
      { titleText: 'About Us', link: '/about' },
      { titleText: 'Careers', link: '/careers' },
      { titleText: 'Blog', link: '/blog' },
    ],
  },
  {
    id: 2,
    title: 'Support',
    links: [
      { titleText: 'Help Center', link: '/help' },
      { titleText: 'Contact Us', link: '/contact' },
      { titleText: 'FAQ', link: '/faq' },
    ],
  },
  {
    id: 3,
    title: 'Legal',
    links: [
      { titleText: 'Privacy Policy', link: '/privacy-policy' },
      { titleText: 'Terms of Service', link: '/terms-of-service' },
      { titleText: 'Cookie Policy', link: '/cookie-policy' },
    ],
  },
];

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if (email) {
      try {
        window.location.href = `mailto:support@zariux.com?subject=Newsletter Subscription&body=Please subscribe me to the newsletter with this email: ${email}`;
      } catch (error) {
        console.error('Error submitting email:', error);
      }
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: '30px', lg: '60px' } }}>
      {/* Footer Links Section */}
      <Grid container spacing={3} sx={{ justifyContent: 'space-between', mb: 7 }}>
        {footerLinks.map((section) => (
          <Grid item xs={12} sm={4} key={section.id}>
            <Typography sx={{ fontSize: '18px', fontWeight: 'bold', mb: '16px' }}>
              {section.title}
            </Typography>
            {section.links.map((link, index) => (
              <Typography key={index} sx={{ mb: '10px' }}>
                <Link href={link.link} passHref>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: '15px',
                      color: (theme) => theme.palette.text.primary,
                      '&:hover': { color: (theme) => theme.palette.primary.main },
                      cursor: 'pointer',
                    }}
                  >
                    {link.titleText}
                  </Typography>
                </Link>
              </Typography>
            ))}
          </Grid>
        ))}

        {/* Subscription Section with Submit Button */}
        <Grid item xs={12} sm={4} mt={2}>
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold', mb: '16px' }}>
            Subscribe to our Newsletter
          </Typography>
          <Stack direction="row" spacing={1}>
            <CustomTextField
              id="txt-email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleSubmit}>
              Subscribe
            </Button>
          </Stack>
        </Grid>

        {/* Social Media Section */}
        <Grid item xs={12} sm={4} mt={2}>
          <Typography sx={{ fontSize: '18px', fontWeight: 'bold', mb: '16px' }}>
            Follow Us
          </Typography>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Facebook">
              <Link href="#" passHref>
                <Image
                  src="/images/frontend-pages/icons/icon-facebook.svg"
                  alt="facebook"
                  width={24}
                  height={24}
                />
              </Link>
            </Tooltip>
            <Tooltip title="Twitter">
              <Link href="#" passHref>
                <Image
                  src="/images/frontend-pages/icons/icon-twitter.svg"
                  alt="twitter"
                  width={24}
                  height={24}
                />
              </Link>
            </Tooltip>
            <Tooltip title="Instagram">
              <Link href="#" passHref>
                <Image
                  src="/images/frontend-pages/icons/icon-instagram.svg"
                  alt="instagram"
                  width={24}
                  height={24}
                />
              </Link>
            </Tooltip>
          </Stack>
        </Grid>
      </Grid>

      <Divider />

      {/* Footer Bottom Section */}
      <Box
        sx={{
          py: '40px',
          flexWrap: 'wrap',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Image src="/images/logos/zariux-fav.svg" width={24} height={24} alt="logo" />
          <Typography variant="body2">
            © {new Date().getFullYear()} Zariux. All rights reserved.
          </Typography>
        </Stack>

        <Typography variant="body2">
          Designed by{' '}
          <Link href="https://tecko.co/" passHref>
            <Typography component="span" sx={{ color: 'primary.main', cursor: 'pointer' }}>
              Tecko.co
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
