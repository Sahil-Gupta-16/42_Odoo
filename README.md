# StockMaster - Inventory Management System

A powerful, full-stack Inventory Management System with real-time dashboard, OTP authentication, multi-warehouse support, and offline capabilities.

## Table of Contents

1. About
2. Features
3. Tech Stack
4. Getting Started
5. Project Structure
6. Usage
7. Contributing
8. License

## About

StockMaster digitizes and streamlines all stock-related operations within a business, replacing manual registers, Excel sheets, and scattered tracking methods with a centralized, real-time, easy-to-use application.[1]

### Target Users

**Inventory Managers** manage incoming and outgoing stock operations. **Warehouse Staff** perform transfers, picking, shelving, and cycle counting.[1]

### Problem Statement

Traditional inventory management relies on manual processes prone to errors, stock mismatches, and operational delays. StockMaster provides a comprehensive digital solution with real-time tracking, automated stock calculations, and complete audit trails.[1]

## Features

### Authentication System

The system features a complete authentication flow with user signup, secure login, OTP-based password reset, and session management with automatic redirects.[1]

### Dynamic Dashboard

The dashboard provides real-time visibility into inventory operations with the following Key Performance Indicators:

\begin{itemize}
\item Total Products in Stock
\item Low Stock and Out of Stock Alerts
\item Pending Receipts and Deliveries
\item Internal Transfers Scheduled
\end{itemize}

The dashboard is fully adjustable with drag-and-drop widgets. Users can apply dynamic filters by document type (Receipts, Delivery, Internal, Adjustments), by status (Draft, Waiting, Ready, Done, Canceled), by warehouse or location, and by product category.[1]

### Product Management

Create and update products with SKU, category, and unit of measure. The system tracks stock availability per location, supports product categories and reordering rules, and provides smart SKU search and filters.[1]

### Receipts (Incoming Stock)

Create receipts from vendors with supplier and product details. Input received quantities and the system automatically increases stock on validation.[1]

### Delivery Orders (Outgoing Stock)

Process customer shipments with pick and pack workflows. Track deliveries and automatically decrease stock on validation.[1]

### Internal Transfers

Move stock between warehouses and locations with complete traceability in the stock ledger. Support for multi-location operations ensures accurate tracking.[1]

### Stock Adjustments

Reconcile physical counts with recorded stock. The system automatically calculates discrepancies and maintains full audit logging.[1]

### Additional Features

\begin{itemize}
\item Multi-warehouse support
\item Low stock alerts
\item Move history with complete audit trail
\item Offline support - work without internet with auto-sync on reconnect
\item Settings and profile management
\end{itemize}

## Tech Stack

The StockMaster project is built with modern technologies:

\begin{table}
\begin{tabular}{|l|l|}
\hline
Category & Technologies \\
\hline
Frontend & Next.js 14 (App Router), React 18, TypeScript \\
\hline
UI Framework & Shadcn UI, Tailwind CSS \\
\hline
Animations & Framer Motion \\
\hline
Database & PostgreSQL with Prisma ORM \\
\hline
State Management & Zustand \\
\hline
Authentication & NextAuth.js \\
\hline
Forms & React Hook Form with Zod validation \\
\hline
Deployment & Vercel \\
\hline
\end{tabular}
\caption{Technology Stack}
\end{table}

## Getting Started

### Prerequisites

Before starting, ensure you have the following installed:

\begin{itemize}
\item Node.js 18 or higher
\item npm or yarn package manager
\item PostgreSQL database
\item Git version control
\end{itemize}

### Installation

**Step 1: Clone the repository**

Open your terminal and run:

git clone https://github.com/Sahil-Gupta-16/42_Odoo.git
cd 42_Odoo

**Step 2: Install dependencies**

npm install
# or
yarn install

**Step 3: Set up environment variables**

Create a `.env` file in the root directory with the following variables:

DATABASE_URL="postgresql://user:password@localhost:5432/stockmaster"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
OTP_SERVICE_API_KEY="your-otp-service-key"

**Step 4: Set up the database**

Initialize Prisma and create the database schema:

npx prisma generate
npx prisma db push
npx prisma db seed

**Step 5: Run the development server**

npm run dev
# or
yarn dev

**Step 6: Access the application**

Open your web browser and navigate to `http://localhost:3000`

## Project Structure

The project follows a clear, modular structure:

inventory-system/
├── prisma/
│   └── schema.prisma                  # Database schema definition
├── src/
│   ├── app/
│   │   ├── (auth)/                    # Authentication routes
│   │   │   ├── login/page.tsx         # Login page
│   │   │   ├── signup/page.tsx        # Signup page
│   │   │   └── reset/page.tsx         # OTP password reset
│   │   ├── (dashboard)/               # Dashboard routes
│   │   │   ├── page.tsx               # Main dashboard with KPIs
│   │   │   ├── products/page.tsx      # Product management
│   │   │   ├── categories/            # Category management
│   │   │   ├── stock-moves/           # Stock transfers
│   │   │   ├── warehouses/            # Warehouse management
│   │   │   ├── operations/
│   │   │   │   ├── receipts/          # Incoming stock
│   │   │   │   └── deliveries/        # Outgoing stock
│   │   │   ├── history/page.tsx       # Activity logs
│   │   │   ├── settings/page.tsx      # App settings
│   │   │   └── profile/page.tsx       # User profile
│   │   └── page.tsx                   # Landing page
│   ├── components/
│   │   ├── ui/                        # Shadcn UI components
│   │   ├── layout/                    # Layout components
│   │   ├── animations/                # Animation components
│   │   └── background/                # Dynamic backgrounds
│   ├── data/dummy.json                # Sample data
│   ├── store/useUIStore.ts            # Zustand global state
│   ├── hooks/useMotion.ts             # Framer Motion hooks
│   └── styles/                        # Global styles
├── public/                            # Static assets
├── tailwind.config.js                 # Tailwind configuration
├── components.json                    # Shadcn UI configuration
└── package.json                       # Project dependencies

