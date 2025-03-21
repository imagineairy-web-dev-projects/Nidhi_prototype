# Prototype Development Guide: Nidhi Management Software

This document details everything needed to create a clear, informative, and interactive prototype of the Nidhi Management Software.

---

## 🚀 Tech Stack

- **HTML5 & CSS3** (core frontend structure)
- **Tailwind CSS** (for quick responsive design and modern UI)
- **Simple JavaScript** (for basic interactivity like navigation, modals, tabs, and simple dynamic elements)

---

## 📂 Project Structure

```
prototype/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── images/
    └── icons/
```

---

## 🖥️ Pages and Detailed Features

### 1. **Login Screen (Admin & Member)**
- Clean interface with input fields: Username & Password.
- Login button with hover effects.
- Simple JS validation for empty fields.
- "Forgot password" link (non-functional, visual).

### 2. **Admin Dashboard Overview**
- Top navigation bar (Dashboard, Members, Accounts, Reports).
- Sidebar navigation (vertical) with links/icons.
- Create cards/widgets for financial overview clearly showing:
  - Total Members
  - Total Deposits
  - Total Loans
  - Recent Activities
- Use visually appealing cards with Tailwind CSS shadows and hover effects.

### 3. **Savings Account Management**
- Table/List displaying:
  - Account Holder Name
  - Account Number
  - Balance
  - Interest Rate
- Action buttons/icons (View/Edit/Delete) – visual only.
- Search/filter bar at the top (visual only).

New Transaction Features:
- Transaction Entry Form:
  - Deposit/Withdrawal selection
  - Amount input with validation
  - Transaction date picker
  - Remarks/notes field
  - Auto-generated receipt number display
  - Submit and Reset buttons

- Interest Calculator Section:
  - Current balance display
  - Interest rate input/display
  - Interest calculation period selector
  - Projected interest amount display
  - Total amount after interest preview
  - Simple interest calculation formula display
  - Monthly interest breakdown

- Receipt Preview:
  - Clean, professional receipt layout
  - Transaction details summary
  - QR code placeholder
  - Print button (visual only)

### 4. **Member Account Details Page**
- Clear display of member personal details (name, ID, contact).
- Tab interface:
  - Tab 1: Accounts
  - Tab 2: Loans
  - Tab 3: Shares
- Table/List showing dummy data for accounts, loans, shares.
- Simple tab navigation functionality using JS.

### 5. **Term Deposits Management**
- Table/List displaying:
  - Account Holder Name
  - Scheme Type (TD/RD/MIS)
  - Deposit Amount
  - Interest Rate
  - Maturity Date
- Clean, responsive table design with proper padding and alignment

New Scheme Management Features:
- Scheme Selection Interface:
  - Scheme type tabs (TD/RD/MIS)
  - Deposit amount input
  - Term selection dropdown:
    - For TD: 3/6/12/24/36 months
    - For RD: 12/24/36/48/60 months
    - For MIS: 12/24/36 months
  - Interest rate display based on term
  - Minimum/maximum amount guidelines

- Maturity Calculator:
  - Principal amount input
  - Term selection
  - Interest rate display
  - Maturity amount preview
  - Interest earned preview
  - Monthly interest breakdown for MIS
  - Quarterly compound interest display for TD
  - Monthly installment calculator for RD

- Interest Breakdown Section:
  - Tabular view of interest accrual
  - Month-wise breakdown
  - Total interest earned
  - Graphical representation of growth
  - Comparison between schemes

### 6. **Reporting Page**
- Basic interactive layout with placeholder charts (use Chart.js or Google Charts CDN).
- Include example charts such as:
  - Deposits Overview
  - Loan Status Overview
  - Monthly Collections

---

## 🎨 Design Guidelines
- Consistent and professional color scheme.
- Use rounded corners (Tailwind CSS classes like `rounded-lg`).
- Shadows for visual depth (`shadow-lg`).
- Clearly labeled navigation items.
- Responsiveness for Mobile, Tablet, and Desktop devices.

---

## 📜 Basic JavaScript Interaction Guide

- **Navigation:** Clicking on navigation items loads different HTML pages or shows/hides sections.
- **Tabs:** Implement tabs with a click event to show corresponding content while hiding others.
- **Modals:** Simple modals to display additional details on buttons
- **Calculations:** 
  - Simple interest calculations for savings accounts
  - Compound interest calculations for term deposits
  - Monthly installment calculations for RD
  - Maturity amount calculations for all schemes
- **Form Validations:**
  - Amount range validations
  - Date validations
  - Required field checks
  - Scheme-specific rule validations

---

## 🚦 Deployment Instructions (Optional)

- Use GitHub Pages, Netlify, or Vercel for hosting the prototype for client review.

---

This document is structured and detailed enough for an agentic LLM to effectively develop a high-quality, interactive prototype for your Nidhi Management Software.