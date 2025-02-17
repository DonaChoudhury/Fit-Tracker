import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';

function StepCount() {
  const [weekdata, setweeklydata] = useState([]);

  const getweekdata = async () => {
    const resp = await axios.get("http://localhost:3000/user/oneWeekHabits", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    });
    setweeklydata(resp.data);
    console.log(resp.data);
  };

  useEffect(() => {
    getweekdata();
  }, []);

  const StepCounts = weekdata.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString(),
    Steps: entry.stepCount,
  }));

  const dates = StepCounts.map((entry) => entry.date);
  const StepsValues = StepCounts.map((entry) => entry.Steps);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <LineChart
        xAxis={[{ scaleType: 'band', data: dates }]}
        series={[
          {
            data: StepsValues,
            area: true,
            line: { stroke: '#8884d8' },
            fill: '#8884d8',
          },
        ]}
        width={isSmallScreen ? 350 : 800} // Adjust width for responsiveness
        height={400}
      />
    </Box>
  );
}

export default StepCount;
