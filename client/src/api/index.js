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
export const getJobs = () => Base.get("/Job/") 
export const createJob=(data)=>Base.post(`/Job/create/`, data)
export const getYourJobs = ()=>Base.get("/Job/yourJob") //being map
export const updateYourJobs = (id, data)=>Base.put(`/Job/updateJob/${id}`, data) //being updated
export const deleteYourJobs = (id)=>Base.delete(`/Job/delete/${id}`) //being deleted
export const updateProfile=(id, data)=>Base.put(`/api/profile/${id}`,data)//being updated

export const getConversation=(id)=>Base.get(`/api/conversations/${id}`)  //done
export const getMessage=(id)=>Base.get(`/api/messages/${id}`)//done
export const AddMessages=(data)=>Base.post("/api/messages", data)
export const getFriednsConversation=(senderId,receiverId)=>Base.get(`/api/conversations/find/${senderId}/${receiverId}`) //chat online
export const addBid = (data) => Base.post('/bid/addnew', data);
export const getBidsById = (id) => Base.get(`/bid/getbyid/${id}`);
export const createOrder = (data) =>  Base.post('/order/create', data);
export const getOrderById = (id) => Base.get(`/order/${id}`);
export const addDelivery = (id, data) => Base.post(`/order/${id}/delivery/add`, data);
export const getDeliveriesByOrderId = (id) => Base.get(`/order/${id}/deliveries`);
export const getActivitiesByOrderId = (id) => Base.get(`/orderactivity/${id}`);
export const getDeliveryById = (id) => Base.get(`order/delivery/${id}`);
export const updateOrder = (id, data) => Base.post(`/order/${id}/update`, data);
export const createReview  = (id, data) => Base.post(`/review/create/order/${id}`, data);
export const getReviewsByUserId = (id) => Base.get(`/review//user/${id}`);
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

