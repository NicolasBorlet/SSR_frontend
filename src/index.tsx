import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import BrandScreen from "./features/brand/ui/screen/BrandScreen";
import BrandSoloScreen from "./features/brand/ui/screen/BrandSoloScreen";
import CategorieScreen from "./features/categorie/ui/screens/CategorieScreen";
import DiscountScreen from "./features/discount/ui/screens/DiscountScreen";
import ProductConfigurationScreen from "./features/product/ui/screen/ProductConfigurationScreen";
import ProductScreen from "./features/product/ui/screen/ProductScreen";
import ProductSoloScreen from "./features/product/ui/screen/ProductSoloScreen";
import reportWebVitals from "./reportWebVitals";
import ErrorScreen from "./shared/ui/screen/ErrorScreen";
import LoginScreen from "./shared/ui/screen/LoginScreen";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/brand",
    element: <BrandScreen />,
  },
  {
    path: "/brand/:id",
    element: <BrandSoloScreen />,
  },
  {
    path: "/product",
    element: <ProductScreen />,
  },
  {
    path: "/product/:id",
    element: <ProductSoloScreen />,
  },
  {
    path: "/product/:id/configuration",
    element: <ProductConfigurationScreen />,
  },
  {
    path: "/categories",
    element: <CategorieScreen />,
  },
  {
    path: "/discount",
    element: <DiscountScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "*",
    element: <ErrorScreen />,
  },
]);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals(console.log);
