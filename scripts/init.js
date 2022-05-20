import { startHandler } from "./pages/startPage.js";

// -------------------------------------------------------------------------------

//Starts the program
if (  (typeof window.orientation !== "undefined") || ( navigator.userAgent.indexOf('IEMobile') !== -1 )  ) {
    app.renderer.resize(800, 800);
}
startHandler();