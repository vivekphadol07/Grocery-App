const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/$/, "");

const buildHeaders = (token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.message || "Something went wrong";
    throw new Error(message);
  }

  return data;
};

export const apiRequest = async (path, { method = "GET", token, body } = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: buildHeaders(token),
    body: body ? JSON.stringify(body) : undefined,
  });

  return parseResponse(response);
};

export const authApi = {
  register: (payload) =>
    apiRequest("/auth/register", { method: "POST", body: payload }),
  login: (payload) => apiRequest("/auth/login", { method: "POST", body: payload }),
  me: (token) => apiRequest("/auth/me", { token }),
  updateProfile: (payload, token) =>
    apiRequest("/auth/profile-update", { method: "PATCH", token, body: payload }),
  subscribe: (token) =>
    apiRequest("/auth/subscribe", { method: "POST", token }),
  forgotPassword: (payload) =>
    apiRequest("/auth/forgot-password", { method: "POST", body: payload }),
  resetPassword: (payload) =>
    apiRequest("/auth/reset-password", { method: "POST", body: payload }),
  verifyEmail: (payload) =>
    apiRequest("/auth/verify-email", { method: "POST", body: payload }),
  resendVerification: (payload) =>
    apiRequest("/auth/resend-verification", { method: "POST", body: payload }),
};

export const productApi = {
  list: (query = "") => apiRequest(`/products${query}`),
  byId: (id) => apiRequest(`/products/${id}`),
  create: (payload, token) =>
    apiRequest("/products", { method: "POST", token, body: payload }),
  update: (id, payload, token) =>
    apiRequest(`/products/${id}`, { method: "PUT", token, body: payload }),
  remove: (id, token) =>
    apiRequest(`/products/${id}`, { method: "DELETE", token }),
};

export const orderApi = {
  create: (payload, token) =>
    apiRequest("/orders", { method: "POST", token, body: payload }),
  mine: (token) => apiRequest("/orders/my-orders", { token }),
  list: (token) => apiRequest("/orders", { token }),
  updateStatus: (id, payload, token) =>
    apiRequest(`/orders/${id}/status`, { method: "PATCH", token, body: payload }),
  cancel: (id, token) =>
    apiRequest(`/orders/${id}/cancel`, { method: "PATCH", token }),
};

export const feedbackApi = {
  submit: (payload, token) => 
    apiRequest("/feedback", { method: "POST", token, body: payload }),
  mine: (token) => 
    apiRequest("/feedback/my", { token }),
  list: (token) => 
    apiRequest("/feedback", { token }),
  updateStatus: (id, payload, token) => 
    apiRequest(`/feedback/${id}`, { method: "PATCH", token, body: payload }),
};

export const adminApi = {
  dashboard: (token) => apiRequest("/admin/dashboard", { token }),
  createCoupon: (payload, token) => apiRequest("/coupons", { method: "POST", token, body: payload }),
  getCoupons: (token) => apiRequest("/coupons", { token }),
  toggleCoupon: (id, token) => apiRequest(`/coupons/${id}/toggle`, { method: "PATCH", token }),
};

export const couponApi = {
  validate: (payload, token) => apiRequest("/coupons/validate", { method: "POST", token, body: payload }),
  listPublic: (token) => apiRequest("/coupons/public", { token }),
};

export const uploadApi = {
  upload: (formData, token) => {
    return fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then(res => {
        if (!res.ok) return res.json().then(err => { throw new Error(err.message || "Upload failed") });
        return res.json();
    });
  }
};

export const paymentApi = {
  createOrder: (payload, token) => 
    apiRequest("/payments/create-order", { method: "POST", token, body: payload }),
  verify: (payload, token) => 
    apiRequest("/payments/verify", { method: "POST", token, body: payload }),
};

