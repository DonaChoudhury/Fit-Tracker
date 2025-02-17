import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Button from "@mui/material/Button";
import { IconButton, Typography } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
function Workouts() {
    const [workouts, setWorkouts] = useState(null);
    const navigate = useNavigate();

    const getWorkout = async () => {
       try{
const response=await axios('http://localhost:3000/user/muscle-groups',
     {
        headers:{
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
    });
    setWorkouts(response.data)
       }
       catch(e)
       {
       console.log("error fetching muscle groups",e)
       }
    };

    useEffect(() => {
        getWorkout();
    }, []);

    if (!workouts) {
        return (
            <div style={{ color: 'white', textAlign: 'center' }}>Loading workouts...</div>
        );
    }

    return (
        <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {workouts.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Card
                            variant="outlined"
                            style={{
                                width: '200px',
                                height: '200px',
                                backgroundImage: `url(${item.url})`,
                                backgroundSize: 'cover',
                                backgroundPositionX: '52%',
                                // backgroundPositionY:'90%',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                                borderRadius: '10px',
                                border:'1px solid #A3E635',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end', // Align content at the bottom
                                alignItems: 'center', // Center horizontally
                                position: 'relative',
                                overflow: 'hidden',
                                padding: '10px',
                            }}
                        >
                            <br /><br />
                            <div style={{ marginTop: "120px" }}

                            >

                                <Typography variant="h5"
                                    style={{
                                        color: "#9FCE03",

                                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        marginBottom: "10px", // Add spacing between text and button
                                        textAlign: "center",

                                    }}


                                >{item.name}</Typography>
                            </div>
                            <br />
                            <IconButton
                                style={{
                                    backgroundColor: "#9FCE03",
                                    color: "white",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                                    padding: '10px',
                                    borderRadius: '50%',
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    
                                }}
                                onClick={()=>{
                                    navigate(`/${item.name}`)
                                }}
                            >


                                <AddIcon />
                            </IconButton>











                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
           


        </div>
    );
}

export default Workouts;
