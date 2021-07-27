import { api } from "src/api/axios";

// ---- Articles
export const getArticleList = async (filter = "") => {
  const { data } = await api.get(`/api/v1/admin/articles${filter}`);
  return data;
};

export const getArticle = async (articleId: string | undefined) => {
  const { data } = await api.get(`/api/v1/admin/articles/${articleId}`);
  return data;
};

export const editArticle = async (payload: any, articleId: string) => {
  const { data } = await api.patch(`/api/v1/admin/articles/${articleId}`, payload);
  return data;
};

export const updateArticle = async (payload: any, articleId: number) => {
  const { data } = await api.put(`/api/v1/admin/articles/${articleId}`, payload);
  return data;
};

export const deleteArticle = async (articleId: string) => {
  const { data } = await api.delete(`/api/v1/admin/articles/${articleId}`);
  return data;
};

export const createArticle = async (payload: any) => {
  const { data } = await api.post(`/api/v1/admin/articles`, payload);
  return data;
};
