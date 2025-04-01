import React from "react";
import {Box, Button, Link, Typography, Container, Paper} from "@mui/material";
import {useDispatch} from "react-redux";
import {setPrivatePolicyToggle} from "../features/auth/authSlice";

const PrivacyPolicy: React.FC = () => {
    const dispatch = useDispatch()
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, my: 4 }}>
                <Typography variant="h6" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                    Privacy Policy
                </Typography>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="body1" paragraph>
                        The responsible body within the meaning of data protection laws, in particular the EU General Data
                        Protection Regulation (GDPR), is:
                    </Typography>
                    <Typography variant="body1" sx={{ pl: 2 }}>
                        Manfred Gutheins<br />
                        Im Tal 16<br />
                        14532 Kleinmachnow
                    </Typography>
                </Box>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Your Data Subject Rights
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You can exercise the following rights at any time using the contact details provided by our data
                        protection officer:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                        <Typography component="li" variant="body1">Information about your data stored by us and its processing (Art. 15 GDPR)</Typography>
                        <Typography component="li" variant="body1">Correction of incorrect personal data (Art. 16 GDPR)</Typography>
                        <Typography component="li" variant="body1">Deletion of your data stored by us (Art. 17 GDPR)</Typography>
                        <Typography component="li" variant="body1">Restriction of data processing if we are not yet allowed to delete your data due to legal obligations (Art. 18 GDPR)</Typography>
                        <Typography component="li" variant="body1">Objection to the processing of your data by us (Art. 21 GDPR)</Typography>
                        <Typography component="li" variant="body1">Data portability, provided that you have consented to data processing or have concluded a contract with us (Art. 20 GDPR)</Typography>
                    </Box>
                    <Typography variant="body1" paragraph>
                        If you have given us your consent, you can revoke it at any time with effect for the future.
                    </Typography>
                    <Typography variant="body1">
                        You can lodge a complaint with a supervisory authority at any time, for example, the competent
                        supervisory authority in the federal state in which you reside or the authority responsible for us
                        as the responsible body.
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Collection of Your Personal Information
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We, Hariprabodham Group Berlin,
                        would like to keep you informed about our services, events, and activities by
                        post, phone, email, and SMS.
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Legal Basis
                    </Typography>
                    <Typography variant="body1">
                        The processing is carried out in accordance with Art. 6 (1) (f) GDPR on the basis of our legitimate
                        interest in improving the stability and functionality of our website.
                    </Typography>
                </Box>
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => dispatch(setPrivatePolicyToggle(false))}
                    >
                        Accept and Close
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default PrivacyPolicy;