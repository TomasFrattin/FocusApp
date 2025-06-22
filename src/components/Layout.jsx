import Header from "./Header";
import Feedback from "./Feedback";

const Layout = ({ children }) => {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Fondo con opacidad */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 z-0"
          style={{ backgroundImage: "url('/background.jpeg')" }}
        />
  
        {/* Contenido principal */}
        <div className="relative z-10">
          {children}
          <Feedback />
        </div>
      </div>
    );
  };
  
  export default Layout;
  