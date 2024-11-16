import { LocationType } from "./location";

export type ProductType = {
	kodeBarang: string;
	namaBarang: string;
	merk: string;
	jenisBarang: string;
	gudang: string;
	totalStock: number;
	location: LocationType[] | [];
};
