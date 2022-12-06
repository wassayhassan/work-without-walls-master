import axios from "axios";

const Base = axios.create({
  baseURL: "http://localhost:7900",
  headers: {
    "Content-Type": "application/json",
  },
});

Base.interceptors.request.use((config) => {
  const user = window?.localStorage?.getItem("user");
  if (user) {
    const userDetail = JSON.parse(user);
    config.headers["Authorization"] = `Bearer ${userDetail?.token}`;
  }
  return config;
});

export const loginUser = (data) => Base.post("/auth/login", data);
export const logoutUser = () => Base.post("/auth/logout");
export const signupUser = (data) => Base.post("/api/register", data);
export const getUserById = (id) => Base.get(`/api/user/${id}`);
export const getUserMe = () => Base.get("/api/user");
export const getJobs = (page, search, category) => Base.get("/Job/", {params:  {page: page, search: search, category}}) ;
export const createJob=(data)=>Base.post(`/Job/create/`, data)
export const getYourJobs = ()=>Base.get("/Job/yourJob") //being map
export const updateYourJobs = (id, data)=>Base.put(`/Job/updateJob/${id}`, data) //being updated
export const deleteYourJobs = (id)=>Base.delete(`/Job/delete/${id}`) //being deleted
export const updateProfile=(id, data)=>Base.put(`/api/profile/${id}`,data)//being updated

export const getConversation=(id)=>Base.get(`/api/conversations/${id}`)  //done
export const getMessage=(id)=>Base.get(`/api/messages/${id}`)//done
export const AddMessages=(data)=>Base.post("/api/messages", data)
export const getFriednsConversation=(senderId,receiverId)=>Base.get(`/api/conversations/find/${senderId}/${receiverId}`) //chat online
export const getConversationByTwoUser = (id1, id2) => Base.get(`/api/conversations/get/${id1}/${id2}`)
export const addBid = (data) => Base.post('/bid/addnew', data);
export const getBidsById = (id) => Base.get(`/bid/getbyid/${id}`);
export const getBidById = (id) => Base.get(`/bid/${id}`);
export const getBidsByTwoIds = (id1, id2) => Base.get(`/bid/get/${id1}/${id2}`)
export const createOrder = (data) =>  Base.post('/order/create', data);
export const getOrderById = (id) => Base.get(`/order/${id}`);
export const getBuyerOrdersByUserId = (id) => Base.get(`/order/user/buyer/${id}`);
export const getSellerOrdersByUserId = (id) => Base.get(`/order/user/seller/${id}`);
export const addDelivery = (id, data) => Base.post(`/order/${id}/delivery/add`, data);
export const getDeliveriesByOrderId = (id) => Base.get(`/order/${id}/deliveries`);
export const getActivitiesByOrderId = (id) => Base.get(`/orderactivity/${id}`);
export const getDeliveryById = (id) => Base.get(`order/delivery/${id}`);
export const updateOrder = (id, data) => Base.post(`/order/${id}/update`, data);
export const createReview  = (id, data) => Base.post(`/review/create/order/${id}`, data);
export const getReviewsByUserId = (id) => Base.get(`/review/user/${id}`);
export const getReviewsByOrderId = (id) => Base.get(`/review/order/${id}`);
export const getReviewById = (id) => Base.get(`/review/${id}`);
export const updateBid = (id, data) => Base.post(`/bid/${id}/update`, data);
export const createNote = (data) => Base.post('/order/notes/create', data);
export const getNotesByOrderId = (id) => Base.get(`/order/${id}/notes`);
export const getNoteById = (id) => Base.get(`/order/notes/${id}`);
export const deleteNote = (id) => Base.delete(`/order/notes/${id}`);
export const updateNote = (id, data) => Base.put(`/order/notes/${id}`, data);
export const makeReqCancelActivity = (data) => Base.post('/orderactivity/create', data);
export const makeActivity = (data) => Base.post('/orderactivity/create', data);
export const createOrderMessage = (id, data) => Base.post(`/order/${id}/message/create`, data);
export const getOrderMessages = (id) => Base.get(`/order/${id}/messages`);
export const getNotificationsByUserId = (id) => Base.get(`/notification/${id}`);
export const createNotification = (data) => Base.post('/notification', data);
export const updateNotification = (id, data) => Base.put(`/notification/${id}`, data);
export const createTeam = async(data) => Base.post('/team/create', data);
export const updateTeam = (id, data) => Base.put(`/team/${id}`, data);
export const getTeamById = (id) => Base.get(`/team/${id}`);
export const deleteTeamById = (id) => Base.delete(`/team/${id}`);
export const getTeamByCategoryAndId = (id, category) => Base.get(`/team/get/${id}/${category}`);
export const getTeamsByCategory = (category, page, search) => Base.get(`/team/get/category`, {params: {page: page, category: category, search: search}});
export const getPaymentIntent = (data) => Base.post('/payment/create/paymentintent', data);
export const startFinancialConnect = (data) => Base.post('/payment/start/financialconnection', data);
export const addBank = (data) => Base.post('/payment/addbank', data);
export const sendPayment = (data) => Base.post('/payment/send/payment', data);
export const createConversation = (data) => Base.post('/api/conversations/', data);
export const getConversationById = (id) => Base.get(`/api/conversations/getbyid/${id}`);
export const createStripeAccount = (data) => Base.post('/payment/stripe/create/account', data);
export const getAccountLink = (data) => Base.post('/payment/stripe/account/link', data)
export const createCheckoutSession = (data) => Base.post('/payment/create-checkout-session', data);
export const getStripeAccountById = (id) => Base.get(`/payment/account/${id}`);
export const getReviewsByTeamId = (id) => Base.get(`/review/team/${id}`);
export const getTeamsCountByUserId = (id) => Base.get(`/team/count/user/${id}`);