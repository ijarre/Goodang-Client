import React from "react";
import { Content } from "../components";
import { Feature } from "../components";
import { FreeTrialLayout } from "../components";
import { Footer } from "../components"

const LandingPage = () => {
    return (
        <>
            <Content />
            <Feature />
            <FreeTrialLayout />
            <Footer />
        </>
    );
};

export default LandingPage;