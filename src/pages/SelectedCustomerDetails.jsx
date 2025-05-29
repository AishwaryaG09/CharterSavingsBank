import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StyledTable } from "../components/TableData";
import "../styles/SelectedCustomerDetails.css";
import { calculateRewards } from "../utils/rewardUtils";
import { months, years } from "../../public/data/constants";

function SelectedCustomerDetails() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 2;
  const location = useLocation();
  const { state } = location;
  const transactionHistory = state?.transactions;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const defaultMonths = [
    (currentMonth + 10) % 12,
    (currentMonth + 11) % 12,
    currentMonth,
  ];

  const [selectedMonths, setSelectedMonths] = useState(defaultMonths);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonthForDetails, setSelectedMonthForDetails] = useState(null);
  useEffect(() => {
    setPage(1);
  }, [selectedMonths, selectedYear, selectedMonthForDetails]);
  const filteredTransactions = transactionHistory.filter((txn) => {
    const date = new Date(txn.date);
    return (
      date.getFullYear() === selectedYear &&
      selectedMonths.includes(date.getMonth())
    );
  });

  const monthlyPoints = {};
  let totalPoints = 0;

  filteredTransactions.forEach((txn) => {
    const date = new Date(txn.date);
    const month = date.getMonth();
    const points = calculateRewards(txn.amount);
    monthlyPoints[month] = (monthlyPoints[month] || 0) + points;
    totalPoints += points;
  });

  const detailedTransactions =
    selectedMonthForDetails !== null
      ? filteredTransactions.filter(
          (txn) => new Date(txn.date).getMonth() === selectedMonthForDetails
        )
      : [];

  const start = (page - 1) * rowsPerPage;
  const paginatedData = detailedTransactions.slice(start, start + rowsPerPage);
  const totalPages = Math.ceil(detailedTransactions.length / rowsPerPage);

  return (
    <div style={{ padding: "16px", fontFamily: "Arial" }}>
      <h3>Customer Rewards Dashboard</h3>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px",
            borderRadius: "8px",
            maxWidth: "300px",
            backgroundColor: "#f9f9f9",
            fontFamily: "Arial",
          }}
        >
          <h5 className="detailsHead">Customer Details:</h5>
          <p className="details">
            <strong>ID:</strong> {state?.customerId}
          </p>
          <p className="details">
            <strong>Name:</strong> {state?.customerName}
          </p>
        </div>
        <select
          multiple
          className="styled-multiselect"
          value={selectedMonths}
          onChange={(e) => {
            const options = Array.from(e.target.selectedOptions, (opt) =>
              parseInt(opt.value)
            );
            setSelectedMonths(options);
            setSelectedMonthForDetails(null);
          }}
        >
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <h4>Total Points: {totalPoints} — Monthly Reward Summary Below</h4>
      {Object.keys(monthlyPoints).length === 0 ? (
        <p>No transactionHistory</p>
      ) : (
        <ul>
          {Object.entries(monthlyPoints).map(([month, points]) => (
            <li key={month}>
              <button
                style={{ border: "solid 1px grey", marginBottom: "2px" }}
                onClick={() => setSelectedMonthForDetails(Number(month))}
              >
                {months[month]}: {points} points
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedMonthForDetails !== null && (
        <>
          <h3>Transactions for {months[selectedMonthForDetails]}</h3>
          {detailedTransactions.length === 0 ? (
            <p>No transactionHistory</p>
          ) : (
            <>
              <StyledTable>
                <thead>
                  <tr>
                    <th>Transaction Id</th>
                    <th>Transaction Amount</th>
                    <th>Transaction Date</th>
                    <th>Points Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData?.map((item) => {
                    return (
                      <tr key={item.transactionId}>
                        <td>{item?.transactionId}</td>

                        <td>{item?.date}</td>
                        <td>${item?.amount}</td>
                        <td>{calculateRewards(item.amount)} points</td>
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
          )}
        </>
      )}
    </div>
  );
}

export default SelectedCustomerDetails;
