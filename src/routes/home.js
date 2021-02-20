import { NavLink } from "react-router-dom";
import { LargeHeading } from "../styles/heading";
import { LinkSection } from "../styles/home";

const Home = () => {
	return (
		<>
			<LargeHeading>Welcome to Robot Wars</LargeHeading>
			<LinkSection>
				<NavLink to="/robots">View Robots</NavLink>
				<NavLink to="/fights">View Fights</NavLink>
			</LinkSection>
		</>
	);
};

export default Home;
