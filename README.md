# Perfume Shop

A modern and responsive perfume e-commerce web application built with **React 19**, **Vite**, and **Tailwind CSS**.

This project provides an elegant online shopping experience, allowing users to explore fragrance collections, browse products, view product details, and manage their shopping cart. Product data is integrated with **Supabase**.

## Preview

![Perfume Shop Homepage](docs/screenshots/homepage.png)

## Features

- **Responsive Design:** Optimized layouts for desktop and mobile devices.
- **Product Collections:** Browse perfumes across Floral, Woody, Oriental, and Fresh categories.
- **Product Catalog:** Explore available perfumes and product information.
- **Product Details:** View individual product information.
- **Shopping Cart:** Add and manage products in the shopping cart.
- **Supabase Integration:** Retrieve product data from a Supabase backend.
- **Interactive UI:** Smooth animations and interactive components.
- **Reusable Components:** Modular and maintainable React component architecture.
- **Client-side Navigation:** Navigate between application pages.

## Screenshots

### Homepage

![Homepage](docs/screenshots/homepage.png)

### Perfume Collections

![Collections](docs/screenshots/collections.png)

### Best Sellers

![Best Sellers](docs/screenshots/best-sellers.png)

### Brand Story

![Brand Story](docs/screenshots/brand-story.png)

### Mobile Responsive View

![Mobile View](docs/screenshots/mobile-view.png)

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI development |
| Vite | Development server and build tooling |
| Tailwind CSS 4 | Responsive styling |
| React Router 7 | Client-side routing |
| Supabase | Backend and product data management |
| Motion | UI animations |
| Lucide React | Icons |

## Project Structure

```text
perfume-shop/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   │   └── supabase.js
│   ├── services/
│   │   └── productService.js
│   ├── App.jsx
│   └── main.jsx
├── docs/
│   └── screenshots/
├── .env.example
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm
- A Supabase project with the required product data configured

### Installation

1. Clone the repository:

```bash
git clone https://github.com/melinahadi/perfume-shop.git
```

2. Navigate to the project directory:

```bash
cd perfume-shop
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root and configure your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:

```bash
npm run dev
```

The application will be available at the local URL provided by Vite.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Environment Variables

The application requires the following environment variables:

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable/anon client key |

Never commit your `.env` file or private credentials to GitHub.

## What I Learned

Through this project, I gained practical experience in:

- Building reusable and maintainable React components.
- Developing responsive layouts with Tailwind CSS.
- Implementing client-side routing.
- Integrating Supabase with a React application.
- Fetching and managing backend product data.
- Building e-commerce interfaces and shopping cart functionality.
- Organizing frontend code into reusable components and service layers.

## Author

**Melina Hadi**  
Front-End Developer

- GitHub: [@melinahadi](https://github.com/melinahadi)
- LinkedIn: [Melina Hadi](https://www.linkedin.com/in/melina-hadi-6a1959354/)
