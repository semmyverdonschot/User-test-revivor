# Revivor A/B Testing Application

## Description
This application is an A/B testing tool designed to collect user feedback on various drinks to test Revivor against. Users are presented with a series of images and prompted to describe their feelings or assumptions about each one. The collected data is then submitted to a Google Apps Script for storage and analysis.

## Features
*   **Interactive User Interface:** Guides users through an introduction example video and the main testing phase.
*   **User Input Collection:** Gathers textual feedback from users regarding their perceptions of each image.
*   **Google Apps Script Integration:** submits collected data to a Google Apps Script endpoint for quick backend processing and storage.
*   **Modern Web Stack:** Built using Next.js, React, TypeScript and styled with Tailwind CSS hosted with Vercel.

## Live
https://revivorusertest.vercel.app/

## Setup

### Prerequisites

If you dont have Node.js or npm here are the links:

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [npm](https://www.npmjs.com/get-npm)

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/semmyverdonschot/User-test-revivor.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server
To run the application in development mode:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production
To build the application for production:
```bash
npm run build
```

### Starting the Production Server
To start the production server after building:
```bash
npm run start
```

## API
The application uses a single API endpoint:
*   **`/api/submit` (POST):** Receives `imageId` and `feeling` from the frontend, adds a `timestamp`, and forwards this data to a configured Google Apps Script URL for storage.

## Data Storage
User responses are stored via a Google Apps Script, which acts as a bridge to a Google Sheet or other Google services. The specific Google Apps Script URL is configured within the `app/api/submit/route.ts` file CHANGE THE EXISTING ONE.

for more info about Google Apps Script and macro's https://developers.google.com/apps-script/overview
