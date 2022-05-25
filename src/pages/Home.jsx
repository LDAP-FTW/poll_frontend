import { useEffect, useState } from "react";
import { useSignOut } from "react-auth-kit";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Question from "../components/Question";
import { Container } from "@mui/material";

const Home = () => {
    const signOut = useSignOut();
    const [poll, setPoll] = useState(null);


    useEffect(() => {
        //fetch("/api/poll").then(res => res.json()).then(poll => setPoll(poll))
        fetch("https://opentdb.com/api.php?amount=10").then(res => res.json()).then(poll => setPoll(poll.results))
    }, [])

    return (
        <div>
            <ResponsiveAppBar/>
            <Container id="list">
                {poll && poll.map((question, index) => 
                    <Question key={index} question={question.question} cAnswer={question.correct_answer} answers={_.shuffle([question.correct_answer].concat(question.incorrect_answers))}/>
                    )} 
            </Container>
        </div>
    )
}

export default Home;