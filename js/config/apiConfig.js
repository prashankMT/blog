import { handleQueryStringForApi } from "../utils";
let apiUrls = {
  blogOperation(id) {
    return {
      url: id ? `/api/${id}` : `/api`
    };
  }
};

export default handleQueryStringForApi(apiUrls);
