# 🌱 GreenSwitch
### AI-Powered Sustainable Packaging & Recycling Platform

GreenSwitch is a web-based platform designed to help businesses in Palestine reduce their dependence on single-use plastics by connecting them with suppliers of sustainable packaging alternatives and recycling partners.

The platform combines artificial intelligence, a digital marketplace, cost comparison tools, group purchasing, and recycling rewards to make sustainable business practices more accessible and economically practical.

## 🎯 Project Objectives

- Reduce dependence on single-use plastic packaging.
- Support Palestinian suppliers of sustainable alternatives.
- Help restaurants and businesses compare packaging costs.
- Connect businesses with recycling service providers.
- Encourage responsible waste management through rewards.
- Promote sustainable consumption and circular economy practices.

## ✨ Main Features

### 1. Sustainable Marketplace
Businesses can explore sustainable packaging products offered by suppliers, compare options, and submit orders.

### 2. AI Packaging Advisor
Provides packaging recommendations based on business needs, product suitability, and sustainability considerations.

### 3. Cost Comparison
Helps businesses compare conventional packaging costs with sustainable alternatives and estimate monthly expenses.

### 4. Group Buying
Enables businesses to combine purchasing quantities and potentially access better supplier pricing.

### 5. Recycling Management
Connects businesses with recycling partners for collecting recyclable materials such as paper, cardboard, and aluminum.

### 6. Green Rewards
Encourages verified recycling activities through a points-based rewards system.

### 7. Role-Based Dashboards
GreenSwitch provides dedicated interfaces for:

- **Buyers:** Marketplace, recommendations, cost comparison, purchasing, and recycling.
- **Suppliers:** Product management, inventory, orders, and group buying.
- **Recycling Partners:** Recycling pickup requests and collection tracking.
- **Administrators:** Account approvals, product moderation, promotional rules, and platform management.

## 🛠️ Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase (Authentication and Database)
- Node.js and npm

## 🚀 Installation & Running Locally

### Prerequisites

Install:

- Node.js (a compatible LTS version)
- npm
- Git

### Step 1 — Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_REPOSITORY_FOLDER
```

### Step 2 — Install Dependencies

```bash
npm install --legacy-peer-deps
```

The `--legacy-peer-deps` option helps avoid dependency resolution issues encountered during local installation.

### Step 3 — Configure Environment Variables

Create a `.env` file in the project root.

Add the following variables using the configuration provided by the project maintainers:

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_PROJECT_ID=YOUR_SUPABASE_PROJECT_ID
```

The application requires access to its configured Supabase backend. Cloning the repository does not copy existing database records or authentication accounts.

### Step 4 — Run the Application

```bash
npm run dev
```

Open the local URL displayed in your terminal, typically:

```text
http://localhost:5173
```

### Step 5 — Build for Production

```bash
npm run build
```

## 👥 User Roles

| Role | Purpose |
|---|---|
| Buyer | Discover and purchase sustainable alternatives |
| Supplier | Manage sustainable products and customer orders |
| Recycling Partner | Manage recycling pickups and verify collections |
| Admin | Manage users, products, and platform operations |

Some functions require administrator approval before they become available.

## ♻️ Environmental Impact

GreenSwitch aims to support waste reduction, responsible resource consumption, and the adoption of sustainable packaging alternatives.

Environmental savings displayed by the platform should be interpreted according to the available data and calculation assumptions. Product recyclability depends on material composition and local recycling infrastructure.

## 🔐 Security Notes

- Authentication is handled through Supabase.
- Do not commit passwords, private API keys, or service-role keys.
- Keep sensitive environment variables outside version control.
- Use authorized demo accounts for evaluation.
- Database access requires appropriate permissions.

## 📌 Project Status

GreenSwitch is a hackathon prototype. Some integrations, pricing rules, environmental impact calculations, and commercial partnerships may require additional testing or validation before production deployment.

## 🌍 Project Vision

Our vision is to make sustainable packaging more affordable, accessible, and practical for Palestinian businesses while supporting local suppliers, recycling companies, and the transition toward a circular economy.

## 👩‍💻 Project Team

**Team Name:** GreenSwitch

**Team Members:**
- [Raghad BaniOdeh]
- [Rand Hamdan]
- [Shahd Abu Kishik]
- [Gharam Zaki]
**Project Location:** Palestine

---

**GreenSwitch — Switch Smart. Live Green. 🌱**
