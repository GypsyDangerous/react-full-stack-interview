import { useState } from "react";
import { BlockPicker } from "react-color";
import styled from "styled-components";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import chroma from "chroma-js";

const ColorBody = styled.div`
	position: relative;
	padding: 1rem;
	background: ${({ background }) => background};
	border-radius: 0.5rem;
	text-align: center;
	color: ${({ background }) =>
		chroma(background || "#000000").luminance() > 0.4 ? "black" : "white"};
	z-index: 10;
	.block-picker {
		position: absolute !important;
	}
`;

const ColorPicker = props => {
	const [open, setOpen] = useState(false);

	return (
		<ClickAwayListener onClickAway={() => setOpen(false)}>
			<ColorBody background={props.value} onClick={() => setOpen(true)}>
				{open && (
					<BlockPicker
						color={props.value}
						onChangeComplete={props.onChange}
					></BlockPicker>
				)}
				Color
			</ColorBody>
		</ClickAwayListener>
	);
};

export default ColorPicker;
