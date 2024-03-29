import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useRef } from "react";

//Components
import Admin from "./Components/Admin";
import BuyerProfile from "./Components/BuyerProfile";
import Home from "./Components/Home";
import Login from "./Components/login";
import PostYourGIG from "./Components/PostYourGIG";
import ProfileUser from "./Components/ProfileUser";
import Register from "./Components/register";
import Profile from "./Components/UserNavbar";
import SellerOrderDetails from "./Components/Order/SellerOrderDetails";
import BuyerOrdersPage from "./Components/Orders/BuyerOrdersPage";
import SellerOrdersPage from "./Components/Orders/SellerOrderPage";
import Settings from "./Components/Setting/Settings";
import RefreshAccount from "./Components/Setting/RefreshAccount";
import PaymentSucess from "./Components/Setting/PaymentSucess";
import PaymentFailure from "./Components/Setting/PaymentFailure";

// Team
import { Route, Routes } from "react-router-dom";
import Bid from "./Components/Bid/Bid";
import BuyerTeamCategory from "./Components/BuyerTeamCategory";
import { ForgotPasswordPage } from "./Components/forgot-password";
import Messenger from "./Components/Messenger/Messenger";
import Messenger2 from "./Components/Messenger/Messenger2";
import { ProtectedRoute } from "./Components/protected-route";
import ActiveOrders from "./Components/ShowBuyerRequest/ActiveOrders";
import BuyerReq from "./Components/ShowBuyerRequest/BuyerReq";
import Catagory from "./Components/Teams/Catagory";
import CreateTeam from "./Components/Teams/CreateTeam";
import Members from "./Components/Teams/Members";
import TeamTitle from "./Components/Teams/TeamTitle";
import { UserContext } from "./context/user.context";
import Firstteam from "./Components/TeamBuyerEnd/Firstteam"
import Second from "./Components/TeamBuyerEnd/SecondScreen"
import SellerTeam from "./Components/Teams-At-Seller-End/SellerTeam"
import SellerTeamByCategory from "./Components/Teams-At-Seller-End/SellerTeamByCategory";
import { io } from "socket.io-client";
import SellerEarning from "./Components/SellerEarning/SellerEarning";
function App() {
  const { user } = useContext(UserContext);
  const socket = useRef();

  // useEffect(() => {
  //   const disconnectUser = () =>
  //     socket.current.emit("offline", {
  //       user: user?._id,
  //     });
  //   socket.current = io("ws://localhost:7900"); //

  //   window.addEventListener("beforeunload", disconnectUser);
  //   return () => {
  //     disconnectUser();
  //     window.removeEventListener("beforeunload", disconnectUser);
  //   };
  // }, [user?._id]);

  return (
    <Routes>
      <>
        <Route path="/" element={<Home />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/buyerProfile" element={<BuyerProfile />} />
          <Route path="/profileUser" element={<ProfileUser />} />
          <Route path="/profile/profileUser" element={<ProfileUser />} />
          <Route path="/PostYourGIG" element={<PostYourGIG />} />
          <Route path="/createTeam" element={<CreateTeam />} />
          <Route path="/catagory" element={<Catagory />} />
          <Route path="/teamTitle" element={<TeamTitle />} />
          <Route path="/team/:id/members/" element={<Members />} />
          <Route path="/buyer/teams/" element={<BuyerTeamCategory />} />

          <Route path="/bid" element={<Bid />} />
          <Route path="/buyer-request" element={<BuyerReq />} />
          <Route path="/active-orders" element={<ActiveOrders />} />
          <Route path="/messages" element={<Messenger />} />
          <Route path="/messages/:id" element={<Messenger2 />} />
          <Route path="/buyer/teams/:category" element={< Firstteam />} />
          <Route path="/buyer/team/:id" element={< Second  />} />
          <Route path="/second" element={<Second />} />
          <Route path="/sellerTeam/:id" element={<SellerTeam />} />
          <Route path="/sellerTeam/category/:category" element={<SellerTeamByCategory />} />
          <Route path="/user/manage/order/:id" element={<SellerOrderDetails />} />
          <Route path="/user/buyer/orders" element={<BuyerOrdersPage />} />
          <Route path="/user/seller/orders" element={<SellerOrdersPage />} />
          <Route path="/seller/earning" element={<SellerEarning />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/stripe/return" element={<Settings />} />
          <Route path="/stripe/reauth/:id" element={<RefreshAccount />} />
          <Route path="/payment/success/:id" element={<PaymentSucess />} />
          <Route path="/payment/failure" element={<PaymentFailure />} />
        </Route>
      </>
    </Routes>
  );
}

export default App;
