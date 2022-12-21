import { LabIcon } from "@jupyterlab/ui-components";

import defaultSvg from "../style/icons/landscape-image-svgrepo-com.svg";

export const defaultIcon = new LabIcon({
  name: "{{ cookiecutter.python_name }}_icon",
  svgstr: defaultSvg
});
