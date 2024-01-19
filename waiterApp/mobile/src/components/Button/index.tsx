import React from "react"
import { Text } from "../Text"
import { Container } from "./styles"

interface ButtonProps {

	label: string;
	disabled?: boolean;
	onPress: () => void;
}

export function Button({label, onPress, disabled}: ButtonProps) {
	return (
		<Container onPress={onPress} disabled={disabled}>
			<Text weight="600" color="#fff">{label}</Text>
		</Container>
	)
}
