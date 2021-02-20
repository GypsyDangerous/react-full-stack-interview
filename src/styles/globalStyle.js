import styled, {createGlobalStyle} from "styled-components"

const globalStyle = createGlobalStyle`

	body{
		font-family: Poppins, sans-serif
	}

`

export const ColumnFlex = styled.div`
	display: flex;
	flex-direction: column;
`

export default globalStyle