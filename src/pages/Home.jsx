import { Route, Routes } from "react-router-dom";
import { Container, Paper } from "@mui/material";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Poll from "./Poll";
import PollList from "./PollList";
import Evaluation from "./Evaluation";
import EvalPollList from "./EvalPollList";
import Create from "./Create";

const Home = () => {
    return (
        <div>
            <ResponsiveAppBar />
            <Container>
                <Paper sx={{ p: 2 }} elevation={0}>
                    <Routes>
                        <Route path="/poll">
                            <Route index element={<PollList />} />
                            <Route path="create" element={<Create />} />
                            <Route path="eval">
                                <Route index element={<EvalPollList />}/>
                                <Route path=":pollID" element={<Evaluation />}/>
                            </Route>
                            <Route path=":pollID" element={<Poll />} />
                        </Route>
                    </Routes>
                </Paper>
            </Container>
        </div>
    )
}

export default Home;