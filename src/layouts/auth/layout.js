import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Logo } from 'src/components/logo';

// TODO: Change subtitle text

export const Layout = (props) => {
  const { children } = props;

  return (
    <Box
    class=''
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <Grid
        container
        sx={{ flex: '1 1 auto' }}
        class=""
      >
        

<Grid
          class="d-none"
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            background: 'linear-gradient(178.6deg, rgba(255, 102, 0, 0) -18.75%, #FF6600 123.32%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: '24px',
                lineHeight: '32px',
                mb: 1
              }}
              variant="h1"
            >
              Welcome to{' '}
              <Box
                component="a"
                sx={{ color: '' }}
                target="_blank"
              >
                Kwickmall Admin
              </Box>
            </Typography>
            <Typography
              align="center"
              sx={{ mb: 3 }}
              variant="subtitle1"
            >
            
            </Typography>
            <div class='d-none'>
            {/** 
             * <img
              class=''
              alt=""
              src="/assets/auth-image.png"
              sx = {{
                background: 'linear-gradient(178.6deg, rgba(255, 102, 0, 0) -18.75%, #FF6600 123.32%)',
              }}
            />
             * **/}

            </div>
          </Box>
        </Grid>

        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 32
              }}
            >
              
            </Box>
          </Box>
          {children}
        </Grid>
        
      </Grid>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node
};