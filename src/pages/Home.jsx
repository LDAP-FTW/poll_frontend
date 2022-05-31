import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Poll from "./Poll";
import PollList from "./PollList";
import Evaluation from "./Evaluation";
import Create from "./Create";

const Home = () => {
    return (
        <div>
            <ResponsiveAppBar />
            <Container sx={{ mt: 2  }}>
                <Routes>
                    <Route path="/poll">
                        <Route index element={<PollList />} />
                        <Route path="create" element={<Create />} />
                        <Route path="eval" element={<Evaluation />} />
                        <Route path=":pollID" element={<Poll />} />
                    </Route>
                </Routes>
            </Container>
        </div>
    )
}

export default Home;