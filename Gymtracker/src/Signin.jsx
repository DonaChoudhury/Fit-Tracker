import React, { useState } from "react";
import { Card, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../Store/atom/user.js";
import axios from "axios";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState);
  

  return (
    <div
      style={{
        position:"absolute",
        left: "0",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    height: "100vh",
        backgroundImage: "url(https://wallpapercave.com/wp/wp3189389.jpg)",
        backgroundSize: "100% 100%",
        // flexDirection:"column",
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
          // height:"auto",
          maxHeight:"80vh",
          padding: "20px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
          borderRadius: "10px",
          backgroundColor: "#000000",
          color: "#9FCE03",
          border: "1px solid #9FCE03",
        
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Your Progress Awaits – Sign In Now!
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
          style={{ marginBottom: "30px" }}
          onChange={(event) => setPassword(event.target.value)}
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
            try {
              const response = await axios.post(
                "http://localhost:3000/user/login",
                { username: email, password }, // Sending in request body
                {
                  headers: { "Content-Type": "application/json" },
                }
              );
        
              let data = response.data;
              localStorage.setItem("token", data.token);
              setUser({ userEmail: email, isLoading: false });
              navigate("/");
            } catch (error) {
              if (error.response && error.response.status === 403) {
                alert("Invalid username or password!"); // ✅ Alert for incorrect credentials
              } else {
                alert("Something went wrong. Please try again!"); // General error
              }
              console.error("Login error:", error);
            }
          }}
        
        >
          Sign In
        </Button>
      </Card>
    </div>
  );
}

export default Signin;
