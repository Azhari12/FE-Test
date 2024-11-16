/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocationType } from "@/lib/types/location";
import { cn } from "@/lib/utils";
import { Checkbox, rem, ScrollArea, Table } from "@mantine/core";
import classes from "./TableSelection.module.css";

const TableLocation = ({
	data,
	selection,
	setSelection,
}: {
	data: LocationType[];
	selection: LocationType[];
	setSelection: any;
}) => {
	const toggleRow = (item: LocationType) =>
		setSelection((current: any) =>
			current.includes(item)
				? current.filter((i: any) => i.id !== item.id)
				: [...current, item]
		);

	const toggleAll = () =>
		setSelection((current: any) =>
			current.length === data.length ? [] : data.map((item) => item)
		);

	const rows = data.map((item) => {
		const selected = selection.some(
			(itemSelected) => itemSelected.id === item.id
		);
		return (
			<Table.Tr key={item.id} className={cn({ [classes.rowSelected]: selected })}>
				<Table.Td>
					<Checkbox
						checked={selection.some((itemSelected) => itemSelected.id === item.id)}
						onChange={() => toggleRow(item)}
					/>
				</Table.Td>
				<Table.Td>{item.nama_lokasi}</Table.Td>
				<Table.Td>{item.gudang}</Table.Td>
				<Table.Td>{item.jenis}</Table.Td>
				<Table.Td>{item.volume}</Table.Td>
				<Table.Td>
					<p className="">{item.deskripsi}</p>
				</Table.Td>
			</Table.Tr>
		);
	});
	return (
		<ScrollArea>
			<Table miw={800} verticalSpacing="sm">
				<Table.Thead>
					<Table.Tr>
						<Table.Th style={{ width: rem(40) }}>
							<Checkbox
								onChange={toggleAll}
								checked={selection.length === data.length}
								indeterminate={selection.length > 0 && selection.length !== data.length}
							/>
						</Table.Th>
						<Table.Th>Nama Lokasi</Table.Th>
						<Table.Th>Gudang</Table.Th>
						<Table.Th>Jenis</Table.Th>
						<Table.Th>Volume</Table.Th>
						<Table.Th>Deksripsi</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</ScrollArea>
	);
};

export default TableLocation;
