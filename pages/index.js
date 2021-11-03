import React from "react";
import { Content } from "../components";
import { Feature } from "../components";
import { Asset } from "../components"
import { FreeTrialLayout } from "../components";
import { Footer } from "../components";
import { Insightful } from "../components";
import { Quantity } from "../components";

const LandingPage = () => {
    return (
        <>
            <Content />
            <Feature />
            <Asset />  
            <Quantity />
            <Insightful />
            <FreeTrialLayout />
            <Footer />
        </>
    );
};

export default LandingPage;