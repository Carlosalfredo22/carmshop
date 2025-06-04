import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../style/StyleHomepage.css";

import logo from "../assets/CarmabeShop.jpg";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";

import falda1 from "../assets/falda 1.jpg";
import vestido from "../assets/vestido.jpg";
import faldashort from "../assets/falda short.jpg";
import pantalon1 from "../assets/pantalon 1.jpg";

const App = () => {
  const carouselImages = [img1, img2, img3];

  const galleryImages = [
    {
      img: falda1,
      descripcion: "falda celeste de paletones,fresca y comoda.",
    },
    {
      img: faldashort,
      descripcion: "falda short linda comoda y elegante.",
    },
    {
      img: vestido,
      descripcion: "vestido elegante color negro,ideal para reuniones.",
    },
    {
      img: pantalon1,
      descripcion: "lindo pantalon jeans acampanado, se ajusta muy bien a tu figura.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [descripcionVisible, setDescripcionVisible] = useState(
    Array(galleryImages.length).fill(false)
  );

  const toggleDescripcion = (index) => {
    const nuevasVisibles = [...descripcionVisible];
    nuevasVisibles[index] = !nuevasVisibles[index];
    setDescripcionVisible(nuevasVisibles);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img
            src={logo}
            alt="Logo de empresa"
            className="logo"
            style={{ height: "50px" }}
          />
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarContenido"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
            id="navbarContenido"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#informacion" onClick={() => setMenuOpen(false)}>
                  Información
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#noticias" onClick={() => setMenuOpen(false)}>
                  Noticias
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#sobrenosotros" onClick={() => setMenuOpen(false)}>
                  Sobre Nosotros
                </a>
              </li>
            </ul>

            <form className="d-flex me-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar"
                aria-label="Buscar"
              />
              <button className="btn btn-outline-primary" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>

            <a href="/login" className="btn btn-outline-primary">
              <i className="bi bi-person"></i>
            </a>
          </div>
        </div>
      </nav>

      {/* Carrusel */}
      <section className="carousel my-4">
        <div
          className="carousel-container position-relative overflow-hidden"
          style={{ height: "400px" }}
        >
          {carouselImages.map((img, i) => (
            <div
              key={i}
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                opacity: i === currentSlide ? 1 : 0,
                transition: "opacity 1s ease",
                zIndex: i === currentSlide ? 10 : 0,
              }}
            >
              <img
                src={img}
                alt={`Imagen carrusel ${i + 1}`}
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Información */}
      <section className="article container mb-3" id="informacion">
        <h2 className="title-article mb-2">Información</h2>
        <p className="paragraph-article mb-3">
          En Carmabeshop ofrecemos una selección cuidadosamente seleccionada de ropa para mujer y
          hombre, con diseños modernos, cómodos y accesibles. Entre nuestros productos encontrarás:
          <br />
          Blusas, camisetas y tops de temporada
          <br />
          Pantalones, jeans, shorts y faldas
        </p>
        <div className="galery row g-3">
          {galleryImages.map((item, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div className="box-galery card h-100">
                <div className="box-img">
                  <img
                    src={item.img}
                    alt={`Camisa modelo ${i + 1}`}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                </div>
                <div className="card-body text-center">
                  <button
                    className="btn btn-img"
                    style={{
                        backgroundColor: "#ff69b4",
                        color: "#fff",
                         borderRadius: "20px",
                         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                         border: "none",
                         transition: "background-color 0.3s ease",
                   }}
                   onMouseOver={(e) => (e.target.style.backgroundColor = "#00b0e0")}
                   onMouseOut={(e) => (e.target.style.backgroundColor = "#00cfff")}
                   onClick={() => toggleDescripcion(i)}
                  >
                   {descripcionVisible[i] ? "Ocultar" : "Descripción"}
                  </button>

                  {descripcionVisible[i] && (
                    <p className="mt-2 text-muted" style={{ fontSize: "14px" }}>
                      {item.descripcion}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Noticias */}
      <section className="article container mb-3" id="noticias">
        <h2 className="title-article mb-2">Noticias</h2>
        <p className="paragraph-article">
          ¡Nueva Colección "Vibra de Verano 2025"!<br />
          Prepárate para lucir increíble con nuestra nueva línea llena de colores vibrantes, telas
          frescas y diseños exclusivos que marcan tendencia. Además, por lanzamiento, disfruta de
          envío gratis en pedidos superiores a $30 y participa automáticamente en el sorteo de una
          gift card de $50.
          <br />
          ¡Carmabeshop sigue creciendo contigo y para ti!
        </p>
      </section>

      {/* Sobre Nosotros */}
      <section className="article container mb-3" id="sobrenosotros">
        <h2 className="title-article mb-2">Sobre Nosotros</h2>
        <p className="paragraph-article">
          En Carmabeshop nos apasiona ofrecer moda de calidad con estilo único desde 2020. Cada
          prenda está pensada para resaltar tu personalidad y comodidad. Nuestro compromiso no
          termina con la venta, comienza con tu satisfacción. Valoramos profundamente a cada
          cliente, porque son el corazón de nuestra tienda. Gracias por confiar en nosotros y ser
          parte de esta comunidad con estilo.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white text-center py-4">
        <div className="footer-content container">
          <p className="mb-1">&copy; 2025 Carmabe Shop. Todos los derechos reservados.</p>
          <p className="mb-1">Contacto: contacto@carmabeshop.com | Tel: +54 11 1234-5678</p>
          <p>Desarrollado con ❤️ por el equipo de Carmabe</p>
        </div>
      </footer>
    </>
  );
};

export default App;
