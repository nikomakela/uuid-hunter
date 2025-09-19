# UUID Hunter

This is a Next.js application where you have to guess a secret UUID.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (version 20 or later) and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root of the project by copying the example file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and set the `TARGET_UUID` variable to the secret UUID you want the application to use.
   ```
   TARGET_UUID=your-secret-uuid-goes-here
   ```
   If you don't set this, a default UUID will be used.

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to [http://localhost:9002](http://localhost:9002).

Now you can start guessing the UUID!
