export interface Product {
    ProductID: any;
    ProductName: string;
    ProductCartDesc: string;
    ProductShortDesc: string;
    ProductLongDesc: string;
    ProductThumb: string;
    // ProductUpdateTime?: string;
    BrandID?: string | undefined;
    ProductStock: number;
    type: string;
}

export interface ProductVinyl {
    ProductID: any;
    VinylArtist?: string | null;
    VinylLabel?: string | null;
    VinylDuration?: number | null;
    VinylAlbum?: string | null;
    VinylPrice?: number | null;
}

export interface ProductShoes {
    ProductID: any;
    ShoesSize?: number | null;
    ShoesSizePrice?: number | null;
    ShoesSizeQuantity?: number | null;
}