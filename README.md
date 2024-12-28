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
- **Database**: MongoDB
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
    
    VITE_API_KEY="AIzaSyCXvDIC4MPrkaMdeg_O2iij88wLpfj3qBA"
    VITE_Auth_Domain="book-store-mern-app.firebaseapp.com"
    VITE_PROJECT_ID="book-store-mern-app"
    VITE_STORAGE_BUCKET="book-store-mern-app.appspot.com"
    VITE_MESSAGING_SENDERID= "205632822247"
    VITE_APPID="1:205632822247:web:b0db0ec66bf6de0bbb3b42"
    ```

    - Backend:
      ```bash
      DB_URL = "mongodb+srv://helpyourassistant:pqam0Mwv3Vwv8Off@cluster0.qc3bq.mongodb.net/book-store?retryWrites=true&w=majority&appName=Cluster0"

      JWT_SECRET_KEY = 'bc992a20cb6706f741433686be814e3df45e57ea1c2fc85f9dbb0ef7df12308a669bfa7c976368ff32e32f6541480ce9ec1b122242f9b1257ab669026aeaf16'
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
  
