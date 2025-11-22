# StockMaster - Inventory Management System
https://own.vikasrajyadav.com/login

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

*Inventory Managers* manage incoming and outgoing stock operations. *Warehouse Staff* perform transfers, picking, shelving, and cycle counting.[1]

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

*Step 1: Clone the repository*

Open your terminal and run:

git clone https://github.com/Sahil-Gupta-16/42_Odoo.git
cd 42_Odoo

*Step 2: Install dependencies*

npm install
# or
yarn install

*Step 3: Set up environment variables*

Create a .env file in the root directory with the following variables:

DATABASE_URL="postgresql://user:password@localhost:5432/stockmaster"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
OTP_SERVICE_API_KEY="your-otp-service-key"

*Step 4: Set up the database*

Initialize Prisma and create the database schema:

npx prisma generate
# StockMaster IMS (42_Odoo)

A modern inventory-management front-end built with Next.js (App Router), TypeScript and Tailwind CSS. This repository contains the UI app for managing products, deliveries, receipts and transfers. It also includes a Prisma schema for backend/data modeling.

## Highlights

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + PostCSS
- Zustand for client state
- Framer Motion for animations
- Prisma schema located in prisma/

## USP — Customizable dashboard

One of this project's key differentiators is a fully customizable dashboard layout. Users can rearrange, resize and personalize dashboard widgets to suit their operational needs.

- Interactions: drag-and-drop and resize widgets in the dashboard UI.
- Implementation: the UI leverages react-grid-layout for draggable/resizable grid layouts and stores layouts in the client (or backend) so they can be persisted across sessions.
- Where to look: the dashboard pages live under src/app/(main)/dashboard and the widgets/components are in src/components/dashboard/ — these are the places to extend, add widgets or change layout behavior.

Quick notes for developers

- To add a widget: create a new component under src/components/dashboard/, expose its grid size (w/h) and a unique key, and mount it in the dashboard list.
- Persisting layouts: implement a save/load flow that writes the react-grid-layout layout object to a backend API or localStorage. Consider storing per-user layouts so each user can have a personalized dashboard.
- Accessibility: ensure widgets remain keyboard-navigable and provide fallback views for very small screens.


## Quickstart

Requirements
- Node.js 18 or newer
- npm, Yarn or pnpm

Install and run locally

bash
# install deps
npm install

# run development server
npm run dev

# build for production
npm run build

# start production server (after build)
npm run start

# lint the project
npm run lint


Open http://localhost:3000 after starting the dev server.

## Deployment (Self-hosted)

Live demo: https://own.vikasrajyadav.com/login

This repository is running on a self-hosted server under the domain own.vikasrajyadav.com. Below are minimal, practical steps to deploy the Next.js app on your own Linux server (example uses Node + Nginx reverse proxy). Adjust to your environment and process manager of choice.

1. Build on the server (or build locally and copy):

bash
# install dependencies
npm ci

# build the app
npm run build

# start (production)
NODE_ENV=production npm run start


2. Use a process manager to keep the app running (recommended):

- PM2 (example):

bash
npm install -g pm2
pm2 start "NODE_ENV=production npm run start" --name stockmaster-ims
pm2 save


- or create a systemd service unit that runs npm run start.

3. Reverse proxy with Nginx (example server block):

nginx
server {
	listen 80;
	server_name own.vikasrajyadav.com;

	location / {
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header Host $host;
		proxy_pass http://127.0.0.1:3000;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
	}
}


4. HTTPS with Let's Encrypt (Certbot):

bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d own.vikasrajyadav.com


5. Environment variables

Place runtime variables in a secure .env (not checked into git) or configure them in your process manager. Typical variables used by this project include:


DATABASE_URL=...
NEXTAUTH_URL=https://own.vikasrajyadav.com
NEXTAUTH_SECRET=...
NEXT_PUBLIC_API_URL=https://own.vikasrajyadav.com/api


