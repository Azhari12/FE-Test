/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductType } from "@/lib/types/product";
import { cn } from "@/lib/utils";
import { Button, Checkbox, rem, ScrollArea, Table } from "@mantine/core";
import classes from "./TableSelection.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { BiSolidTrash } from "react-icons/bi";
import { LocationType } from "@/lib/types/location";

const TableGenerate = ({
	data,
	selection,
	setSelection,
	addLocation,
	deleteLocation,
	selectedRow,
	setSelectedRow,
}: {
	data: ProductType[];
	selection: ProductType[];
	setSelection: any;
	addLocation: (e: ProductType) => void;
	deleteLocation: (e: ProductType, f: LocationType) => void;
	selectedRow: number | null;
	setSelectedRow: any;
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

	const toggleLifted = (index: number) => {
		setSelectedRow(index === selectedRow ? null : index);
	};
	const rows = data.map((item, index) => {
		const selected = selection.includes(item);
		return (
			<>
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
					<Table.Td>
						<div className="flex items-center gap-3">
							<div
								onClick={() => toggleLifted(index)}
								className="border-2 p-1 border-black rounded-lg font-bold cursor-pointer"
							>
								<IoIosArrowDown />
							</div>
							<>{item.kodeBarang}</>
						</div>
					</Table.Td>
					<Table.Td>{item.namaBarang}</Table.Td>
					<Table.Td>{item.merk}</Table.Td>
					<Table.Td>{item.jenisBarang}</Table.Td>
					<Table.Td>{item.gudang}</Table.Td>
					<Table.Td>{item.totalStock}</Table.Td>
					<Table.Td>
						<Button
							variant="outline"
							className="!border !border-primary  !text-primary"
							onClick={() => addLocation(item)}
						>
							+ Lokasi
						</Button>
					</Table.Td>
				</Table.Tr>
				<Table.Tr
					key={item.kodeBarang + "subRow"}
					className={`transition-transform  ${
						selectedRow === index ? "" : "hidden"
					}`}
				>
					<Table.Td></Table.Td>
					<Table.Td colSpan={7} className="!p-0">
						{!item.location.length ? (
							<div className="p-5 bg-[#fafafa]">
								<p>Belum ada lokasi</p>
								<p className="text-gray-400">
									Silahkan pilih dan tambahkan lokasi dengan menekan “
									<span className="text-black">+ Lokasi</span>” terlebih dahulu untuk
									memindahkan barang
								</p>
							</div>
						) : (
							<Table w={600} verticalSpacing="sm" bgcolor="#fafafa" border={1}>
								<Table.Thead className="border-y">
									<Table.Tr>
										<Table.Th>Lokasi Awal</Table.Th>
										<Table.Th>QTY (PCS)</Table.Th>
										<Table.Th>Satuan</Table.Th>
										<Table.Th>Jumlah</Table.Th>
										<Table.Th>Tindakan</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>
									{item.location.map((subItem) => {
										return (
											<Table.Tr key={subItem.id + "subItem"}>
												<Table.Td>{subItem.nama_lokasi}</Table.Td>
												<Table.Td>
													<input
														className="p-1 border border-gray-300 w-[7rem] text-gray-300"
														defaultValue={0}
													/>
												</Table.Td>
												<Table.Td>
													<select className="p-1 border border-e-gray-300 text-gray-300">
														<option>Pilih Satuan</option>
													</select>
												</Table.Td>
												<Table.Td>{subItem.volume}</Table.Td>
												<Table.Td>
													<BiSolidTrash
														onClick={() => deleteLocation(item, subItem)}
														size={20}
														className="text-red-700 cursor-pointer"
													/>
												</Table.Td>
											</Table.Tr>
										);
									})}
								</Table.Tbody>
							</Table>
						)}
					</Table.Td>
				</Table.Tr>
			</>
		);
	});

	return (
		<ScrollArea>
			<Table miw={800} verticalSpacing="sm">
				<Table.Thead className="bg-[#fafafa]">
					<Table.Tr>
						<Table.Th style={{ width: rem(40) }}>
							<Checkbox
								onChange={toggleAll}
								checked={selection.length === data.length}
								indeterminate={selection.length > 0 && selection.length !== data.length}
							/>
						</Table.Th>
						<Table.Th>Kode Barang</Table.Th>
						<Table.Th>Nama Barang</Table.Th>
						<Table.Th>Merk</Table.Th>
						<Table.Th>Jenis Barang</Table.Th>
						<Table.Th>Gudang</Table.Th>
						<Table.Th>Total Stock (Pcs)</Table.Th>
						<Table.Th></Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</ScrollArea>
	);
};

export default TableGenerate;
