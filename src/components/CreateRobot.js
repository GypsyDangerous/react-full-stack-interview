import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
import { LargeHeading } from "../styles/heading";
import Form from "./Form";
import { useReducer } from "react";
import TextField from "@material-ui/core/TextField";
import { ColumnFlex } from "../styles/globalStyle";
import Button from "@material-ui/core/Button";
import { BlockPicker } from "react-color";
import { constrain } from "../utils/functions";
import ColorPicker from "./ColorPicker";

export const ModalBody = styled(ColumnFlex)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: solid white;
	padding: 2rem;
`;

const StyledForm = styled(Form)`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const actions = {
	UPDATE: "update",
};

const robotReducer = (state, action) => {
	switch (action.type) {
		case actions.UPDATE:
			return { ...state, [action.key]: action.value };
		default:
			return state;
	}
};

const numberProps = {
	type: "number",
	min: 1,
	max: 10,
};

const CreateRobot = props => {
	const [state, dispatch] = useReducer(robotReducer, { color: "#000000" });

	const handleSumbit = async () => {

		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const response = await fetch("http://localhost:3001/robots/create", {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(state),
		});
		const json = await response.json();
		if (json.success) {
			props.handleClose();
		}
	};

	return (
		<Modal open={props.open} onClose={props.handleClose}>
			<ModalBody>
				<LargeHeading>Create Robot</LargeHeading>
				<StyledForm onSubmit={handleSumbit}>
					<TextField
						value={state.name}
						onChange={e =>
							dispatch({ type: actions.UPDATE, key: "name", value: e.target.value })
						}
						id="outlined-basic"
						label="Name"
						variant="outlined"
						required
					/>
					<TextField
						id="outlined-basic"
						value={state.attack}
						onChange={e =>
							dispatch({
								type: actions.UPDATE,
								key: "attack",
								value: constrain(e.target.value, 1, 10),
							})
						}
						label="Attack"
						variant="outlined"
						inputProps={{ ...numberProps }}
						required
					/>
					<TextField
						id="outlined-basic"
						value={state.defense}
						onChange={e =>
							dispatch({
								type: actions.UPDATE,
								key: "defense",
								value: constrain(e.target.value, 1, 10),
							})
						}
						label="Defense"
						variant="outlined"
						inputProps={{ ...numberProps }}
						required
					/>
					<TextField
						required
						id="outlined-basic"
						label="Healing Factor"
						value={state.healing}
						onChange={e =>
							dispatch({
								type: actions.UPDATE,
								key: "healing",
								value: constrain(e.target.value, 1, 10),
							})
						}
						variant="outlined"
						inputProps={{ ...numberProps }}
					/>
					<ColorPicker
						value={state.color}
						onChange={color =>
							dispatch({ type: actions.UPDATE, key: "color", value: color.hex })
						}
					/>
					<Button type="submit" variant="contained" color="primary">
						Create
					</Button>
				</StyledForm>
			</ModalBody>
		</Modal>
	);
};

export default CreateRobot;
