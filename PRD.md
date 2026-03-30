# Product Requirements Document (PRD)
## Gridpoint Global — Real Estate Technology Platform

---

## 1. Overview

**Product Name:** Gridpoint Global
**Domain:** Real Estate Technology (PropTech)
**Market:** Zimbabwe (primary), expanding across Africa
**Contact:** enquiries@gridpointglobal.com | +263 773 725 423

Gridpoint is an end-to-end property technology platform that revolutionizes real estate for sellers, buyers, realtors, banks, insurance providers, investors, and government bodies. It uses data and analytics to enable more informed decisions, streamline processes, and enhance due diligence across real estate transactions.

---

## 2. Problem Statement

The real estate market in Zimbabwe (and broader Africa) suffers from:

| Problem | Impact |
|---|---|
| Property fraud & corruption | Double selling, illegal transactions, theft of identity |
| Broken buying/selling process | Archaic, paper-heavy, disjointed workflows |
| Financing barriers | Tedious processes, lack of comprehensive property data for investment decisions |
| Property valuation gaps | No automated/reliable valuation methods |
| Lack of real-time market data | No access to property trends, ownership records, or price indices |

---

## 3. Target Users

| User Type | Role / Need |
|---|---|
| Home Buyers & Sellers | Search listings, get valuations, access due diligence tools |
| Real Estate Agents / Realtors | Prospect leads, manage client relationships (CRM), list properties |
| Property Investors | Analyse markets, build portfolios, access investment tools |
| Banks & Financial Institutions | Mortgage origination, appraisal management, valuation data |
| Insurance Companies | Risk assessment using property & environmental data |
| Government & Parastatals | Access to boundaries, land use, census, and ownership records |
| Conveyancers / Legal | Due diligence, title verification, skip tracing |
| Business Consultants & Tech Platforms | Access data APIs for downstream product development |

---

## 4. Product Modules & Requirements

### 4.1 Property Marketplace

**Purpose:** End-to-end property buying, renting, and development discovery.

**Functional Requirements:**
- Search bar with Property Type selector and Location input
- Tabs: **Buy**, **Rent**, **Developments**
- Feat  ured property listings with:
  - Property image (with 3D walkthrough badge support)
  - Price, bedrooms, bathrooms, square footage, lot size
  - Address and location
  - Save/favourite (heart icon)
  - "View details" CTA
  - Badge labels (e.g. "Listed by Redfin", "3D Walkthrough")
- "See all X properties" link to full listing view
- Minimum listing count: 3,000+
- Mobile-responsive grid layout

**Non-Functional Requirements:**
- Page load under 2 seconds for listing grid
- Supports large dataset pagination

---

### 4.2 Prospecting & Valuation

**Purpose:** Research any property for market value, construction costs, and investment potential.

**Sub-modules:**
- **Prospecting** — Identify and build property prospect lists
- **Property Valuations** — Get market value estimates

**Functional Requirements:**
- Search/filter properties by location, type, price
- Interactive digital property reports
- Valuation methods supported:
  - Automated Valuation Model (AVM)
  - Computer Assisted Mass Appraisal (CAMA)
  - Comparative Market Analysis (CMA)
  - Assessor Tax Values
  - Construction Value
  - Municipal Rates Value
  - Home Equity
  - Rental AVM
- 3rd Party Due Diligence data integration
- Expandable accordion sections for property data details

---

### 4.3 Property Data & Analytics

**Purpose:** Best-in-class property data powering decisions for all stakeholders.

**Scale:** 155 million properties | 18 million businesses

**Data Categories:**
| Category | Data Points |
|---|---|
| Property Data | Addresses, price, land size, legal description, building size, property type, use, characteristics, zoning |
| Ownership Data | Owner name, type, contact details, title deeds, ownership history |
| Market Analytics | Property inventory, market price indices, sales trends, home affordability, rentals, mortgages, suburb profiles, opportunity zones |
| Valuation Data | AVM, CAMA, CMA, assessor tax, construction value, municipal rates, home equity, rental AVM |
| Boundaries | Land parcel, suburb, ward, city, land use, census, district, province |
| Utilities & Infrastructure | Water, roads, electricity, sewer, storm water, landline, wireless, broadband, refuse collection |
| Points of Interest | Schools, hospitals, police stations, banks, fuel stations, ATMs, churches, sports facilities, restaurants, night clubs |
| Demographics & Crime | Households, population, socio-economic indicators, buying power, poverty index, crime rate |
| Environment & Climate | Flood zones, wetland, air pollution, noise pollution, cleanliness, terrain, soil type |

