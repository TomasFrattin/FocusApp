import { useState, useEffect } from "react";
import BackgroundRotator from "./BackgroundRotator";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fondo rotatorio */}
      <BackgroundRotator />

      {/* Contenido principal */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;

