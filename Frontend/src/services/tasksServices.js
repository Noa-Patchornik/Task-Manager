import api from "./api";


export async function getAllTasks() {
  const res = await api.get(`/tasks`);
  return res.data;
}

export async function addTask(task) {
  const res = await api.post(`/tasks`, task);
  return res.data;
}

export async function updateTask(id, updates) {
  const res = await api.put(`/tasks/${id}`, updates);
  return res.data;
}

export async function deleteTask(id) {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
}
