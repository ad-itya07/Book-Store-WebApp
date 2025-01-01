# Book Store WebApp

**Book Store WebApp** is a comprehensive platform that allows users to browse, search, and purchase books online. Built with modern web technologies, it offers a seamless and responsive user experience.

## Features

- **User Authentication**: Secure user registration and login functionality.
- **Book Catalog**: Browse a wide range of books with detailed information.
- **Search and Filter**: Efficient search and filtering options to find books by title, author, genre, and more.
- **Shopping Cart**: Add books to the cart and manage quantities before checkout.
- **Order Management**: View order history and track order status.
- **Responsive Design**: Optimized for various devices and screen sizes.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: Postgres and Prisma
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Integration**: Stripe API

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ad-itya07/Book-Store-WebApp.git
   cd Book-Store-WebApp
   ```

2. **Install dependencies**:
   - For Backend:
     ```bash
     cd backend
     npm install
     ```

   - For Frontend:
   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables**:
   - Frontend: 
    ```bash
    >>> Stepup firebase app and configure the environment
    
    VITE_API_KEY=""
    VITE_Auth_Domain=""
    VITE_PROJECT_ID=""
    VITE_STORAGE_BUCKET=""
    VITE_MESSAGING_SENDERID= ""
    VITE_APPID=""
    ```

    - Backend:
         - Note that the books that are displayed are on the database, so you'll have tk configure the database and add books there either manually or postman, or by running the admin side service.
      ```bash
      DB_URL = ""

      JWT_SECRET_KEY = ''
      ```
      
5. **Run the development servers**:
    - Backend:
      ```bash
      cd backend
      npm run dev
      ```

   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
  
