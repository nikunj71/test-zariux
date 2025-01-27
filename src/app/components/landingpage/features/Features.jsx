'use client';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { IconAdjustments, IconArchive, IconWand } from '@tabler/icons-react';
import AnimationFadeIn from '../animation/Animation';
import FeaturesTitle from './FeaturesTitle';

const featuresData = [
  {
    icon: <IconWand width={40} height={40} strokeWidth={1.5} />,
    title: 'NMap Scanner',
    subtext: 'Comprehensive network mapping and security scanning.',
  },
  {
    icon: <IconArchive width={40} height={40} strokeWidth={1.5} />,
    title: 'SQLMap',
    subtext: 'Automated SQL injection and database takeover tool.',
  },
  {
    icon: <IconAdjustments width={40} height={40} strokeWidth={1.5} />,
    title: 'DNS Lookup',
    subtext: 'Advanced DNS enumeration and reconnaissance.',
  },
];

const Features = () => {
  return (
    <Box
      sx={{
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <FeaturesTitle />
        <AnimationFadeIn>
          <Box
            sx={{
              mt: 6,
            }}
          >
            <Grid container spacing={3}>
              {featuresData.map((feature, index) => (
                <Grid
                  key={index}
                  size={{
                    xs: 12,
                    sm: 4,
                    lg: 4,
                  }}
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <Box
                    sx={{
                      color: 'primary.main',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      mt: 3,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    sx={{
                      mt: 1,
                      mb: 3,
                    }}
                  >
                    {feature.subtext}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </AnimationFadeIn>
      </Container>
    </Box>
  );
};

export default Features;
