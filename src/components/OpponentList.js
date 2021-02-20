import { Modal } from "@material-ui/core";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { LargeHeading } from "../styles/heading";
import { ModalBody } from "./CreateRobot";

const OpponentList = props => {
	const { isLoading, isError, data, error } = useQuery("robots", async () => {
		const response = await fetch("http://localhost:3001/robots/getAll");
		const json = await response.json();
		return json;
	});

	if (isLoading) {
		return (
			<>
				<LargeHeading>Loading...</LargeHeading>
			</>
		);
	}

	if (error) {
		return (
			<>
				<LargeHeading>Whoops, an error occured</LargeHeading>
				<Link to="/">Go Home</Link>
			</>
		);
	}

	const { data: robots } = data;


	return (
		<Modal open={props.open} onClose={props.handleClose}>
			<ModalBody>
				<ul>
					{robots
						.filter(robot => robot._id !== props.fighter._id)
						.map(robot => (
							<li
								onClick={() => {
									props.select(robot);
									props.handleClose();
								}}
								key={robot._id}
							>
								{robot.name}
							</li>
						))}
				</ul>
			</ModalBody>
		</Modal>
	);
};

export default OpponentList