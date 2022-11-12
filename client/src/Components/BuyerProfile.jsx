import React, { useContext } from "react";
import CreditCard from "../Components/CreditCard";
import BuyerNavbar from "./navbars/BuyerNavbar"


const BuyerProfile = () => {

  return (
    <div>
      <BuyerNavbar/>
      <CreditCard />
    </div>
  );
};

export default BuyerProfile;
