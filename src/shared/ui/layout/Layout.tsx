import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Sidebar />
      <Header />
      <main className="main">{children}</main>
      <Footer />
      {/* <View /> */}
    </div>
  );
};

export default Layout;
