import React from "react";

import Typography from "@mui/material/Typography";

import { Canvas } from "./mui_extensions/Canvas";
import { Content } from "./mui_extensions/Content";
import { Controls } from "./mui_extensions/Controls";

export const Landing = (props: any): JSX.Element => {
  return (
    <Canvas title="{{ cookiecutter.label }}">
      <Content
        sx={% raw %}{{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}{% endraw %}
      >
        <Typography variant="h1">Content</Typography>
      </Content>
      <Controls
        sx={% raw %}{{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}{% endraw %}
      >
        <Typography variant="h3">Controls</Typography>
      </Controls>
    </Canvas>
  );
};

export default Landing;
