import { useEffect, useState } from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { Container } from "@mui/material";
import Poll from "./Poll";
import PollList from "./PollList";
import { Route, Routes } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <ResponsiveAppBar />
            <Container sx={{ mt: 2  }}>
                <Routes>
                    <Route path="/poll">
                        <Route index element={<PollList />} />
                        <Route path=":pollID" element={<Poll />} />
                    </Route>
                </Routes>
            </Container>
        </div>
    )
}

export default Home;