# BlinkIt Analytics Dashboard

A pixel-perfect implementation of the BlinkIt Analytics Dashboard design from Figma, built with Next.js and React.

## Features

- Exact match to the Figma design for desktop screens
- Dynamic UI elements controlled by JSON configuration
- Integration with Cube.JS for data fetching
- Interactive charts using Recharts
- Data tables with sorting and filtering capabilities

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Recharts for visualizations
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/blinkit-analytics.git
cd blinkit-analytics
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project is ready to be deployed on Vercel. Follow these steps:

1. Create a Vercel account if you don't have one
2. Install the Vercel CLI:

```bash
npm install -g vercel
```

3. Deploy the project:

```bash
vercel
```

4. Follow the prompts to connect your GitHub repository or deploy from the local codebase.

## Configuration

The dashboard is configured through a JSON file located at `public/dashboard-config.json`. You can modify this file to:

- Add or remove cards
- Change visualization types
- Update Cube.JS queries
- Adjust card positions and sizes

## Implementation Details

- The UI is controlled by a configuration JSON file that defines each dashboard component
- CubeJS integration is handled through a custom API utility
- Mock data is provided for development/demonstration purposes
- Reusable components for charts, tables, and UI elements
- Pixel-perfect implementation matching the Figma design
