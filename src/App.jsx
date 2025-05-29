import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import CustomerData from "./pages/CustomerData.jsx";
import SelectedCustomerDetails from "./pages/SelectedCustomerDetails.jsx";
import HeaderTab from "./components/HeaderTab.jsx";

function App() {
  return (
    <>
      <div className="page-container">
        <HeaderTab />
        <div style={{ flex: "1", backgroundColor: "#f6f6f6" }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<CustomerData />} />
              <Route
                path="/SelectedCustomerDetails"
                element={<SelectedCustomerDetails />}
              />
            </Routes>
          </BrowserRouter>
        </div>
        <footer className="footer">&copy; Standard Chartered Bank 2022</footer>
      </div>
    </>
  );
}

export default App;
