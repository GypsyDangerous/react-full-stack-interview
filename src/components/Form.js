const Form = props => {
	return (
		<form
			{...props}
			onSubmit={e => {
				e.preventDefault();
				if (props.onSubmit) props.onSubmit(e);
			}}
		/>
	);
};

export default Form