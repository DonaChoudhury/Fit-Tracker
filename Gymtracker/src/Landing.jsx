import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Workouts from "./Workouts.jsx";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../Store/selectors/userEmail";
import { isUserLoading } from "../Store/selectors/isUserLoading.js";
import axios from "axios";
import Container from "@mui/material/Container";

function Landing() {
    const navigate = useNavigate();
    const userEmail = useRecoilValue(userEmailState);
    const loading = useRecoilValue(isUserLoading);

    

    let [habits, sethabits] = useState({
        waterIntake: 0,
        sleep: 0,
        stepCount: 0,
        workoutDuration: 0,
    });

    let [targets, settargets] = useState({
        waterIntake: 0,
        sleep: 0,
        stepCount: 0,
        workoutDuration: 0,
    });

    useEffect(() => {
        const gethabits = async () => {
            const resp = await axios.get(
                `http://localhost:3000/user/gethabitlogs?date=${new Date().toISOString().split("T")[0]}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            habits = resp.data.log;
            sethabits({
                waterIntake: habits.waterIntake,
                sleep: habits.sleep,
                stepCount: habits.stepCount,
                workoutDuration: habits.workoutDuration,
            });
        };

        const gettargets = async () => {
            const resp1 = await axios.get("http://localhost:3000/user/me", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            targets = resp1.data.Targets;
            settargets({
                waterIntake: targets.waterIntake,
                sleep: targets.sleep,
                stepCount: targets.stepCount,
                workoutDuration: targets.workoutDuration,
            });
        };

        gethabits();
        gettargets();
    }, []);

    const data = [
        { name: "WaterIntake", value: habits.waterIntake, unit: "ml", goal: targets.waterIntake, goalUnit: "ml" },
        { name: "Sleep", value: habits.sleep, unit: "hrs", goal: targets.sleep, goalUnit: "hrs" },
        { name: "StepCount", value: habits.stepCount, unit: "steps", goal: targets.stepCount, goalUnit: "steps" },
        { name: "WorkoutDuration", value: habits.workoutDuration, unit: "mins", goal: targets.workoutDuration, goalUnit: "mins" },
    ];

    if (!userEmail) {
        return (
            <div
      style={{
        // top:"0",
        left:"0",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#000000",
        backgroundImage:
          "url(https://i.pinimg.com/736x/eb/4c/ef/eb4cefe0c24c3e3010394ae4bfd3c9b8.jpg)",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        
        alignItems: "center",
        padding: "20px",
        // margin:"0",
      position: "fixed",
      overflow:"hidden"
      }}
    >
      <Container maxWidth={false} style={{ width: "100%",height:"100%", padding: 0, margin: 0}}>
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#F1FFC6",
                textAlign: { xs: "left", sm: "center" },ml: { xs: 0, sm: -2 },
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Responsive text size
              }}
            >
              <span style={{ color: "#F1FFC6" }}>SCULPT</span>{" "}
              <span style={{ color: "#6D764D" }}>YOUR</span>{" "}
              <span style={{ color: "#F1FFC6" }}>BODY</span>
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#A3E635",
                textAlign: { xs: "left", sm: "center" },ml: { xs: 0, sm: -2 },
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Responsive text size
              }}
            >
              <span style={{ color: "#F1FFC6" }}>ELEVATE</span>{" "}
              <span style={{ color: "#6D764D" }}>YOUR</span>{" "}
              <span style={{ color: "#F1FFC6" }}>SPIRIT</span>
            </Typography>
          </Grid>

          <Grid item>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#9FCE03",
                    color: "#FFF",
                    fontSize: { xs: "1rem", sm: "1.2rem" }, // Responsive button text size
                  }}
                  onClick={() => navigate("/Signup")}
                >
                  Signup
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: "#A3E635",
                    color: "#9FCE03",
                    whiteSpace: "normal",
                    padding: "12px 20px",
                    width: "100%", // Ensures full width for small screens
                    fontSize: { xs: "1rem", sm: "1.2rem" }, // Responsive button text size
                  }}
                  onClick={()=>{
                    navigate("/Signin")
                  }}
                >
                  Get Started
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
        )
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(to right, #000000, #1F2937)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15pxpx",
                overflow:"hidden",
                minwidth:"100vw"
            }}
        >
            <Container maxWidth="lg" sx={{mt:8}}>
                <Grid container direction="column" alignItems="center" spacing={5}>
                    <Grid item>
                        <Grid container spacing={0} justifyContent="center" sx={{
        display: "flex",
        flexWrap: { xs: "wrap", md: "nowrap" }, // Wrap on small screens, single row on large
        overflowX: { xs: "auto", md: "visible" }, // Scroll on small screens if needed
        gap: 2
    }}>
                            {data.map((item, index) => {
                                const progress = Math.min((item.value / item.goal) * 100, 100);
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <Card
                                            variant="outlined"
                                            style={{
                                                width: "100%",
                                                maxWidth: 200,
                                                height: 200,
                                                padding: "20px",
                                                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
                                                borderRadius: "10px",
                                                backgroundColor: "#1F2937",
                                                color: "#FFFFFF",
                                                border: "2px solid #6D764D",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography variant="h6" style={{ fontWeight: "bold", color: "#A3E635" }}>
                                                {item.name}
                                            </Typography>
                                            <Box position="relative" display="inline-flex">
                                                <CircularProgress variant="determinate" value={progress} style={{ color: "#A3E635", width: 80, height: 80 }} />
                                                <Box position="absolute" display="flex" alignItems="center" justifyContent="center">
                                                    <Typography variant="body2" style={{ color: "#FFFFFF" }}>
                                                        {Math.round(progress)}%
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography variant="body2" style={{ color: "#FFFFFF", marginTop: "10px" }}>
                                                {item.value}
                                                {item.unit} / {item.goal}
                                                {item.goalUnit}
                                            </Typography>
                                            <Button variant="contained" style={{ backgroundColor: "#9FCE03", color: "white", marginTop: "10px" }} onClick={() => navigate(`/${item.name}`)}>
                                                Show Details
                                            </Button>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" style={{ fontWeight: "bold", color: "#A3E635", textAlign: "center" }}>
                            SweatZone
                        </Typography>
                    </Grid>
                    <Grid item style={{ width: "100%" }}>
                        <Workouts />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Landing;
