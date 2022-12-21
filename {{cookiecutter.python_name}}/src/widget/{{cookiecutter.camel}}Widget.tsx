import React from "react";

import { ReactWidget } from "@jupyterlab/apputils";

import { WebDSService } from "@webds/service";

import {{ cookiecutter.camel }}Component from "./{{ cookiecutter.camel }}Component";

export class {{ cookiecutter.camel }}Widget extends ReactWidget {
  id: string;
  service: WebDSService;

  constructor(id: string, service: WebDSService) {
    super();
    this.id = id;
    this.service = service;
  }

  render(): JSX.Element {
    return (
      <div id={this.id + "_component"}>
        <{{ cookiecutter.camel }}Component service={this.service} />
      </div>
    );
  }
}

export default {{ cookiecutter.camel }}Widget;
