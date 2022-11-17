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

// Team
import { Route, Routes } from "react-router-dom";
import Bid from "./Components/Bid/Bid";
import BuyerTeamCategory from "./Components/BuyerTeamCategory";
import { ForgotPasswordPage } from "./Components/forgot-password";
import Messenger from "./Components/Messenger/Messenger";
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
import { io } from "socket.io-client";
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
          <Route path="/members" element={<Members />} />
          <Route path="/BuyerTeamCategory" element={<BuyerTeamCategory />} />
          <Route path="/bid" element={<Bid />} />
          <Route path="/buyer-request" element={<BuyerReq />} />
          <Route path="/active-orders" element={<ActiveOrders />} />
          <Route path="/messages" element={<Messenger />} />
          <Route path="/first" element={< Firstteam />} />
          <Route path="/second" element={<Second />} />
          <Route path="/sellerTeam" element={<SellerTeam />} />
          <Route path="/user/manage/order/:id" element={<SellerOrderDetails />} />
        </Route>
      </>
    </Routes>
  );
}

export default App;
