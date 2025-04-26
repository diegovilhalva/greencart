
# 🛒 GreenCart

**GreenCart** is a modern full-stack grocery store application built with the **MERN stack**, featuring a user-friendly UI, an admin dashboard, category filtering, cart management, and two payment options: **online via Stripe** and **cash on delivery**.

🌐 **Live site**: [greencart-tau.vercel.app](https://greencart-tau.vercel.app)  
📦 **GitHub repository**: [github.com/diegovilhalva/greencart](https://github.com/diegovilhalva/greencart)

---

## 🚀 Features

- 🧑‍💼 User authentication (Email/Password or Google OAuth via Passport.js)
- 🛠️ Profile update support
- 🛍️ Browse and filter products by category
- 🔍 Product search functionality
- 🛒 Add/remove items from the cart
- 💳 Two payment methods: **Stripe** (online) or **Cash on Delivery**
- 📦 Admin dashboard for order and product management (WIP/future scope)
- ☁️ Image upload with **Cloudinary**

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, React Router DOM
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Authentication**: Passport.js (with Google OAuth)
- **Payments**: Stripe API (with webhook support)
- **Media Hosting**: Cloudinary
- **Deployment**: Vercel (frontend), Render (or local for backend)

---

## 🧑‍💻 Getting Started Locally

Clone the repository:

```bash
git clone https://github.com/diegovilhalva/greencart.git
cd greencart
```

### 1. Install Dependencies

Navigate to both `client` and `server` folders and install dependencies:

```bash
# In root folder
cd client
npm install

# In another terminal
cd server
npm install
```

### 2. Environment Variables

Create a `.env` file inside the `server` folder with the following variables:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
SELLER_EMAI=create_a_seller_email
SELLER_PASSWORD=create_a_seller_password
```
Create a `.env` file inside the `client` folder with the following variables:
```
VITE_CURRENCY="$"
VITE_URL_ENDPOINT=your_local_api_endpoint

```


### 3. Run the App

Start both frontend and backend in separate terminals:

```bash
# In /client
npm run dev

# In /server
npm run dev
```



## 📌 License

This project is open-source and available under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## 🙌 Author

Developed by [Diego Vilhalva](https://github.com/diegovilhalva)





