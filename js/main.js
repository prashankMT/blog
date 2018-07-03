import { init } from "./handlers";
import loadPolyfills from "./utils/polyfills";
import { GLOBAL_ERROR_MESSAGE } from "./config/env.config";

const bootstrap = async () => {
  try {
    await loadPolyfills();
    init();
  } catch (error) {
    throw new Error(GLOBAL_ERROR_MESSAGE);
  }
};

bootstrap();
