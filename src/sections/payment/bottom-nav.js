import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';

export const PaymentBottomNav = () => {
    const cardStyle = {
        maxWidth: 200, // Adjust the maxWidth as needed
        height: 140, // Set the desired height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      };
    
      const badgeStyle = {
        position: 'absolute',
        top: 14,
        right: 12,
        backgroundColor: 'white',
        color: 'black',
      };
  
    return (
      <Grid container>
        <Grid
         xs={12}
         sm={6}
         lg={4}
        >

<Card style={cardStyle}>
      <Badge badgeContent={4} color="secondary" style={badgeStyle}>
        <div>
          <CardContent style={{ textAlign: 'center' }}>
            <Typography variant="p">
              Payout Management
            </Typography>
          </CardContent>
        </div>
      </Badge>
    </Card>


        </Grid>

        <Grid
         xs={12}
         sm={6}
         lg={4}
        >

        <Card style={cardStyle}>
            <CardContent style={{ textAlign: 'center' }}>
                <Typography variant="p">
                    Manage User Ewallet
                </Typography>
                
        </CardContent>
      </Card>

        </Grid>

        <Grid
         xs={12}
         sm={6}
         lg={4}
        >

<Card style={cardStyle}>
      <Badge badgeContent={4} color="secondary" style={badgeStyle}>
        <div>
          <CardContent style={{ textAlign: 'center' }}>
            <Typography variant="p">
              Manage Refunds
            </Typography>
          </CardContent>
        </div>
      </Badge>
    </Card>

        </Grid>
        
      </Grid>
    );
  };
  

  