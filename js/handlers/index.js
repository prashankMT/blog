import BlogService from "../services/blogService";
import {
  createBlogListView,
  createBlogDetailView,
  createBlogModalView,
  createLoadingView
} from "../views";
import { GLOBAL_ERROR_MESSAGE } from "../config/env.config";
import { SELECTORS, CLASSES } from "../config/constants";
import { reload } from "../utils";

async function onCreate() {
  const title = $(SELECTORS.MODAL)
    .find(SELECTORS.TITLE)
    .val();
  const content = $(SELECTORS.MODAL)
    .find(SELECTORS.BODY)
    .val();
  const id = $(this).data("id");
  const data = { title, content, id };

  await BlogService.create(data);

  closeCreateModal();
  await renderList();
}

async function onDelete() {
  const id = $(this).data("delete");
  await BlogService.remove(id);
  await renderList();
  selectFirstBlog();
}

async function onEdit(data = {}) {
  BlogService.update(data);
}

async function onBlogSelect() {
  const el = $(SELECTORS.DETAILS_SECTION);
  el.html(createLoadingView());

  markSelected.call(this);

  const id = $(this).data("id");
  try {
    const data = await BlogService.get(id);
    el.html(createBlogDetailView(data[0] || {}));
  } catch (error) {
    el.html(GLOBAL_ERROR_MESSAGE);
  }
}

async function renderList() {
  const el = $(SELECTORS.BLOG_LIST);
  el.html(createLoadingView());
  try {
    const blogs = await BlogService.get();
    el.html(createBlogListView(blogs));
    selectFirstBlog();
  } catch (error) {
    // reload("/500.html");
  }
}

function selectFirstBlog() {
  onBlogSelect.call($(SELECTORS.BLOG_LIST_ITEM).get(0));
}

async function openCreateModal() {
  const id = $(this).data("edit");
  let data = {};
  if (id) {
    data = await BlogService.get(id);
    data = data[0];
  }
  $(SELECTORS.MODAL_CONTENT).html(createBlogModalView(data));
  $(SELECTORS.MODAL).modal("show");
}

function closeCreateModal() {
  $(SELECTORS.MODAL).modal("hide");
}

function markSelected() {
  $(SELECTORS.BLOG_LIST_ITEM).removeClass(CLASSES.SELECTED);
  $(this).addClass(CLASSES.SELECTED);
}

const attachHandlers = () => {
  $(SELECTORS.BLOG_LIST).on("click", SELECTORS.BLOG_LIST_ITEM, onBlogSelect);
  $(SELECTORS.CREATE_BLOG).on("click", openCreateModal);
  $(SELECTORS.DELETE_ALL).on("click", onDelete);
  $(SELECTORS.MODAL).on("click", SELECTORS.POST, onCreate);
  $(SELECTORS.DETAILS_SECTION).on("click", SELECTORS.DELETE, onDelete);
  $(SELECTORS.DETAILS_SECTION).on(
    "click",
    SELECTORS.EDIT_BLOG,
    openCreateModal
  );
};

export const init = () => {
  $(document).ready(() => {
    renderList();
    attachHandlers();
  });
};
