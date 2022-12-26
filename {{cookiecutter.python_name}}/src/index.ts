import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";{% if cookiecutter.kind.lower() == "theme" %}

import { IThemeManager } from "@jupyterlab/apputils";{% endif %}{% if cookiecutter.has_settings.lower().startswith("y") %}

import { ISettingRegistry } from "@jupyterlab/settingregistry";{% endif %}{% if cookiecutter.kind.lower() == "server" %}

import { requestAPI } from "./handler";{% endif %}

import { WidgetTracker } from "@jupyterlab/apputils";

import { ILauncher } from "@jupyterlab/launcher";

import { WebDSService, WebDSWidget } from "@webds/service";

import { defaultIcon } from "./icons";

import {{ cookiecutter.camel }}Widget from "./widget/{{ cookiecutter.camel }}Widget";

namespace Attributes {
  export const command = "{{ cookiecutter.python_name }}:open";
  export const id = "{{ cookiecutter.python_name }}_widget";
  export const label = "{{ cookiecutter.label }}";
  export const caption = "{{ cookiecutter.label }}";
  export const category = "DSDK - Applications";
  export const rank = 999;
}

export let webdsService: WebDSService;

/**
 * Initialization data for the {{ cookiecutter.labextension_name }} extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: "{{ cookiecutter.labextension_name }}:plugin",
  autoStart: true,
  requires: [ILauncher, ILayoutRestorer, {% if cookiecutter.kind.lower() == 'theme' %}IThemeManager, {% endif %}WebDSService],{% if cookiecutter.has_settings.lower().startswith('y') %}
  optional: [ISettingRegistry],{% endif %}
  activate: (
    app: JupyterFrontEnd,
    launcher: ILauncher,{% if cookiecutter.kind.lower() == 'theme' %}
    manager: IThemeManager,{% endif %}
    restorer: ILayoutRestorer,
    service: WebDSService{% if cookiecutter.has_settings.lower().startswith('y') %},
    settingRegistry: ISettingRegistry | null{% endif %}
  ) => {
    console.log("JupyterLab extension {{ cookiecutter.labextension_name }} is activated!");{% if cookiecutter.kind.lower() == 'theme' %}
    const style = '{{ cookiecutter.labextension_name }}/index.css';

    webdsService = service;

    manager.register({
      name: '{{ cookiecutter.labextension_name }}',
      isLight: true,
      load: () => manager.loadCSS(style),
      unload: () => Promise.resolve(undefined)
    });{% endif %}{% if cookiecutter.has_settings.lower().startswith('y') %}

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('{{ cookiecutter.labextension_name }} settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for {{ cookiecutter.labextension_name }}.', reason);
        });
    }{% endif %}{% if cookiecutter.kind.lower() == 'server' %}

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The {{ cookiecutter.python_name }} server extension appears to be missing.\n${reason}`
        );
      });{% endif %}

    let widget: WebDSWidget;
    const { commands, shell } = app;
    const command = Attributes.command;
    commands.addCommand(command, {
      label: Attributes.label,
      caption: Attributes.caption,
      icon: (args: { [x: string]: any }) => {
        return args["isLauncher"] ? defaultIcon : undefined;
      },
      execute: () => {
        if (!widget || widget.isDisposed) {
          const content = new {{ cookiecutter.camel }}Widget(Attributes.id);
          widget = new WebDSWidget<{{ cookiecutter.camel }}Widget>({ content });
          widget.id = Attributes.id;
          widget.title.label = Attributes.label;
          widget.title.icon = defaultIcon;
          widget.title.closable = true;
        }

        if (!tracker.has(widget)) tracker.add(widget);

        if (!widget.isAttached) shell.add(widget, "main");

        shell.activateById(widget.id);
      }
    });

    launcher.add({
      command,
      args: { isLauncher: true },
      category: Attributes.category,
      rank: Attributes.rank
    });

    let tracker = new WidgetTracker<WebDSWidget>({
      namespace: Attributes.id
    });
    restorer.restore(tracker, {
      command,
      name: () => Attributes.id
    });
  }
};

export default plugin;
