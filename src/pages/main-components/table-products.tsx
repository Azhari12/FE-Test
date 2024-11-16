/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductType } from "@/lib/types/product";
import { cn } from "@/lib/utils";
import { Checkbox, Pagination, rem, ScrollArea, Table } from "@mantine/core";
import classes from "./TableSelection.module.css";

const TableProducts = ({
	data,
	selection,
	setSelection,
}: {
	data: ProductType[];
	selection: ProductType[];
	setSelection: any;
}) => {
	const toggleRow = (item: ProductType) =>
		setSelection((current: any) =>
			current.includes(item)
				? current.filter((i: any) => i.kodeBarang !== item.kodeBarang)
				: [...current, item]
		);
	const toggleAll = () =>
		setSelection((current: any) =>
			current.length === data.length ? [] : data.map((item) => item)
		);

	const rows = data.map((item) => {
		const selected = selection.some(
			(itemSelected) => itemSelected.kodeBarang === item.kodeBarang
		);
		return (
			<Table.Tr
				key={item.kodeBarang}
				className={cn({ [classes.rowSelected]: selected })}
			>
				<Table.Td>
					<Checkbox
						checked={selection.some(
							(itemSelected) => itemSelected.kodeBarang === item.kodeBarang
						)}
						onChange={() => toggleRow(item)}
					/>
				</Table.Td>
				<Table.Td>{item.kodeBarang}</Table.Td>
				<Table.Td>{item.namaBarang}</Table.Td>
				<Table.Td>{item.merk}</Table.Td>
				<Table.Td>{item.jenisBarang}</Table.Td>
				<Table.Td>{item.gudang}</Table.Td>
				<Table.Td>{item.totalStock}</Table.Td>
			</Table.Tr>
		);
	});

	return (
		<>
			<ScrollArea>
				<Table miw={800} verticalSpacing="sm">
					<Table.Thead>
						<Table.Tr>
							<Table.Th style={{ width: rem(40) }}>
								<Checkbox
									onChange={toggleAll}
									checked={selection.length === data.length}
									indeterminate={
										selection.length > 0 && selection.length !== data.length
									}
								/>
							</Table.Th>
							<Table.Th>Kode Barang</Table.Th>
							<Table.Th>Nama Barang</Table.Th>
							<Table.Th>Merk</Table.Th>
							<Table.Th>Jenis Barang</Table.Th>
							<Table.Th>Gudang</Table.Th>
							<Table.Th>Total Stock (Pcs)</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</ScrollArea>
			<div className="flex justify-end">
				<Pagination total={50} siblings={2} defaultValue={1} />
			</div>
		</>
	);
};

export default TableProducts;
