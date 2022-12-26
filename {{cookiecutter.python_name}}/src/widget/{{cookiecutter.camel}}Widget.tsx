import React from "react";

import { ReactWidget } from "@jupyterlab/apputils";

import {{ cookiecutter.camel }}Component from "./{{ cookiecutter.camel }}Component";

export class {{ cookiecutter.camel }}Widget extends ReactWidget {
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  render(): JSX.Element {
    return (
      <div id={this.id + "_component"}>
        <{{ cookiecutter.camel }}Component />
      </div>
    );
  }
}

export default {{ cookiecutter.camel }}Widget;
