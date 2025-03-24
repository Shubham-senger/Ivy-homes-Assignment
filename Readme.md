# Name Database Project

## Working Code Solution

The project consists of a frontend and backend to search and display names using an autocomplete service. The backend fetches data from an external API, while the frontend provides a user interface to search and view names.

### Backend

- `character.js`: Generates character combinations.
- `server.js`: Express server to handle API requests and fetch data from the external autocomplete service.

### Frontend

- `layout.tsx`: Defines the root layout of the application.
- `page.tsx`: Home page to display all names.
- `search/page.tsx`: Search page to search for names.
- `components/Layout.tsx`: Layout component for consistent styling.

## Approach and Findings

### Approach

1. **Backend**:
   - Analyzed the API documentation to understand the endpoints, parameters, and response structure.
   - Created an Express server to handle API requests.
   - Used `character.js` to generate character combinations.
   - Implemented functions to fetch data from the external autocomplete service.
   - Added rate limiting and retry logic to handle API rate limits.

2. **Frontend**:
   - Created a search page with a form to input search queries and select API version.
   - Created a home page to display all names fetched from the backend.
   - Used React hooks to manage state and handle side effects.

3. **Script Design**:
   - Parsed and stored the API responses for further analysis.
   - Validated the data to ensure accuracy and completeness.

### Findings

- Successfully retrieved and processed the data from the API.
- Identified key insights and patterns in the data.
- The external API has rate limits, so implementing retry logic and rate limiting was crucial.
- Fetching all names took a significant amount of time due to the large number of requests.
- There are three versions of the data:
  - **Version 1:** Contains only alphabets.
  - **Version 2:** Contains alphabets and numbers.
  - **Version 3:** Contains alphabets, numbers, and special characters (+, -, , , . etc.).
- Queries:
  - **Version 1:** Supports `a-z`, `aa-zz`, `aaa-zzz` (only alphabets).
  - **Version 2:** Supports `a-z`, `aa-zz`, `0-9`, `00-99` (alphabets and numbers).
  - **Version 3:** Supports `a-z`, `aa-zz`, `0-9`, `00-99`, and special characters (+, -, , , . etc.).
- Have 3 versions and the prefix is varying up to the first 3 characters.
- Time taken by one response is around 70-100ms.
- Requests processed (Without Rate Limiting): 100.

## Tools or Scripts for Testing/Exploration

- **Postman**: Used to test API endpoints.
- **React Developer Tools**: Used to debug and inspect React components.
- **Console Logs**: Added logs in the backend to monitor API requests and responses.

## Total Number of Requests to the API

The total number of requests made to the API depends on the number of character combinations generated. For example:
- Single characters: 26 requests (a-z)
- Two-character combinations: 676 requests (aa-zz)
- Three-character combinations: 17,576 requests (aaa-zzz)
- Number combinations: 10 requests (0-9)

## Total Number of Records Obtained from the API

There are 3 versions of data, each version having a different number of records:
- **Version 1:** 10,009 records (only alphabets)
- **Version 2:** 4,345 records (alphabets and numbers)
- **Version 3:** 3,417 records (alphabets, numbers, and special characters)

## How to Run the Script

### Backend

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   node server.js
   ```

### Frontend

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.
