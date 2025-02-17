import { Typography, TextField, Button } from '@mui/material';
import Card from '@mui/material/Card';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dailylog() {
  const navigate = useNavigate();
  const [wi, setwi] = useState("");
  const [sp, setsp] = useState("");
  const [sc, setsc] = useState("");
  const [wd, setwd] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/user/loghabits',
        {
          waterIntake: Number(wi) || 0,
          sleep: Number(sp) || 0,
          stepCount: Number(sc) || 0,
          workoutDuration: Number(wd) || 0
        },
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        }
      );
      alert("Habit logged successfully");
    } catch (e) {
      console.log("Error sending details", e);
      alert("Failed to log the habits");
    }
  };

  return (
    <div style={{
      left:"0",
      // bottom:"0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      position: "fixed",
      padding: "20px", // Ensures spacing around the card
      background: "linear-gradient(to right, #000000, #1F2937)",
      backgroundAttachment: "fixed",
      boxSizing: "border-box", // Prevents overflow issues,
      // minHeight:"100vh"
    }}>
      <Card variant="outlined"
        style={{
          width: "100%", // Takes up to 90% of screen width
          maxWidth: "400px", // Prevents it from becoming too large
          minWidth: "320px", // Ensures it doesn’t shrink too much
          padding: "30px",
          borderRadius: "15px",
          backgroundColor: "#000000",
          boxShadow: "0 8px 20px rgba(79, 184, 37, 0.82)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          margin: "auto", // Centers it properly,
          maxHeight:"600px"
        }}
      >
        <Typography variant="h5"
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontWeight: "bold",
            color: "#9FCE03"
          }}
        >
          Log Your Progress and Keep the Streak Alive!
        </Typography>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Typography variant="body1"
              style={{
                fontWeight: 'bold',
                minWidth: '120px',
                textAlign: 'right',
                color: '#9FCE03'
              }}
            >
              Water Intake
            </Typography>
            <TextField
              label="Water Quantity (ml)"
              type="number"
              fullWidth
              value={wi}
              variant="outlined"
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}
              onChange={(e) => setwi(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Typography variant="body1"
              style={{
                fontWeight: 'bold',
                minWidth: '120px',
                textAlign: 'right',
                color: '#9FCE03'
              }}
            >
              Sleep Hours
            </Typography>
            <TextField
              label="Sleep Duration (hrs)"
              type="number"
              fullWidth
              value={sp}
              variant="outlined"
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}
              onChange={(e) => setsp(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Typography variant="body1"
              style={{
                fontWeight: 'bold',
                minWidth: '120px',
                textAlign: 'right',
                color: '#9FCE03'
              }}
            >
              Step Count
            </Typography>
            <TextField
              label="Step Count"
              type="number"
              fullWidth
              value={sc}
              variant="outlined"
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}
              onChange={(e) => setsc(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Typography variant="body1"
              style={{
                fontWeight: 'bold',
                minWidth: '120px',
                textAlign: 'right',
                color: '#9FCE03'
              }}
            >
              Workout Duration
            </Typography>
            <TextField
              label="Workout Duration (mins)"
              type="number"
              fullWidth
              value={wd}
              variant="outlined"
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: '8px'
              }}
              onChange={(e) => setwd(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          <Button variant="contained" 
            style={{ 
              width: '48%', 
              backgroundColor: "#9FCE03", 
              color: "#fff", 
              fontWeight: "bold"
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button variant="outlined" 
            style={{ 
              width: '48%', 
              borderColor: "#9FCE03", 
              color: "#9FCE03", 
              fontWeight: "bold"
            }}
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </div>

      </Card>
    </div>
  );
}

export default Dailylog;
