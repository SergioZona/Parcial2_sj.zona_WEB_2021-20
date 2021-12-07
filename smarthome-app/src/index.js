import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { IntlProvider } from "react-intl";
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

// Implementación de internacionalización cuando se actualiza la página.
let lang = navigator.language || navigator.userLanguage;
let messages = "";
if(lang ==="en"){
  messages = localeEnMessages;
}
else if(lang ==="es" || lang ==="es-ES" || lang ==="es-419" ){
  messages = localeEsMessages;
}

// Renderizado de la aplicación principal.
ReactDOM.render(
  <IntlProvider locale={lang} messages= {messages}>
    <App />
  </IntlProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
