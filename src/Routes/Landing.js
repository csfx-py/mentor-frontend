import { Box, Container, Grid, Paper, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import Everywhere from "../Assets/everywhere.svg";
import Free from "../Assets/free.svg";
import HeroImg from "../Assets/learning-hero.jpg";
import Share from "../Assets/share.svg";
import Physics from "../Assets/Subject/atom.png";
import Math from "../Assets/Subject/maths.png";
import Computer from "../Assets/Subject/system.png";
import Chemistry from "../Assets/Subject/test.png";

function Landing() {
  const navigate = useNavigate();

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
                Our platform is designed to help students to learn and share
                notes of their favorite subjects. We have a wide range of
                subjects to choose from. You can also share your notes with
                others. It's free and easy to use.
              </Typography>
              <Stack spacing={2} direction="row" sx={{ my: 2 }}>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/auth");
                  }}
                >
                  Join now
                </Button>
                <Button variant="outlined" component="a" href="#how-it-works">
                  How it works
                </Button>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={Share}
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
          backgroundColor: "secondary.light",
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item sx={6} md={2}>
              <Paper
                sx={{
                  textAlign: "center",
                  p: 3,
                  width: "100%",
                }}
              >
                <img src={Math} alt="Mathematics" height="50" />
                <Typography>Math</Typography>
              </Paper>
            </Grid>
            <Grid item sx={6} md={2}>
              <Paper
                sx={{
                  textAlign: "center",
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
                  textAlign: "center",
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
                  textAlign: "center",
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
        <Container id="how-it-works">
          <Typography variant="h2" color="initial" textAlign="center">
            How <strong>it works</strong>?
          </Typography>
          <Stack
            spacing={3}
            direction={{ xs: "column", sm: "row" }}
            sx={{
              my: 2,
              py: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <Card sx={{ maxWidth: 345, flexGrow: 1 }}>
              <CardMedia
                component="img"
                image={HeroImg}
                sx={{
                  maxHeight: 200,
                }}
                alt="Step 1 Name"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Work together
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Share a to-do list, post some instructions, or publish your
                  notes online. It's easy to work together.
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 345, flexGrow: 1 }}>
              <CardMedia
                component="img"
                image={Free}
                sx={{
                  maxHeight: 200,
                  objectFit: "contain",
                }}
                alt="Step 1 Name"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  It's free
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Syncing, sharing - it's all completely free.
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 345, flexGrow: 1 }}>
              <CardMedia
                component="img"
                image={Everywhere}
                style={{
                  maxHeight: 200,
                  objectFit: "contain",
                }}
                alt="Step 1 Name"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Use it everywhere
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Notes stay updated across all your devices, automatically and
                  in real time. There's no “sync” button: It just works.
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default Landing;
