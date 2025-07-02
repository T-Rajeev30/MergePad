import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="flex min-h-screen">
      {showSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col w-full">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 bg-base-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
