# Project: Emma Wika Real Estate Platform

This document outlines the development roadmap for the Emma Wika project, a comprehensive real estate management platform.

## 1. Vision & Strategy

The vision is to create a multi-tenant, full-service real estate platform that serves as a centralized API for both a web application and a mobile app. The system will manage property listings, agent and agency profiles, tenant and property owner portals, and content like blogs and services.

- **Project Name:** Emma Wika Real Estate Platform
- **Core Problem:** Centralize real estate operations, from property listing to tenant management and agent coordination.
- **Target Audience:** Emma Wike (primary stakeholder), other real estate agencies, agents, property owners, and tenants.

## 2. Core Modules (Epics)

The project will be broken down into the following core modules:

### 2.1. Core Content Management (CRUD)
- **Description:** Basic content management features for the public-facing website.
- **Features:**
    - CRUD operations for **Blogs**.
    - CRUD operations for **Services** offered.
    - CRUD operations for **Projects** (showcasing completed constructions).

### 2.2. Property Management
- **Description:** The core module for managing property listings.
- **Features:**
    - CRUD operations for **Properties**.
    - Image and document uploads for properties.
    - Advanced filtering and search capabilities.

### 2.3. Multi-Tenancy: Agencies & Agents
- **Description:** A platform for other agencies and agents to register and manage their own listings.
- **Features:**
    - Agency registration and profile management.
    - Agent registration, linked to a specific agency.
    - Agent profile pages.
    - Role-based access control (RBAC) to ensure agents can only manage their own properties.

### 2.4. User Portals
- **Description:** Secure portals for tenants and property owners.
- **Features:**
    - **Tenant Portal:**
        - Secure login.
        - Submit complaints or maintenance requests for their property.
        - View request history.
    - **Property Owner Portal:**
        - Secure login.
        - View their portfolio of properties.
        - View tenant complaints and status updates.

### 2.5. Authentication & API
- **Description:** Secure authentication and a robust API to serve web and mobile clients.
- **Features:**
    - Agent/Agency authentication.
    - Tenant/Owner authentication.
    - Expose all necessary CRUD operations via a RESTful API.
    - Specific endpoints optimized for the React Native mobile app.

### 2.6. Notifications
- **Description:** Automated communication system.
- **Features:**
    - Automated rent payment reminders.
    - Notifications for complaint status updates.
    - Integration with **Resend** for email delivery.

## 3. Feature Roadmap (Stories)

This roadmap breaks down the development into logical phases.

### Phase 1: Foundation & Core API (MVP)
*Goal: Establish the project structure and build the most critical features.*
1.  **Setup Laravel Models & Migrations:** Create database schemas for `User`, `Property`, `Blog`, `Service`, and `Project`.
2.  **Implement User Authentication:** Basic registration and login for a single agent (Emma Wike).
3.  **Build Core CRUD APIs:**
    - Implement API endpoints for Properties.
    - Implement API endpoints for Blogs, Services, and Projects.
4.  **Frontend Scaffolding:** Connect the existing React frontend to the new API endpoints to display data.

### Phase 2: Agency & Agent Platform
*Goal: Expand the platform to support multiple agencies and agents.*
1.  **Develop Agency/Agent Models:** Create database schemas for `Agencies` and extend `Users` to be `Agents` linked to an agency.
2.  **Implement Agency/Agent Auth:** Allow agencies and agents to register and log in.
3.  **Implement RBAC:** Ensure agents can only access and manage their own agency's data.
4.  **Build Profile Management:** Create API endpoints and frontend components for agent/agency profile updates.

### Phase 3: Tenant & Owner Portals
*Goal: Build the portals for property owners and tenants.*
1.  **Develop Portal Models:** Create database schemas for `Tenants`, `Owners`, and `Complaints`.
2.  **Implement Portal Authentication:** Secure login for tenants and owners.
3.  **Build Complaint System:**
    - API endpoints for tenants to create and view complaints.
    - API endpoints for owners to view complaints on their properties.
4.  **Develop Frontend Portals:** Create the UI for tenants and owners.

### Phase 4: Advanced Features & Integrations
*Goal: Add notifications and finalize integrations.*
1.  **Integrate Resend:** Configure the Laravel application to send emails via Resend.
2.  **Build Notification System:**
    - Create scheduled jobs for sending rent reminders.
    - Trigger email notifications for complaint updates.
3.  **Finalize Mobile API:** Create and refine any specific endpoints required for the React Native mobile app, focusing on authentication and performance.
4.  **Testing & Deployment:** Thoroughly test all features and prepare for deployment.

## 4. Technical Architecture
- **Backend:** Laravel
- **Frontend (Web):** React / Inertia.js
- **UI Components:** shadcn/ui
- **Frontend (Mobile):** React Native
- **API:** RESTful API
- **Email Service:** Resend

## 5. Next Steps
If you approve this plan, I will begin with **Phase 1: Foundation & Core API (MVP)** by creating the necessary models and migrations for the core features.
