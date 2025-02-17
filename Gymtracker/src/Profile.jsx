import { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, CircularProgress, useMediaQuery } from "@mui/material";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/me", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const calculateBMI = (weight, height) => {
    if (!weight || !height) return "N/A";
    const bmi = weight / ((height / 100) * (height / 100));
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal Weight";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    return "Obese";
  };

  if (loading) return <CircularProgress sx={{ color: "cyan", mt: 5 }} />;

  if (!user) return <Typography variant="h6" color="error">Failed to load profile.</Typography>;

  const bmi = calculateBMI(user.Weight, user.Height);
  const bmiCategory = getBMICategory(parseFloat(bmi));

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        minHeight: "100vh", 
        overflowX:"hidden",
        minWidth:"100vw",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "black",
        color: "white",
        pt:"64px",
        px: isSmallScreen ? 2 : 3 
      }}
    >
      <Paper 
        elevation={5} 
        sx={{ 
          p: isSmallScreen ? 2 : 3, 
          backgroundColor: "#121212", 
          color: "white", 
          borderRadius: 3, 
          border: "2px solid #9FCE03",
          width: "100%",
          maxWidth: isSmallScreen ? 350 : 400
        }}
      >
        <Typography 
          variant={isSmallScreen ? "h5" : "h4"} 
          sx={{ color: "#9FCE03", fontWeight: "bold", textAlign: "left", mb: 2 }}
        >
          Profile
        </Typography>

        <Box>
          <Typography variant={isSmallScreen ? "h6" : "h5"} sx={{ textAlign: "left", mb: 1 }}>
            <strong>Username:</strong> {user.username}
          </Typography>
          <Typography variant={isSmallScreen ? "body1" : "h6"} sx={{ textAlign: "left", mb: 1 }}>
            <strong>Height:</strong> {user.Height} cm
          </Typography>
          <Typography variant={isSmallScreen ? "body1" : "h6"} sx={{ textAlign: "left", mb: 2 }}>
            <strong>Weight:</strong> {user.Weight} kg
          </Typography>
        </Box>

        {/* BMI Section */}
        <Box 
          sx={{ 
            p: 2, 
            borderRadius: 2, 
            background: "#1e1e1e", 
            border: "1px solid #9FCE03",
            textAlign: "left",
            mb: 3
          }}
        >
          <Typography variant={isSmallScreen ? "h6" : "h5"} sx={{ color: "#9FCE03", mb: 1 }}>
            BMI
          </Typography>
          <Typography variant={isSmallScreen ? "h5" : "h4"} sx={{ fontWeight: "bold", color: "white", mb: 1 }}>
            {bmi}
          </Typography>
          <Typography 
            variant={isSmallScreen ? "body1" : "h6"} 
            sx={{ color: bmiCategory === "Normal Weight" ? "lime" : "red" }}
          >
            {bmiCategory}
          </Typography>
        </Box>

        {/* Habit Targets */}
        <Box>
          <Typography 
            variant={isSmallScreen ? "h6" : "h5"} 
            sx={{ color: "#9FCE03", textAlign: "left", mb: 1 }}
          >
            Habit Targets
          </Typography>
         {user.Targets ? (
  <Box mt={2} sx={{ textAlign: "left" }}>
    {/* <Typography variant="h6" sx={{ color: "cyan" }}>Habit Targets</Typography> */}
    <Typography variant="body1"><strong>Water Intake:</strong> {user.Targets.waterIntake} ml</Typography>
    <Typography variant="body1"><strong>Sleep:</strong> {user.Targets.sleep} hours</Typography>
    <Typography variant="body1"><strong>Step Count:</strong> {user.Targets.stepCount} steps</Typography>
    <Typography variant="body1"><strong>Workout Duration:</strong> {user.Targets.workoutDuration} minutes</Typography>
  </Box>
) : (
  <Typography>No habit targets set</Typography>
)}

        </Box>
      </Paper>
    </Container>
  );
}
