import Handlebars from "handlebars";
import listTmpl from "./list.tmpl.html";
import detailTmpl from "./details.tmpl.html";
import createTmpl from "./blog.tmpl.html";
import loaderTmpl from "./loader.tmpl.html";

export const createBlogListView = (data = []) => {
  const listView = Handlebars.compile(listTmpl);
  const html = listView({ blogs: data, isEmpty: !!data.length });
  return html;
};

export const createBlogDetailView = (data = {}) => {
  const detailView = Handlebars.compile(detailTmpl);
  return detailView(data);
};

export const createBlogModalView = (data={}) => {
  const detailView = Handlebars.compile(createTmpl);
  return detailView(data);
};

export const createLoadingView = () => {
  const loaderView = Handlebars.compile(loaderTmpl);
  return loaderView();
};
