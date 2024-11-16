import HeaderLayout from "@/components/layouts/header";
import { Button, Divider, Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import productDummy from "@/data/product.json";
import locationDummy from "@/data/location.json";
import TableProducts from "./main-components/table-products";
import { ProductType } from "@/lib/types/product";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import TableGenerate from "./main-components/table-generate";
import TableLocation from "./main-components/table-location";
import { LocationType } from "@/lib/types/location";

const MainPage = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const dataTable = productDummy as ProductType[];
	const [selection, setSelection] = useState<ProductType[]>([]);
	const [selectionGenerate, setSelectionGenerate] = useState<ProductType[]>([]);
	const [modalLocation, setModalLocation] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState<LocationType[]>([]);
	const [itemSelected, setItemSelected] = useState<ProductType | null>(null);
	const [selectedRow, setSelectedRow] = useState<number | null>(null);

	const handleAddProcut = () => {
		localStorage.setItem("selectionProducts", JSON.stringify(selection));
		close();
	};

	const handleAddLocation = () => {
		const updateProduct = selection.map((itemProduct) => {
			if (itemProduct.kodeBarang === itemSelected?.kodeBarang) {
				return {
					...itemProduct,
					location: selectedLocation,
				};
			}
			return itemProduct;
		});
		localStorage.setItem("selectionProducts", JSON.stringify(updateProduct));
		setSelection(updateProduct);
		setModalLocation(false);
	};

	const handleDeleteLocation = (
		productSelected: ProductType,
		deleteItem: LocationType
	) => {
		const updateProduct = selection.map((itemProduct) => {
			if (itemProduct.kodeBarang === productSelected?.kodeBarang) {
				const location = itemProduct.location.filter((i) => i.id !== deleteItem.id);
				console.log(location);
				return {
					...itemProduct,
					location: location,
				};
			}
			return itemProduct;
		});
		setSelection(updateProduct);
		localStorage.setItem("selectionProducts", JSON.stringify(updateProduct));
	};

	const handleModalLocation = (item: ProductType) => {
		setSelectedLocation(item.location);

		setModalLocation(true);
		setItemSelected(item);
	};

	useEffect(() => {
		const stroredSelectionItem = localStorage.getItem("selectionProducts");
		if (stroredSelectionItem) setSelection(JSON.parse(stroredSelectionItem));
	}, []);

	return (
		<div className="min-h-screen">
			<HeaderLayout />
			<div className="bg-white px-5 py-7 space-y-3">
				<p>Stock Movement / Pemindahan Barang</p>
				<h2 className="font-medium text-[1.2rem]">Pemindahan Barang</h2>
			</div>
			<div className="mx-5 mt-5 mb-5 bg-white">
				<div className="p-5 border-b font-medium">Buat Task Baru</div>
				<div className="px-5 pt-5 border-b">
					<div className=" flex items-center gap-7 pb-16">
						<div>
							<label className="font-medium text-sm">Task No</label>
							<div className="bg-gray-200 p-[0.3rem] border w-[15rem] rounded-sm pl-3">
								SM-PB-001/24/2024
							</div>
						</div>
						<div>
							<Select
								label="Ditugaskan ke"
								placeholder="Pilih Karyawan"
								data={["Ari", "Dika", "Beno", "Rizki"]}
							/>
						</div>
					</div>
					{selection.length !== 0 && (
						<div className="w-full flex justify-end">
							<Button onClick={open} className="!bg-primary !px-10">
								Tambah barang
							</Button>
						</div>
					)}
				</div>
				<div className="p-5">
					{selection.length ? (
						<TableGenerate
							data={selection}
							selection={selectionGenerate}
							setSelection={setSelectionGenerate}
							addLocation={(e) => {
								handleModalLocation(e);
							}}
							deleteLocation={(e, f) => {
								handleDeleteLocation(e, f);
							}}
							selectedRow={selectedRow}
							setSelectedRow={setSelectedRow}
						/>
					) : (
						<div className=" w-full bg-[#fafafa] flex flex-col p-5 justify-center items-center gap-2">
							<p>Belum ada barang</p>
							<p className="text-gray-400">
								Silahkan tambah barang terlebih dahulu untuk mulai memindahkan
							</p>
							<Button onClick={open} className="!bg-primary !px-10">
								Tambah barang
							</Button>
						</div>
					)}
				</div>
				<div className="p-5 flex justify-end gap-5">
					<Button
						variant="outline"
						className="!text-black !font-normal !border-gray-300"
					>
						Batal
					</Button>
					<Button
						className={cn("!font-normal", selection.length ? "!bg-primary" : "")}
						disabled={!selection.length}
					>
						Generate Task
					</Button>
				</div>
			</div>
			<Modal
				size={"100%"}
				opened={opened}
				onClose={close}
				title="Tambah Barang"
				fullScreen
				h={100}
			>
				<Divider my="xs" />
				<TableProducts
					data={dataTable}
					selection={selection}
					setSelection={setSelection}
				/>
				<div className="-mb-5 p-5 flex justify-end gap-5 sticky bottom-0 bg-white">
					<Button
						onClick={close}
						variant="outline"
						className="!text-black !font-normal !border-gray-300"
					>
						Batal
					</Button>
					<Button
						onClick={handleAddProcut}
						className={cn("!font-normal", selection.length ? "!bg-primary" : "")}
						disabled={!selection.length}
					>
						Tambah ke daftar pemindahan
					</Button>
				</div>
			</Modal>

			<Modal
				size={"70%"}
				opened={modalLocation}
				onClose={() => setModalLocation(false)}
				title="Pilih Lokasi"
				centered
			>
				<Divider my="xs" />
				<TableLocation
					data={locationDummy}
					selection={selectedLocation}
					setSelection={setSelectedLocation}
				/>
				<div className="-mb-5 p-5 flex justify-end gap-5 sticky bottom-0 bg-white">
					<Button
						onClick={() => setModalLocation(false)}
						variant="outline"
						className="!text-black !font-normal !border-gray-300"
					>
						Batal
					</Button>
					<Button
						onClick={handleAddLocation}
						className={cn("!font-normal", selection.length ? "!bg-primary" : "")}
						disabled={!selection.length}
					>
						Tambahkan
					</Button>
				</div>
			</Modal>
		</div>
	);
};

export default MainPage;
