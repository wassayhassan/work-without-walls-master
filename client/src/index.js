import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { UserProvider } from "./context/user.context";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51M8LOvJhy7FBwcuNyrmFw0n11Pit7qEn26zkLawNyDsCPRxri3gp8Kheh3ppHwXu6rtghwk3LPLYgBjwOLjHk9sF00C4y1hVAe');
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <UserProvider>
      <BrowserRouter>
      <Elements stripe={stripePromise}>
         <App />
        </Elements> 
      </BrowserRouter>
    </UserProvider>
);
