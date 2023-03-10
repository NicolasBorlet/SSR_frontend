import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { brandAtom } from "../../atoms/BrandAtoms";

const BrandListingLayout = () => {
  const [brands, setBrands] = useRecoilState(brandAtom);

  useEffect(() => {
    // fetch data from API
    fetch("http://localhost:3000/brand/")
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setBrands(data);
        console.log(data);
      });
  }, []);

  //function to delete brand
  const deleteBrand = (id: number) => {
    // fetch data from API
    fetch(`http://localhost:3000/brand/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // set data to state
        setBrands(brands.filter((brand) => brand.BrandID !== id));
        window.location.reload();
        console.log(data);
      });
  };

  if (!brands) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-5 w-[80%]">
      <h1>Toutes les marques</h1>
      <div>
        <table className="w-full leading-normal border">
          <thead>
            <tr>
              <th className="bg-blue-700  rounded-tl-lg px-5 py-3 border-b-2 border-gray-200  text-center text-xs font-semibold text-white uppercase tracking-wider">
                Nom
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700  text-center text-xs font-semibold text-white uppercase tracking-wider">
                Description
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-700  text-center text-xs font-semibold text-white uppercase tracking-wider">
                Supprimer
              </th>
              <th className="px-5 py-3 rounded-tr-lg border-b-2 border-gray-200 bg-blue-700  text-center text-xs font-semibold text-white uppercase tracking-wider">
                Modifier
              </th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.BrandID}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center justify-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {brand.BrandName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center justify-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {brand.BrandDesc}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center justify-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => deleteBrand(brand.BrandID)}
                        >
                          Supprimer
                        </button>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center justify-center">
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            window.location.href = `/brand/${brand.BrandID}`;
                          }}
                        >
                          Modifier
                        </button>
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrandListingLayout;
