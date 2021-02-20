import { Link, Route, Switch, Redirect } from "react-router-dom";
import Robots, { RobotPage } from "./routes/robots";
import Fights from "./routes/fights";
import Home from "./routes/home";
import styled from "styled-components";

const Header = styled.header`
	display: flex;
	justify-content: space-around;
	margin-bottom: 1rem;
`

const Main = styled.main`
	display: flex;
	align-items: center;
	flex-direction: column;
`

function App() {
	return (
		<div className="App">
			<Header className="App-header">
				<h1>Robot Wars</h1>
				<Link to="/"> Home</Link>
			</Header>

			<Main>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/robots/:id" component={RobotPage} />
					<Route path="/robots" component={Robots} />
					<Route path="/fights/:id" component={Fights} />
					<Route path="/fights/" component={Fights} />
					<Redirect to="/" />
				</Switch>
			</Main>

			<footer></footer>
		</div>
	);
}

export default App;
