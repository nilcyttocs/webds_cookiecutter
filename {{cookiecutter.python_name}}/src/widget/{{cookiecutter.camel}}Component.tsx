import React, { useEffect, useState } from "react";

import Alert from "@mui/material/Alert";

import CircularProgress from "@mui/material/CircularProgress";

import { ThemeProvider } from "@mui/material/styles";

import Landing from "./Landing";

export const {{ cookiecutter.camel }}Component = (props: any): JSX.Element => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [alert, setAlert] = useState<string | undefined>(undefined);

  useEffect(() => {
    const initialize = async () => {
      setInitialized(true);
    };
    initialize();
  }, []);

  const webdsTheme = props.service.ui.getWebDSTheme();

  return (
    <ThemeProvider theme={webdsTheme}>
      <div className="jp-webds-widget-body">
        {alert !== undefined && (
          <Alert
            severity="error"
            onClose={() => setAlert(undefined)}
            sx={% raw %}{{ whiteSpace: "pre-wrap" }}{% endraw %}
          >
            {alert}
          </Alert>
        )}
        {initialized && <Landing setAlert={setAlert} />}
      </div>
      {!initialized && (
        <div
          style={% raw %}{{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}{% endraw %}
        >
          <CircularProgress color="primary" />
        </div>
      )}
    </ThemeProvider>
  );
};

export default {{ cookiecutter.camel }}Component;
