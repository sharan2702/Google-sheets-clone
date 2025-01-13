# Google Sheets Clone

### **Overview**
This project is a web application that mimics the core functionalities and UI of **Google Sheets**, offering mathematical and data quality functions, data entry, basic formatting, and chart generation.

---

### **Features**

#### 1. **Spreadsheet Interface**
- Google Sheets-like UI with a toolbar, formula bar, and grid layout.
- **Cell Dependencies**: Automatically update formulas when related cells change.
- **Basic Formatting**: Supports bold, italics, font size.
- **Row/Column Management**: Add rows/columns.

#### 2. **Mathematical Functions**
- `=SUM(A1:A3)` - Adds values in A1 to A3.
- `=AVERAGE(B1:B5)` - Averages values in B1 to B5.
- `=MAX(C1:C10)` - Returns the max value from C1 to C10.
- `=MIN(D1:D5)` - Returns the min value from D1 to D5.
- `=COUNT(E1:E10)` - Counts numeric values in E1 to E10.

#### 3. **Data Quality Functions**
- **TRIM**: Removes extra spaces (e.g., `"  Hello  "` → `"Hello"`).
- **UPPER**: Converts text to uppercase (e.g., `hello` → `HELLO`).
- **LOWER**: Converts text to lowercase (e.g., `WORLD` → `world`).
- **REMOVE_DUPLICATES**: Removes duplicate rows from a range.
- **FIND_AND_REPLACE**: Finds and replaces text (e.g., `Apple` → `Orange`).

#### 4. **Chart Generation**
- Generate **Bar**, **Pie**, **Line**, and **Doughnut** charts.  
  Example: Input data in `A1:B5`, select a chart type, and click **Generate Chart**.

#### 5. **Save and Load**
- Save spreadsheets to a file.
- Load previously saved spreadsheets for editing.

---

### **Usage Instructions**

#### **Formulas**
1. Select a cell for the formula result.
2. Enter a formula in the formula bar (e.g., `=SUM(A1:A3)`).
3. Press **Enter** to see the result.

#### **Data Quality Functions**
1. Select a range (e.g., `A1:A5`).
2. Click the desired function (e.g., **TRIM**, **UPPER**).
3. The selected cells will update accordingly.

#### **Charts**
1. Enter data in a range (e.g., `A1:B5`).
2. Choose a chart type and click **Generate Chart**.

#### **Save and Load**
- **Save**: Download the current spreadsheet.
- **Load**: Upload a previously saved spreadsheet.

---

### **Tech Stack**

- **Frontend**: React.js, Tailwind CSS
- **Libraries**: Redux Toolkit, Chart.js, react-chartjs-2, FileSaver.js
- **Backend**: None (fully client-side)

---

### **Examples**

- **Formulas**: 
  - `=SUM(A1:A3)` → Adds values in A1 to A3.
  - `=AVERAGE(B1:B5)` → Averages values in B1 to B5.
- **Data Quality**: 
  - **TRIM**: `"  Hello  "` → `"Hello"`.
  - **UPPER**: `"hello"` → `"HELLO"`.
- **Charts**: 
  - Bar chart for sales data (`A1:B5`): 
    - A1: `Month`, B1: `Sales`
    - A2: `Jan`, B2: `100`

---

### **How to Run the Project**

# How to Run the Project

## Clone the Repository
Open a terminal and run the following commands to clone the repository and navigate into the project folder:

```bash
git clone <repo-url>
cd google-sheets-clone
```
## Install Dependencies
Install all required dependencies by running:
```bash
npm install
```
## Start the Development Server
Run the following command to start the development server:
```bash
npm start
```

### Sample
<img width="1343" alt="Screenshot 2025-01-14 at 1 28 32 AM" src="https://github.com/user-attachments/assets/dc8c5046-8f35-4bed-a15d-b4c14b4ada95" />
