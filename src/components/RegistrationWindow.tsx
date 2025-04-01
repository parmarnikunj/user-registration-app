import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store/store";
import RegistrationForm from "./RegistrationForm";
import QRCode from "react-qr-code";
import {Box, Container, Link, Paper, Typography} from "@mui/material";
import {userService} from "../services/userService";
import PrivacyPolicy from "./PrivacyPolicy";
import {setPrivatePolicyToggle} from "../features/auth/authSlice";

const RegistrationWindow = () => {
    const dispatch = useDispatch();
    const {user, isPrivacyPolicyOn} = useSelector((state: RootState) => state.auth);
    const registrationLink = (registrationNumber: string) => {
        return userService.getRegistrationLink(registrationNumber)
    };
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{p: 4, mt: 8}}>
                {!user && (
                    <RegistrationForm/>
                )
                }
                {user && (
                    <Box>
                        <QRCode value={registrationLink(user.registrationNumber)}/>
                        <Typography fontWeight={"bold"}>
                            Take Screenshot of this QR code
                        </Typography>
                        <Typography fontWeight={"bold"}>
                            You have to show it in the Event.
                        </Typography>
                    </Box>
                )
                }
                {!isPrivacyPolicyOn && (
                    <Link onClick={() => dispatch(setPrivatePolicyToggle(true))}>Privacy Policy</Link>
                )
                }
                {isPrivacyPolicyOn && (
                    <PrivacyPolicy/>
                )

                }

            </Paper>
        </Container>
    );
};

export default RegistrationWindow;