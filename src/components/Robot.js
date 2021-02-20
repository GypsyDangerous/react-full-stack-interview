import { Link } from "react-router-dom";
import styled from "styled-components";
import { ColumnFlex } from "../styles/globalStyle";

const StyledRobot = styled(ColumnFlex)`
	gap: 0.5rem;
`;

const RobotFooter = styled.div`
	display: flex;
	gap: 1rem;
`

const Robot = props => {
	return (
		<StyledRobot>
			<div>{props.name}</div>
			{/* <div>
				health: {props.health} defense: {props.defense} attack: {props.attack} Healing
				Factor {props.healing}
			</div> */}
			<RobotFooter>
				<Link to={`/robots/${props._id}`}>Details</Link>
				<button
					onClick={async () => {
						const response = await fetch(
							`http://localhost:3001/robots/deleteOne?id=${props._id}`,
							{ method: "DELETE" }
						);
						const json = await response.json();
						console.log(json);
						props.handleDelete();
					}}
				>
					Delete
				</button>
			</RobotFooter>
		</StyledRobot>
	);
};

export default Robot;