**Sub-modules:**
- **Data Sets** — Downloadable datasets importable into CRMs and marketing tools
- **Data & Analytics** — Interactive market dashboards and property trend reports

---

### 4.4 Real Estate CRM

**Purpose:** Bespoke customer relationship management for real estate professionals.

**Functional Requirements:**
- Lead and client contact management
- Sub-modules:
  - **Prospecting & Valuation** — integrated workflow from lead to valuation
  - **Skip Trace Property Owners** — instantly retrieve owner phone, email, and other contact details
- Communication tracking (calls, emails, notes)
- Pipeline/deal stage management
- Integration with marketplace and prospecting tools

---

### 4.5 Investment & Brokerage (Brokerage & Mortgage)

**Purpose:** Property financing, mortgage origination, and portfolio growth.

**Functional Requirements:**
- **Investment Tools** — ROI calculators, rental yield analysis, portfolio tracking
- Mortgage technology:
  - Loan origination tools
  - Appraisal management
  - Payment processing integration
- Tech-enabled brokerage features to improve agent efficiency
- Property financing access for investors

---

### 4.6 Conveyancing & Due Diligence

**Purpose:** Verify legal, financial, physical, and environmental aspects of a property before purchase or development.

**Sub-modules & Functional Requirements:**

| Sub-module | Description |
|---|---|
| Property Due Diligence | Full property fact sheet — addresses, price, land & building details, zoning, land use |
| 3rd Party Due Diligence | AVM, CAMA, CMA, assessor tax values, municipal rates, home equity |
| Property Watch List | Save and monitor properties of interest over time |
| Skip Trace | Instantly retrieve owner contact info (phone, email, other details) |
| Property Inspection | Schedule and manage property inspection records |

---

## 5. Navigation Structure

### Top Navigation
- Home
- Solutions (dropdown)
- Industries
- Data
- Resources
- My Account

### Secondary / Module Navigation
- Marketplace
- Prospecting & Valuations
- Data & Analytics
- Real Estate CRM
- Brokerage & Mortgage
- Conveyancing & Due Diligence

### Footer Navigation
- **Solutions:** Property Marketplace, Prospecting & Valuation, Property Data & Analytics, Real Estate & CRM, Brokerage & Mortgage, Conveyancing & Due Diligence
- **Data:** Property Data, Ownership Data, Market Analytics & Data, Valuation Data, Boundaries, Utilities & Infrastructure, Point of Interest, Demographics & Crime, Environment & Climate
- **Industries:** Real Estate, Buyers & Sellers, Property Development & Investors, Financial Institutions & Insurance, Government & Parastatals, Business Consulting, Technology Platforms

---

## 6. Industries Served

1. **Real Estate** — Agents, brokers, developers needing data to innovate
2. **Buyers, Sellers & Renters** — Navigation-driven property discovery
3. **Property Development & Investors** — Market data for deal analysis
4. **Financial Institutions & Insurance** — Risk, valuation, and compliance data
5. **Government & Parastatals** — Land registry, boundaries, census-linked data
6. **Business Consulting** — Clean data for advisory services
7. **Technology Platforms** — API/data access for PropTech integrations

---

## 7. Cross-Cutting Requirements

### Authentication
- "My Account" user account system
- Role-based access (buyer, agent, investor, admin, etc.)
- Account registration and login

### Mobile
- Companion mobile app ("Get More with Our App")
- Exclusive deals, mobile transactions, property management
- Available for download

### Performance
- Fast load times for data-heavy pages
- Map-based property browsing (interactive maps shown in screenshots)
- Real-time data where applicable (market prices, valuations)

### Data & Privacy
- Terms of Use, Privacy Policy, Accessibility, Sitemap pages
- Compliant data handling for ownership and personal information

---

## 8. Success Metrics

| Metric | Target |
|---|---|
| Property listings live | 3,000+ (current baseline) |
| Properties in data coverage | 155M+ |
| Business coverage | 18M+ |
| User types served | 8+ distinct personas |
| Modules shipped | 6 core modules |
| Page load time | < 2 seconds |
| Mobile app availability | iOS + Android |
