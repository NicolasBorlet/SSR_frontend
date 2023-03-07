import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Layout from "../../../../shared/ui/layout/Layout";
import { productAtom } from "../../atoms/ProductAtoms";
import { Product } from "../../types/product";

const ProductSoloScreen = () => {
  const [products, setProducts] = useRecoilState(productAtom);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [productShortDesc, setProductShortDesc] = useState("");
  const [productLongDesc, setProductLongDesc] = useState("");
  const [productCartDesc, setProductCartDesc] = useState("");
  const [productThumb, setProductThumb] = useState("");
  const [productStock, setProductStock] = useState(0);
  const [type, setType] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/product/${id}`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data); // Update the state with the fetched data
        setProduct(data[0]);
        setName(data[0].ProductName);
        setProductCartDesc(data[0].ProductCartDesc);
        setProductShortDesc(data[0].ProductShortDesc);
        setProductLongDesc(data[0].ProductLongDesc);
        setProductStock(data[0].ProductStock);
        setType(data[0].type);
        console.log(data);
      });

    // fetch(`http://localhost:3000/shoessize/${id}`)
    //   .then((res) => res.json())
    //   .then((data: Product[]) => {
    //     console.log(data);
    //   });
  }, [id, setProducts]);

  const handleUpdate = () => {
    fetch(`http://localhost:3000/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProductName: name,
        ProductCartDesc: productCartDesc,
        ProductShortDesc: productShortDesc,
        ProductLongDesc: productLongDesc,
        ProductStock: productStock,
        type: type,
      }),
    })
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setProduct(data[0]);
        // window.location.href = "/product";
      })
      .catch((err) => console.log(err));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="m-5">
        <div className="bg-blue-100 rounded-lg p-3">
          <h2>Update Product</h2>
          <div className="flex flex-col flex-center justify-start mt-3">
            <p>ID: {product.ProductID}</p>
            <div className="flex gap-2 bg-blue-200 rounded-lg p-3 m-5">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex gap-2 bg-blue-200 rounded-lg p-3 m-5">
              <label>ProductCartDesc:</label>
              <textarea
                value={productCartDesc}
                onChange={(e) => setProductCartDesc(e.target.value)}
              />
            </div>
            <div className="flex gap-2 bg-blue-200 rounded-lg p-3 m-5">
              <label>ProductShortDesc:</label>
              <textarea
                value={productShortDesc}
                onChange={(e) => setProductShortDesc(e.target.value)}
              />
            </div>
            <div className="flex gap-2 bg-blue-200 rounded-lg p-3 m-5">
              <label>ProductLongDesc:</label>
              <textarea
                value={productLongDesc}
                onChange={(e) => setProductLongDesc(e.target.value)}
              />
            </div>
            <div className="flex gap-2 bg-blue-200 rounded-lg p-3 m-5">
              <label>ProductStock:</label>
              <input
                type="number"
                value={productStock}
                onChange={(e) => setProductStock(Number(e.target.value))}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductSoloScreen;