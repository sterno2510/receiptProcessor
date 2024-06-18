# Receipt Processor App

This project is created to demonstrate backend knowledge. The React app included here needs to be run to facilitate passing data to the backend via a request and getting the appropriate response so we can visually see the results.

**Note:** The UI is designed solely to demonstrate functionality and does not represent any effort to create a visually appealing UI.

## Getting Started

Follow these steps to get the Receipt Processor app up and running on your local machine.

### Options to run app

If you prefer to skip the below steps and run the application in a docker container run the following commands:

```
docker build -t receipt-processor .
```
```
docker run -d -p 3001:3001 receipt-processor
```

### Prerequisites

Before you begin, ensure you have the following installed on your computer:

- **Node.js:** Download and install Node.js from [nodejs.org](https://nodejs.org). The Receipt Processor app requires Node.js version 22.2.0.

### Installing Node.js (version 22.2.0)

1. **Download Node.js:**
   - Visit [nodejs.org](https://nodejs.org).
   - Download the Node.js version 22.2.0 installer suitable for your operating system.

2. **Install Node.js:**
   - Run the downloaded installer and follow the installation prompts.
   - Verify the installation by opening a terminal and running:
     ```
     node --version
     ```
     This should display `v22.2.0`.

### Installation Steps for Receipt Processor App

1. **Clone the Repository:**
   - Open your terminal (command prompt on Windows).
   - Navigate to the directory where you want to store the app.
   - Run the following command to clone the repository:
     ```
     git clone https://github.com/sterno2510/receiptProcessor.git
     ```

2. **Navigate to the Project Directory:**
   - After cloning, navigate into the project directory using:
     ```
     cd receipt-processor
     ```

3. **Install Dependencies:**
   - Once inside the project directory, install dependencies by running:
     ```
     npm install
     ```
   This command will download and install all necessary packages defined in `package.json`.

4. **Start the Development Server:**
   - To start the server using `nodemon`, run:
     ```
     nodemon server.js
     ```
     Make sure your server entry point file is named `server.js`. Adjust the command if your file has a different name.

5. **Start the React App:**
   - Open a new terminal window/tab (while keeping the server running).
   - Navigate to the project directory if not already there.
   - Start the React app by running:
     ```
     npm start
     ```
   This command compiles the React app and opens it in your default web browser. If it doesn't open automatically, you can visit `http://localhost:3000` in your browser.

6. **Explore the App:**
   - You should now see the Receipt Processor app running locally!
   - Click on any of the receipts to test functionality of the backend!

