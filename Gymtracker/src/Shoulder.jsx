import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';
import { useParams } from "react-router-dom";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cube';
import { IconButton, Typography, Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Form from './Form';

function Shoulder() {
  const { muscleGroup } = useParams(); 
  const [exercises, setExercises] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const getdata = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/exercises/shoulder`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      });
      setExercises(response.data);
    } catch (e) {
      console.log("Error fetching exercises", e);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleOpenForm = (exercise) => {
    setFormOpen(true);
    setSelectedExercise(exercise);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedExercise(null);
  };

  if (!exercises) {
    return <div style={{ color: 'white', textAlign: 'center' }}>Loading workouts...</div>;
  }

  return (
    <div
      style={{
        backgroundColor: '#000000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Swiper
        effect={'cube'}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCube, Pagination, Navigation]}
        className="mySwiper"
        style={{
          width: '90vw',
          maxWidth: '400px',
          height: '90vw',
          maxHeight: '400px',
        }}
      >
        {exercises.map((item, index) => (
          <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card
              variant="outlined"
              style={{
                width: '80vw',
                maxWidth: '320px',
                height: '80vw',
                maxHeight: '320px',
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '10px',
                border: '2px solid transparent',
                backgroundClip: 'padding-box',
                boxShadow: `0 0 15px rgba(255, 69, 0, 0.6), 
                            0 0 25px rgba(255, 69, 0, 0.5), 
                            0 0 35px rgba(255, 69, 0, 0.4)`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '10px',
                  padding: '2px',
                  background: 'linear-gradient(45deg, #FF4500, #FF6347, #FF7F50)',
                  zIndex: -1,
                  filter: 'blur(5px)',
                }}
              ></div>
              <Typography
                variant="h6"
                style={{
                  color: '#FF4500',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  padding: '5px 10px',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  textAlign: 'center',
                  fontSize: 'clamp(14px, 4vw, 20px)',
                }}
              >
                {item.name}
              </Typography>
              <IconButton
                style={{
                  backgroundColor: '#FF4500',
                  color: 'white',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                  padding: '10px',
                  borderRadius: '50%',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onClick={() => handleOpenForm(item)}
              >
                <AddIcon />
              </IconButton>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <Form exercise={selectedExercise} open={isFormOpen} onClose={handleCloseForm} />
    </div>
  );
}

export default Shoulder;
