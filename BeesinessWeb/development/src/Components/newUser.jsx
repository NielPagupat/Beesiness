import React from 'react';
import { Typography, Button, Box, Container } from '@mui/material';

export default function AboutUs() {
    return (
            <Container style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '100%', 
                minHeight: '100vh', 
            }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <Typography variant="h4" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Welcome to our company's About Us page. We are dedicated to providing top-quality services/products and ensuring customer satisfaction.
                    </Typography>
                    
                    <Button variant="contained" color="primary">
                        Contact Us
                    </Button>
                </div>
                <Box display="flex" justifyContent="center">
                    <DeveloperBox name="Lance Cambarijan" role="Frontend Developer" />
                    <DeveloperBox name="Niel Angelo Pagupat" role="Backend Developer" />
                    <DeveloperBox name="Gerome Quilestino" role="UI/UX Designer" />
                    <DeveloperBox name="Joycen Lim" role="Documentation" />
                </Box>
            </Container>
    );
}

function DeveloperBox({ name, role }) {
    return (
        <Box width="300px" m={2} p={2} boxShadow={3}>
            <Typography variant="h6" gutterBottom>
                {name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
                {role}
            </Typography>
        </Box>
    );
}
