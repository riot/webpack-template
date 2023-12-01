import { register } from "riot";

const basename = (path, extension = "") =>
  path.split("/").reverse()[0].replace(extension, "");
const globalComponentsContext = import.meta.webpackContext(
  "./components/global/",
  { recursive: true, regExp: /[a-zA-Z0-9-]+\.riot/ },
);

export default () => {
  globalComponentsContext.keys().map((path) => {
    const name = basename(path, ".riot");

    const component = globalComponentsContext(path);

    register(name, component.default || component);

    return {
      name,
      component,
    };
  });
};
