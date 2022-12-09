import React from 'react';
import { Box, Container, Grid, Paper, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HeroImg from '../Assets/learning-hero.jpg';
import Math from '../Assets/Subject/maths.png';
import Physics from '../Assets/Subject/atom.png';
import Chemistry from '../Assets/Subject/test.png';
import Computer from '../Assets/Subject/system.png';

function Landing() {
  return (
    <>
      <Box
        sx={{
          py: 3,
          // backgroundColor: 'primary.dark',
        }}
      >
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={12} md={7}>
              <Typography
                variant="h1"
                color="primary"
                sx={{
                  mb: 1,
                }}
              >
                Learn and share notes of your favorite subjects
              </Typography>
              <Typography variant="body1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Debitis quo repudiandae veritatis. Quis quaerat consectetur
                nihil asperiores ullam ex voluptates tempore possimus quas, aut,
                molestias dicta, reiciendis alias laudantium fugiat.
              </Typography>
              <Stack spacing={2} direction="row" sx={{ my: 2 }}>
                <Button variant="contained" disableElevation>
                  Join now
                </Button>
                <Button variant="outlined">How it works</Button>
              </Stack>
              <Typography variant="body2" color="initial">
                Already have an account? Log in
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={HeroImg}
                alt="Share note easily"
                loading="lazy"
                style={{
                  minHeight: 300,
                  maxHeight: 350,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          py: 5,
          backgroundColor: 'secondary.light',
        }}
      >
        <Container>
          <Typography variant="h2" color="initial" textAlign="center">
            Math, Physics, Chemistry and even
            <br />
            <strong>Computer notes and many more</strong>
          </Typography>
          <Grid
            container
            spacing={3}
            my={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid item sx={6} md={2}>
              <Paper
                sx={{
                  textAlign: 'center',
                  p: 3,
                  width: '100%',
                }}
              >
                <img src={Math} alt="Mathematics" height="50" />
                <Typography>Math</Typography>
              </Paper>
            </Grid>
            <Grid item sx={6} md={2}>
              <Paper
                sx={{
                  textAlign: 'center',
                  p: 3,
                }}
              >
                <img src={Physics} alt="Mathematics" height="50" />
                <Typography>Physics</Typography>
              </Paper>
            </Grid>
            <Grid item sx={6} md={2}>
              <Paper
                sx={{
                  textAlign: 'center',
                  p: 3,
                }}
              >
                <img src={Chemistry} alt="Mathematics" height="50" />
                <Typography>Chemistry</Typography>
              </Paper>
            </Grid>
            <Grid item sx={6} md={2}>
              <Paper
                sx={{
                  textAlign: 'center',
                  p: 3,
                }}
              >
                <img src={Computer} alt="Mathematics" height="50" />
                <Typography>Computer</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ py: 5 }}>
        <Container>
          <Typography
            variant="h2"
            color="initial"
            // fontWeight={400}
            textAlign="center"
          >
            How <strong>it works</strong>?
          </Typography>
          <Stack
            spacing={3}
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              my: 2,
              py: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={HeroImg}
                alt="Step 1 Name"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={HeroImg}
                alt="Step 1 Name"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={HeroImg}
                alt="Step 1 Name"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Landing;
