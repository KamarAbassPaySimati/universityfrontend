import DB_CONFIG from '../config/database.js';

const API_BASE_URL = DB_CONFIG.apiUrl;

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Students
  getStudents() {
    return this.request('/students');
  }

  getStudent(id) {
    return this.request(`/students/${id}`);
  }

  createStudent(data) {
    return this.request('/students', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  updateStudent(id, data) {
    return this.request(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  deleteStudent(id) {
    return this.request(`/students/${id}`, {
      method: 'DELETE',
    });
  }

  // Faculty
  getFaculty() {
    return this.request('/faculty');
  }

  // Courses
  getCourses() {
    return this.request('/courses');
  }

  // Dashboard stats
  getDashboardStats() {
    return this.request('/dashboard/stats');
  }
}

export default new ApiService();