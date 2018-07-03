import * as ApiService from "../utils/apiUtils";
import ApiConfig from "../config/apiConfig";
import * as CacheService from "./cacheService";
import QueryString from "query-string";

const BlogService = {};

const parseBlog = (data = {}) => {
  const { id, text: content, timestamp, title } = data;
  return {
    id,
    title,
    content,
    timestamp,
    postedDate: new Date(timestamp).toLocaleDateString()
  };
};

const preProcessBlog = (data = {}) => {
  const { content, title } = data;
  return {
    text: content,
    title
  };
};

const getFromCache = id => {
  const data = CacheService.get(id);
  return data;
};

BlogService.get = async id => {
  try {
    const data = getFromCache(id);
    if (data.length) return data;

    let { data: blogs } = await ApiService.get(ApiConfig.blogOperation(id));

    if (!Array.isArray(blogs)) blogs = [blogs];

    return blogs.map(blog => {
      const parsedData = parseBlog(blog);
      CacheService.set(parsedData.id, parsedData);
      return parsedData;
    });
  } catch (error) {
    console.log(error);
    throw new Error("get failed");
  }
};
BlogService.create = async (data = {}) => {
  try {
    data = await ApiService.post(ApiConfig.blogOperation(data.id), {
      body: QueryString.stringify(preProcessBlog(data)),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    CacheService.set(data.id, data);
  } catch (error) {
    console.log(error);
    throw new Error("creation failed");
  }
  return data;
};
BlogService.remove = async id => {
  try {
    await ApiService.del(ApiConfig.blogOperation(id));
    CacheService.remove(id);
    return id;
  } catch (error) {
    console.log(error);
    throw new Error("deletion failed");
  }
};

export default BlogService;