Notes
- If you serve the app behind a proxy that terminates TLS, make sure Next.js knows the external origin via NEXTAUTH_URL / NEXT_PUBLIC_* env vars.
- For zero-downtime restarts consider PM2 or a containerized approach (Docker + docker-compose / Kubernetes) instead of direct systemd.
- If you build locally and copy artifacts to the server, also copy the node_modules (or run npm ci on server) and ensure the installed Node version matches (Node 18+ recommended).

## Environment

Create a .env file in the project root with environment variables your deployment requires. If you use Prisma, set DATABASE_URL accordingly. Example:


DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"


## Prisma

This repo includes a prisma/schema.prisma file. Typical Prisma commands:

bash
# generate client
npx prisma generate

# push schema to the database (or use migrations)
npx prisma db push

# run migrations (if you use migration workflow)
npx prisma migrate dev --name init


Note: The project does not ship Prisma CLI scripts in package.json by default; add them if you want automated prisma tasks.

## Project layout (key folders)

- src/app/ — Next.js app routes and layouts (app router)
	- (auth)/ — login, signup, reset
	- (main)/ — dashboard, operations (receipts, deliveries, transfers)
- src/components/ — UI components and widgets
- src/lib/ — utilities
- src/store/ — Zustand stores
- prisma/ — database schema
- public/ — static assets

## Scripts

Defined in package.json:

- dev — start Next.js dev server
- build — build for production
- start — run production server
- lint — run linter

## Contributing

Feel free to open issues and PRs. A minimal process:

1. Fork the repo
2. Create a feature branch
3. Commit your changes with clear messages
4. Open a PR for review

## Notes and next steps

- Consider adding a .env.example with common environment variables.
- If you plan to use Prisma migrations in CI, add npm scripts for prisma generate and prisma migrate.
- Add a LICENSE file if you want to publish under a specific license.

---

If you'd like, I can:

- add a .env.example
- add prisma npm scripts
- create a short CONTRIBUTING.md

Tell me which of these you'd like and I will add them.
npx prisma db seed

*Step 5: Run the development server*

npm run dev
# or
yarn dev

*Step 6: Access the application*

Open your web browser and navigate to http://localhost:3000

## Project Structure

The project follows a clear, modular structure:

![WhatsApp Image 2025-11-22 at 18 06 08_2e7ac41f](https://github.com/user-attachments/assets/5c35a3fe-55f4-4fe3-b5e1-3141f472c657)


## Usage

### Complete Inventory Flow

Here is an example of a complete inventory operation:

*Step 1: Receive Goods from Vendor*

You receive 100 kg of steel from your supplier. Create a receipt and enter the quantity. Upon validation, the stock automatically increases by 100 kg.[1]

*Step 2: Internal Transfer*

Move the 100 kg of steel from the Main Store to the Production Rack. The total stock remains unchanged (100 kg), but the location is updated in the system.[1]

*Step 3: Deliver Finished Goods*

Production uses 20 kg of steel to manufacture steel frames. Create a delivery order and validate. The stock automatically decreases by 20 kg.[1]

*Step 4: Stock Adjustment*

During inspection, 3 kg of material is found to be damaged. Create a stock adjustment, enter the actual quantity (97 kg), and the system logs a -3 kg adjustment.[1]

Everything is logged in the *Stock Ledger* with complete traceability showing timestamps, quantities, and user actions.[1]

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
\item *User* - Authentication and user information
\item *Product* - Product catalog with SKU and categories
\item *Warehouse* - Warehouse and location management
\item *StockMove* - All stock transactions and transfers
\item *Receipt* - Incoming stock documentation
\item *Delivery* - Outgoing stock documentation
\item *Category* - Product categorization
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
\item Create a feature branch: git checkout -b feature/YourFeature
\item Commit your changes: git commit -m 'Add some feature'
\item Push to the branch: git push origin feature/YourFeature
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
