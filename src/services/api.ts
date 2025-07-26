const API_BASE_URL = 'http://10.106.145.162:3001/api';

let token: string | null = null;

function loadToken() {
  const auth: any = localStorage.getItem('authToken');
  try {
    const parsed = JSON.parse(auth);
    token = parsed?.token ?? null;
  } catch {
    token = auth ?? null;
  }
}

function saveToken(newToken: string) {
  token = newToken;
  localStorage.setItem('authToken', JSON.stringify({ token: newToken }));
}

function clearToken() {
  token = null;
  localStorage.removeItem('authToken');
}

async function request(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Auth methods
async function login(email: string, password: string) {
  const response = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (response.token) {
    saveToken(response.token);
  }

  return response;
}

async function verifyToken() {
  if (!token) throw new Error('No token available');
  return await request('/auth/verify', { method: 'POST' });
}

function logout() {
  clearToken();
}

// Product methods
async function getProducts(params?: {
  category?: string;
  search?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const queryParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });
  }

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/products?${queryString}` : '/products';

  return await request(endpoint);
}

async function getProduct(id: string) {
  const auth: any = localStorage.getItem('authToken');
  try {
    const parsed = JSON.parse(auth);
    token = parsed?.token ?? null;
  } catch {
    token = auth ?? null;
  }
  return await request(`/admin/product/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method:"GET"
  });
}

async function getCategories() {
  return await request('/categories');
}

// Admin methods
async function createProduct(productData: FormData) {
  const auth: any = localStorage.getItem('authToken');
  try {
    const parsed = JSON.parse(auth);
    token = parsed?.token ?? null;
  } catch {
    token = auth ?? null;
  }
  return await request('/admin/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: productData,
  });
}

async function updateProduct(id: string, productData: FormData) {
  const auth: any = localStorage.getItem('authToken');
  try {
    const parsed = JSON.parse(auth);
    token = parsed?.token ?? null;
  } catch {
    token = auth ?? null;
  }
  return await request(`/admin/product/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: productData,
  });
}

async function deleteProduct(id: string) {
  const auth: any = localStorage.getItem('authToken');
  try {
    const parsed = JSON.parse(auth);
    token = parsed?.token ?? null;
  } catch {
    token = auth ?? null;
  }
  return await request(`/admin/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
  });
}

async function getAdminStats() {
  return await request('/admin/stats');
}

loadToken();

export const apiService = {
  login,
  verifyToken,
  logout,
  getProducts,
  getProduct,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminStats,
};