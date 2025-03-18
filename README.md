# Weather App

This is a Weather App built with **Vue 3**, **TypeScript**, **Vuex**, **Vue Router**, and **Tailwind CSS**.

## Setup

### 1. Clone the repository:

``
git clone <your-repository-url>
cd <project-directory>
``

### 2. Install dependencies:

``
npm install
``

### 3. Set up environment variables:

Create a `.env` file in the root of the project and add your API key:
``
VUE_APP_API_KEY=your-weather-api-key
``

### 4. Run the development server:

``
npm run dev
``

This will start the development server, and you can view your app by navigating to \`http://localhost:3000\`.

## Directory Structure:

- **src**: Contains all the source code for your app.
  - **assets**: For images or static resources.
  - **components**: Vue components for the app.
  - **router**: The router configuration file.
  - **store**: Vuex store for state management.
  - **views**: The different pages of the app.
  - **App.vue**: The root component.
- **public**: Contains static assets like index.html.
- **.env**: Environment configuration file (stores sensitive information like API keys).
