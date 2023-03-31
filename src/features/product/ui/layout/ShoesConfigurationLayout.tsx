import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { discountAtom } from "../../../discount/atoms/discountAtom";
import { productAtom } from "../../atoms/ProductAtoms";
import { ProductShoes, ProductVinyl } from "../../types/product";

const ShoesConfigurationLayout = () => {
  const [products, setProducts] = useRecoilState(productAtom);
  const [shoesSizeData, setShoesSizeData] = useState([]);
  const [discountData, setDiscountData] = useRecoilState(discountAtom);
  const [visible, setVisible] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    //fetch shoes data
    fetch("http://localhost:3000/shoessize/")
      .then((res) => res.json())
      .then((data) => {
        // extract the relevant data from the response
        const shoesSizes = data.map((item: any) => ({
          ShoesSize: item.ShoesSize,
          ShoesSizeQuantity: item.ShoesSizeQuantity,
          ShoesSizePrice: item.ShoesSizePrice,
          DiscountID: item.DiscountID,
          ProductID: item.ProductID,
          ShoesSizeID: item.ShoesSizeID,
        }));
        // set the extracted data to state
        console.log("shoesSizesData", shoesSizes);
      });

    fetch(`http://localhost:3000/shoessize/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("shoesSizeData", data);
        setShoesSizeData(data);
      });

    fetch(`http://localhost:3000/discount/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("discountData", data);
        setDiscountData(data);
      });
  }, []);

  const addShoes = (shoes: ProductShoes) => {
    // fetch data from API
    fetch(`http://localhost:3000/shoessize/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(shoes),
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setProducts([...products, data]);
        setDiscountData([...discountData, data]);
        window.location.reload();
        console.log(data);
      });
  };

  const deleteShoesSize = (id: number) => {
    // fetch data from API
    fetch(`http://localhost:3000/shoessize/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setProducts([...products, data]);
        window.location.reload();
        console.log(data);
      });
  };

  //function for add discount to an existing shoes size
  const addDiscount = (discount: any) => {
    // fetch data from API
    fetch(`http://localhost:3000/shoessize/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(discount),
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setProducts([...products, data]);
        setDiscountData([...discountData, data]);
        // window.location.reload();
        console.log(data);
      });
  };

  return (
    <>
      <div>
        <h3>Shoes Configuration</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addShoes({
              ProductID: id,
              ShoesSize: e.currentTarget.ShoesSize.value,
              ShoesSizePrice: e.currentTarget.ShoesSizePrice.value,
              ShoesSizeQuantity: e.currentTarget.ShoesSizeQuantity.value,
              DiscountID: e.currentTarget.DiscountID.value,
            });
          }}
          className="flex flex-col p-3"
        >
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Taille de chaussure
            <input
              type="number"
              placeholder="Taille"
              name="ShoesSize"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </label>
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Prix de la taille de chaussure
            <input
              type="number"
              placeholder="Prix"
              name="ShoesSizePrice"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </label>
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Quantité de la taille de chaussure
            <input
              type="number"
              placeholder="Quantité"
              name="ShoesSizeQuantity"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            />
          </label>
          <label className="block w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Réduction de la taille de chaussure
            <select
              name="DiscountID"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            >
              {discountData.map((discount) => (
                <option value={discount.DiscountID}>
                  {discount.DiscountPercentage} %
                </option>
              ))}
            </select>
          </label>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
          >
            Ajouter la variation
          </button>
        </form>
      </div>
      <div>
        <h1>Toutes les variations de ce produit</h1>
        <div className="">
          <div className="rounded-md p-5"></div>
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 rounded-tl-lg text-center py-3 border-b-2 border-gray-200 bg-blue-300 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Taille
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quantité
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Réduction
                </th>
                <th className="px-5 rounded-tr-lg py-3 border-b-2 border-gray-200 bg-blue-300 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {shoesSizeData.map((item: any) => (
                <tr key={item.ShoesSizeID}>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                    <div className="flex items-center justify-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.ShoesSize}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                    <div className="flex items-center justify-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.ShoesSizePrice} €
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                    <div className="flex items-center justify-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.ShoesSizeQuantity}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                    <div className="flex items-center justify-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.DiscountID === null ||
                          item.DiscountID === undefined ? (
                            <div>
                              <button
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                onClick={() => {
                                  setVisible(!visible);
                                }}
                              >
                                {visible
                                  ? "Annuler l'ajout d'une réduction"
                                  : "Ajouter une réduction"}
                              </button>
                              {visible ? (
                                <div>
                                  <select
                                    name="DiscountID"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                  >
                                    {discountData.map((discount) => (
                                      <option value={discount.DiscountID}>
                                        {discount.DiscountPercentage} %
                                      </option>
                                    ))}
                                  </select>
                                  <button
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    onClick={() => {
                                      addDiscount({
                                        DiscountID: item.DiscountID,
                                        ShoesSizeID: item.ShoesSizeID,
                                      });
                                      setVisible(!visible);
                                    }}
                                  >
                                    Ajouter la réduction
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <>
                              {discountData.map((discount) => (
                                <div>
                                  {discount.DiscountID === item.DiscountID ? (
                                    <div>{discount.DiscountPercentage} %</div>
                                  ) : (
                                    <div></div>
                                  )}
                                </div>
                              ))}
                              <div>
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                  Modifier la réduction
                                </button>
                              </div>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                    <div className="flex items-center justify-center">
                      <div className="ml-3">
                        <button
                          onClick={() => {
                            deleteShoesSize(item.ShoesSizeID);
                          }}
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                          type="submit"
                          value="Delete"
                          name="Delete"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ShoesConfigurationLayout;
