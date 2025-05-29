# 🧾 Customer Rewards Dashboard

A React + Vite-based web application that displays customer data and calculates reward points based on transaction history. The app features a paginated customer list and a detailed view of individual customer transactions and rewards.

## 📁 Project Structure

src/
├── components/
│ ├── CustomerData.jsx
│ ├── SelectedCustomerDetails.jsx
│ └── TableData.js
├── styles/
│ └── SelectedCustomerDetails.css
├── utils/
│ └── rewardUtils.js
├── api.js
├── App.jsx
├── main.jsx 
public/
├── data/
│ ├── mock-data.json
│ └── constants.js

---

## 🚀 Features

### 📋 CustomerData Component

- Fetches customer data from a local JSON file.
- Displays a paginated table of customers.
- Navigates to detailed view on row click.
- Handles loading and error states gracefully.

### 📊 SelectedCustomerDetails Component

- Displays selected customer’s transaction history.
- Filters transactions by month and year.
- Calculates and displays reward points per month.
- Paginated transaction details for selected months.

---

## 🧮 Reward Calculation Logic

The reward points are calculated using the following logic (defined in `rewardUtils.js`):

- **2 points** for every dollar spent over \$100.
- **1 point** for every dollar spent over \$50 up to \$100.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
git clone https://github.com/AishwaryaG09/CharterSavingsBank.git
cd CharterSavingsBank
npm install
npm run dev
##The app will be available at http://localhost:5173.
```

### ▶️ Run Tests

```bash
npm run test
```
