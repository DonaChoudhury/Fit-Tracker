import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../Store/atom/user.js";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const setUser = useSetRecoilState(userState);
    const [height,setheight]=useState("")
      const [weight,setweight]=useState("")

    return (
        <div
            style={{
                left:"0",
                width:"100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            
    position:"absolute",
                backgroundImage: "url(https://img.freepik.com/free-photo/low-angle-view-unrecognizable-muscular-build-man-preparing-lifting-barbell-health-club_637285-2497.jpg?t=st=1738865734~exp=1738869334~hmac=843faa5f883571d65dc942c034a556816459afe0dabff45397542309de6bef4a&w=996)",
                backgroundSize: "cover", 
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                padding: "20px",
                boxSizing: "border-box",
            }}
        >
            <Card
                variant="outlined"
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "30px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
                    borderRadius: "10px",
                    backgroundColor: "#000000",
                    color: "#9FCE03",
                    border: "1px solid rgb(107, 135, 14)",
                }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    style={{
                        textAlign: "center",
                        marginBottom: "20px",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                    }}
                >
                    Your Fitness Journey Begins Here
                </Typography>
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    style={{ marginBottom: "20px" }}
                    onChange={(event) => setEmail(event.target.value)}
                    InputLabelProps={{ style: { color: "#FFFFFFB3" } }}
                    InputProps={{
                        style: {
                            color: "white",
                            backgroundColor: "#383838",
                            borderRadius: "5px",
                            border: "1px solid #FFFFFF",
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: "30px" }}
                    InputLabelProps={{ style: { color: "#FFFFFFB3" } }}
                    InputProps={{
                        style: {
                            color: "white",
                            backgroundColor: "#383838",
                            borderRadius: "5px",
                            border: "1px solid #FFFFFF",
                        },
                    }}
                />
                <TextField
                          fullWidth
                          label="height(cm)"
                          variant="outlined"
                          type="height"
                          style={{ marginBottom: "30px" }}
                          onChange={(event) => setheight(event.target.value)}
                          InputLabelProps={{ style: { color: "#FFFFFFB3" } }}
                          InputProps={{
                            style: {
                              color: "white",
                              backgroundColor: "#383838",
                              borderRadius: "5px",
                              border: "1px solid #FFFFFF",
                            },
                          }}
                        />
                        <TextField
                                  fullWidth
                                  label="weight(kg)"
                                  variant="outlined"
                                  type="weight"
                                  style={{ marginBottom: "30px" }}
                                  onChange={(event) => setweight(event.target.value)}
                                  InputLabelProps={{ style: { color: "#FFFFFFB3" } }}
                                  InputProps={{
                                    style: {
                                      color: "white",
                                      backgroundColor: "#383838",
                                      borderRadius: "5px",
                                      border: "1px solid #FFFFFF",
                                    },
                                  }}
                                />
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    style={{
                        backgroundColor: "#9FCE03",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        transition: "background-color 0.3s ease",
                    }}
                    onClick={async () => {
                        const response = await axios.post("http://localhost:3000/user/signup", {
                            username: email,
                            password: password,
                            height:height,
                            weight:weight
                        });
                        let data = response.data;
                        localStorage.setItem("token", data.token);
                        setUser({ userEmail: email, isLoading: false });
                        navigate("/");
                    }}
                >
                    Signup
                </Button>
            </Card>
        </div>
    );
}

export default Signup;
