import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Waterintake() {
  const [weekdata, setweeklydata] = useState([]);

  const getweeklydata = async () => {
    const resp = await axios.get("http://localhost:3000/user/oneWeekHabits", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    });
    setweeklydata(resp.data);
  };

  useEffect(() => {
    getweeklydata();
  }, []);

  const waterData = weekdata.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString(),
    intake: entry.waterIntake,
  }));

  const dates = waterData.map((entry) => entry.date);
  const intakeValues = waterData.map((entry) => entry.intake);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <LineChart
        xAxis={[{ scaleType: 'band', data: dates }]}
        series={[
          {
            data: intakeValues,
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

export default Waterintake;
