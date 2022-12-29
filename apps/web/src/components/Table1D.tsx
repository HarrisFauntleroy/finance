import React from "react"

import { Table, TableContainer, Tbody, Td, Th, Tr } from "@chakra-ui/react"
import Currency from "~/components/Currency"

interface Table1DProps {
	data: [string, unknown][]
}

export const Table1D = ({ data }: Table1DProps) => {
	return (
		<TableContainer>
			<Table variant="simple" size="sm">
				<Tbody>
					{data?.map((item) => (
						<Tr key={`${item?.[1]}table1d`}>
							<Th>
								{item?.[0]
									?.replace(/([A-Z])/g, " $1")
									.replace(/^./, function (str) {
										return str.toUpperCase()
									})}
							</Th>
							<Td isNumeric>
								<Currency value={String(item?.[1])} />
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	)
}
