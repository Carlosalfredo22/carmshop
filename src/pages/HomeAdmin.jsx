import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <main
        className="home-content"
        style={{ padding: "2rem", textAlign: "center" }}
      >
        <h1>
          Bienvenido a tu espacio de trabajo 👋 Que tu día esté lleno de logros
          y grandes ideas.
        </h1>
        <p
          className="home-text"
          style={{ marginTop: "1rem", fontSize: "1.1rem" }}
        >
          Has iniciado sesión con éxito. Este es tu panel de administrador,
          donde encontrarás todo lo que necesitas para trabajar con eficiencia y
          marcar la diferencia. ¡Gracias por tu compromiso y dedicación diaria!
        </p>

        {/* Imagen motivacional o decorativa */}
        <img
          src="/images/admin-welcome.jpg"
          alt="Bienvenida administrador"
          style={{
            maxWidth: "100%",
            height: "auto",
            marginTop: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
