import { useState, useEffect } from "react";
import customFetch from "../api.js";
import { ClipLoader } from "react-spinners";
import { StyledTable } from "../components/TableData.js";
import { useNavigate } from "react-router-dom";

function CustomerData() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await customFetch("../public/data/mock-data.json");
        setTodos(data?.customerDataset);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = (itemData) => {
    navigate("/SelectedCustomerDetails", { state: itemData });
  };
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const start = (page - 1) * rowsPerPage;
  const paginatedData = todos.slice(start, start + rowsPerPage);
  const totalPages = Math.ceil(todos.length / rowsPerPage);
  return (
    <>
      {error ? (
        <p>Server down! Please try again in some time</p>
      ) : (
        <div style={{ textAlign: "center", margin: "16px" }}>
          {todos?.length > 0 && !loading ? (
            <>
              <h3>Customer's Dashboard</h3>
              <StyledTable>
                <thead>
                  <tr>
                    <th>Customer Id</th>
                    <th>Customer Name</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData?.map((item) => {
                    return (
                      <tr
                        key={item.customerId}
                        onClick={() => handleClick(item)}
                      >
                        <td>{item?.customerId}</td>
                        <td>{item?.customerName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </StyledTable>
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <span style={{ margin: "0 10px" }}>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <ClipLoader color="#36d7b7" loading={loading} size={50} />
          )}
        </div>
      )}
    </>
  );
}

export default CustomerData;
