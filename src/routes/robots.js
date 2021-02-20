import { useQuery, useMutation } from "react-query";
import { Link } from "react-router-dom";
import { LargeHeading } from "../styles/heading";
import Robot from "../components/Robot";
import { useState } from "react";
import CreateRobot from "../components/CreateRobot";
import { useParams } from "react-router-dom";
import { ColumnFlex } from "../styles/globalStyle";
import OpponentList from "../components/OpponentList";
import { fight } from "../utils/functions";
import {ModalBody} from "../components/CreateRobot"
import { Modal } from "@material-ui/core";

export const RobotPage = () => {
	const { id } = useParams();
	const [opponent, setOponent] = useState(null);
	const [isOpponentModalOpen, setIsOpponentModalOpen] = useState(false);
	const [iWon, setIwon] = useState(null)

	const { isLoading, isError, data, error } = useQuery(["robot", id], async () => {
		const response = await fetch(`http://localhost:3001/robots/getOne?id=${id}`);
		return response.json();
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

	const { data: robot } = data;


	return (
		<div>
			<Modal open={iWon != null} onClose={() => setIwon(null)}>
				<ModalBody>{iWon ? "You Win!" : "You Lose"}</ModalBody>
			</Modal>
			<OpponentList
				fighter={robot}
				select={op => setOponent(op)}
				handleClose={() => setIsOpponentModalOpen(false)}
				open={isOpponentModalOpen}
			/>
			<LargeHeading>Info about {robot.name}</LargeHeading>
			<ColumnFlex>
				<ul>
					<li>health: {robot.health}</li>
					<li>attack: {robot.attack}</li>
					<li>defense: {robot.defense}</li>
					<li>healing factor: {robot.healing}</li>
				</ul>
			</ColumnFlex>
			{!opponent ? (
				<button onClick={() => setIsOpponentModalOpen(true)}>Choose Opponent</button>
			) : (
				<button
					onClick={async () => {
						const results = fight(robot, opponent);
						const members = results.members.map(r => r._id);
						const winner = results.winner._id;
						const body = { members, winner };

						console.log(body)
						const response = await fetch(`http://localhost:3001/fights/save`, {
							method: "POST",
							body: JSON.stringify(body),
							headers: {
								"content-type": "application/json",
							},
						});

						setIwon(winner === robot._id)
					}}
				>
					Fight
				</button>
			)}
		</div>
	);
};

const Robots = () => {
	const [criteria, setCriteria] = useState(0);

	const { isLoading, isError, data, error } = useQuery(["robots", criteria], async () => {
		const response = await fetch("http://localhost:3001/robots/getAll");
		const json = await response.json();
		return json;
	});

	const [isCreateRobotModalOpen, setIsCreateRobotModalOpen] = useState(false);

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

	const { count, data: robots } = data;

	return (
		<>
			<CreateRobot
				open={isCreateRobotModalOpen}
				handleClose={() => {
					setIsCreateRobotModalOpen(false);
					setCriteria(Math.random());
				}}
			></CreateRobot>
			<button onClick={() => setIsCreateRobotModalOpen(true)}>Create New Robot</button>
			<LargeHeading>
				{count} Robot{count > 1 ? "s" : ""}
			</LargeHeading>
			<ul>
				{robots.map(robot => (
					<li key={robot._id}>
						<Robot {...robot} handleDelete={() => setCriteria(Math.random())} />
					</li>
				))}
			</ul>
		</>
	);
};

export default Robots;
