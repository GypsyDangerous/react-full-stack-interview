import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { LargeHeading } from "../styles/heading";
import Robot from "../components/Robot";
import { useState } from "react";
import CreateRobot from "../components/CreateRobot";
import { useEffect } from "react";

const Robots = () => {
	const [criteria, setCriteria] = useState(0);
	const [mappedData, setMappedData] = useState([]);

	const { isLoading, isError, data, error } = useQuery(["fights", criteria], async () => {
		const response = await fetch("http://localhost:3001/fights/getAll");
		const json = await response.json();
		return json;
	});

	useEffect(() => {
		(async () => {
			setMappedData(
				await Promise.all(
					data?.data?.map(async fight => {
						const response = await fetch(
							`http://localhost:3001/robots/getOne?id=${fight.winner}`
						);
						const json = await response.json();

						return { ...fight, winner: json.data };
					}) || []
				)
			);
		})();
	}, [data]);


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


	const { count} = data;

	return (
		<>
			<LargeHeading>
				{count} Fight{count > 1 ? "s" : ""}
			</LargeHeading>
			<ul>
				{mappedData.map((fight, i) => (
					<li key={fight._id}>
						{i}. Winner: {fight.winner.name}
					</li>
				))}
			</ul>
		</>
	);
};

export default Robots;
