import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Typography, Box, Container, Paper, useMediaQuery,IconButton } from '@mui/material';
import axios from 'axios';
import { Delete } from '@mui/icons-material';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [exercises, setExercises] = useState([]);

  // Media query for responsiveness
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchLog = async () => {
      const response = await axios.get(
        `http://localhost:3000/user/getExeriseLog?date=${selectedDate.toISOString().split("T")[0]}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setExercises(response.data.logs);
      console.log(response.data.logs);
    };
    fetchLog();
  }, [selectedDate]);

  function handleDateChange(newDate) {
    setSelectedDate(newDate);
  }

  const handleDeleteSet = async (exerciseId, setIndex) => {
    try {
      const response = await axios.delete("http://localhost:3000/user/deleteSet", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          date: selectedDate.toISOString().split("T")[0],
          exerciseId,
          index: setIndex,
        },
      });
  
      setExercises(response.data.log); // Update UI with the new log data
    } catch (error) {
      console.error("Error deleting set:", error.response?.data?.msg || error.message);
    }
  };
  

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "flex-start", 
        py: 3,
        mt: 8
      }}
    >
      {/* Calendar Box */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          width: "100%", 
          maxWidth: isSmallScreen ? 320 : 400,  // Adjust width based on screen size
          textAlign: "center", 
          borderRadius: 2,
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center"
        }}
      >
        <Typography variant="h6" mb={2}>
          Choose date to see the exercise logs
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker 
            defaultValue={dayjs()} 
            onChange={handleDateChange}
            displayStaticWrapperAs="desktop"
            sx={{
              "& .MuiPickersCalendarHeader-root": { minHeight: "30px" },
              "& .MuiDayCalendar-root": { minHeight: isSmallScreen ? "200px" : "250px" },
            }}
          />
        </LocalizationProvider>
      </Paper>

      {/* Logs Box */}
      {selectedDate && (
        <Box 
          mt={3} 
          width="100%" 
          maxWidth={isSmallScreen ? 320 : 400} 
          textAlign="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Exercises Logged on {selectedDate.toISOString().split("T")[0]}
          </Typography>

          {exercises && exercises.length > 0 ? (
            <Box display="flex" flexDirection="column" alignItems="center">
              {exercises.map((exercise, index) => (
                <Paper 
                  key={index} 
                  elevation={3} 
                  sx={{ 
                    p: 2, 
                    my: 1, 
                    width: "100%", 
                    textAlign: "center", 
                    borderRadius: 2 
                  }}
                >
                  <Typography variant="h6">
                    <strong>{exercise.exerciseId.name}</strong>
                  </Typography>
                  {exercise.sets.map((set, setIndex) => (
                    <Typography key={setIndex} variant="body1">
                      Set {setIndex + 1}: {set.reps} reps X {set.weight} kg
                      <IconButton color="error"
                      onClick={() => handleDeleteSet(exercise.exerciseId._id, setIndex)}
                      >
                    <Delete />
                  </IconButton>
                    </Typography>
                    
                  ))}
                  
                </Paper>
                
              ))}
              
            </Box>

            
          ) : (
            <Typography variant="h6">No exercises logged on this date</Typography>
          )}
        </Box>
      )}
    </Container>
  );
}