## Usage

### Complete Inventory Flow

Here is an example of a complete inventory operation:

**Step 1: Receive Goods from Vendor**

You receive 100 kg of steel from your supplier. Create a receipt and enter the quantity. Upon validation, the stock automatically increases by 100 kg.[1]

**Step 2: Internal Transfer**

Move the 100 kg of steel from the Main Store to the Production Rack. The total stock remains unchanged (100 kg), but the location is updated in the system.[1]

**Step 3: Deliver Finished Goods**

Production uses 20 kg of steel to manufacture steel frames. Create a delivery order and validate. The stock automatically decreases by 20 kg.[1]

**Step 4: Stock Adjustment**

During inspection, 3 kg of material is found to be damaged. Create a stock adjustment, enter the actual quantity (97 kg), and the system logs a -3 kg adjustment.[1]

Everything is logged in the **Stock Ledger** with complete traceability showing timestamps, quantities, and user actions.[1]

### Key Workflows

#### Creating a Receipt

\begin{enumerate}
\item Navigate to Operations menu and select Receipts
\item Click the "New Receipt" button
\item Select the supplier from the dropdown
\item Add products and enter quantities received
\item Click Validate - stock automatically increases
\end{enumerate}

#### Processing a Delivery Order

\begin{enumerate}
\item Navigate to Operations and select Deliveries
\item Create a new delivery order
\item Pick items from the warehouse location
\item Pack items for shipment
\item Click Validate - stock automatically decreases
\end{enumerate}

#### Adjusting Inventory

\begin{enumerate}
\item Navigate to Operations and select Stock Adjustment
\item Select the product and warehouse location
\item Enter the actual counted quantity
\item The system calculates the difference automatically
\item Click Save - adjustment is logged for audit purposes
\end{enumerate}

## Database Schema

The Prisma schema defines the core data structure:

\begin{itemize}
\item **User** - Authentication and user information
\item **Product** - Product catalog with SKU and categories
\item **Warehouse** - Warehouse and location management
\item **StockMove** - All stock transactions and transfers
\item **Receipt** - Incoming stock documentation
\item **Delivery** - Outgoing stock documentation
\item **Category** - Product categorization
\end{itemize}

All relationships are properly defined to maintain data integrity and enable complex queries for reporting and analytics.[1]

## Features Highlights

### Adjustable Dashboard Elements

The dashboard uses a drag-and-drop interface allowing users to customize their workspace. Rearrange widgets, resize components, and focus on the metrics that matter most to your operation.

### Offline Support

Warehouse staff can continue working without internet connectivity. All changes are cached locally and automatically synchronized when the connection is restored. This ensures uninterrupted warehouse operations.[1]

### Low Stock Alerts

The system automatically monitors stock levels and alerts inventory managers when items fall below reorder points. This prevents stockouts and ensures timely procurement.

### Multi-Warehouse Support

Manage inventory across multiple physical locations with location-specific tracking. Track which products are in which warehouses and optimize stock distribution across your supply chain.[1]

### Complete Audit Trail

Every stock movement is logged with timestamps, user information, and transaction details. This creates a complete audit trail for compliance and troubleshooting purposes.[1]

## Contributing

We welcome contributions to StockMaster! To contribute:

\begin{enumerate}
\item Fork the repository on GitHub
\item Create a feature branch: `git checkout -b feature/YourFeature`
\item Commit your changes: `git commit -m 'Add some feature'`
\item Push to the branch: `git push origin feature/YourFeature`
\item Open a Pull Request with a clear description of your changes
\end{enumerate}

Please ensure your code follows the project's style guidelines and includes appropriate documentation.

## License

This project is licensed under the MIT License. See the LICENSE file in the repository for complete details.

## Acknowledgments

We extend our gratitude to:

\begin{itemize}
\item Next.js team for the exceptional React framework
\item Shadcn UI for beautiful, accessible components
\item Prisma for the type-safe database ORM
\item Vercel for seamless deployment platform
\item The Odoo community for inspiration
\end{itemize}

## Support and Contact

For support, questions, or feedback:

\begin{itemize}
\item Open an issue on GitHub: https://github.com/Sahil-Gupta-16/42_Odoo/issues
\item Email: support@stockmaster.dev
\item Join our community discussions
\end{itemize}

## References

[1] StockMaster Project Documentation and Feature Specification (2025). Hackathon Project - Inventory Management System with Real-time Dashboard and Offline Support.
