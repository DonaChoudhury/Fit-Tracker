import React, { useState } from 'react';
import { Card, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
function Form({ exercise, open, onClose }) {
  if (!open || !exercise) return null; // Only render the form when open

  const [set1,setSet1]=useState({weight:"",reps:""})
  const [set2,setSet2]=useState({weight:"",reps:""})
  const [set3,setSet3]=useState({weight:"",reps:""})
  
  const handleSubmit=async()=>{
    try {
      // Set the loading state to true to indicate that submission is in progress
      const response = await axios.post(
        "http://localhost:3000/user/logExercise",
        {
          exerciseId: exercise._id, // Pass the exercise ID
          sets: [
            { set: 1, weight: set1.weight, reps: set1.reps },
            { set: 2, weight: set2.weight, reps: set2.reps },
            { set: 3, weight: set3.weight, reps: set3.reps },
          ],
        },
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"), // Attach token in headers
          },
        }
      );
      
      // Show success message and close the form
      alert("Exercise logged successfully!");
      onClose();
    } catch (error) {
      // If there's an error, log it and show a user-friendly error message
      console.error("Error logging exercise:", error.response?.data || error);
      alert("There was an error logging the exercise. Please try again.");
    }
  }
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dimmed background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Card
        style={{
          width: '450px',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          position: 'relative',
        }}
      >
        <Typography
          variant="h6"
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            fontWeight: 'bold',
          }}
        >
          Add Details for {exercise.name}
        </Typography>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Row for Set 1 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Typography
              variant="body1"
              style={{
                fontWeight: 'bold',
                minWidth: '60px',
                textAlign: 'right',
              }}
            >
              Set 1
            </Typography>
            <TextField
              label="Weight (kg)"
              type="number"
              fullWidth value={set1.weight}
              variant="outlined"
              onChange={(e)=>{
                setSet1({...set1,weight:e.target.value})
              }}
            />
            <TextField
              label="Reps"
              type="number"
              fullWidth value={set1.reps}
              variant="outlined"
              onChange={(e)=>{
                setSet1({...set1,reps:e.target.value})
              }}
            />
          </div>

          {/* Row for Set 2 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Typography
              variant="body1"
              style={{
                fontWeight: 'bold',
                minWidth: '60px',
                textAlign: 'right',
              }}
            >
              Set 2
            </Typography>
            <TextField
              label="Weight (kg)"
              type="number"
              fullWidth value={set2.weight}
              variant="outlined"
              onChange={(e)=>{
                setSet2({...set2,weight:e.target.value})
              }}
            />
            <TextField
              label="Reps"
              type="number"
              fullWidth value={set2.reps}
              variant="outlined"
              onChange={(e)=>{
                setSet2({...set2,reps:e.target.value})
              }}
            />
          </div>

          {/* Row for Set 3 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Typography
              variant="body1"
              style={{
                fontWeight: 'bold',
                minWidth: '60px',
                textAlign: 'right',
              }}
            >
              Set 3
            </Typography>
            <TextField
              label="Weight (kg)"
              type="number"
              fullWidth value={set3.weight}
              variant="outlined"
              onChange={(e)=>{
                setSet3({...set3,weight:e.target.value})
              }}
            />
            <TextField
              label="Reps"
              type="number"
              fullWidth value={set3.reps}
              variant="outlined"
              onChange={(e)=>{
                setSet3({...set3,reps:e.target.value})
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button variant="outlined" color="secondary" onClick={()=>{onClose()}}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Form;