import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../Inicio.css'; // Asegúrate de crear este archivo CSS para personalizar estilos si es necesario

function Inicio() {
    return (
        <div className="inicio">
            <header className="text-center bg-info text-white p-5 mt-4">
                <h1>Bienvenido a Talento Humano</h1>
                <p>Gestión eficiente de recursos humanos para tu empresa</p>
                <Button variant="light" size="lg">Comenzar</Button>
            </header>

            <Container className="my-5">
                <h2 className="text-center mb-4">Nuestros Servicios</h2>
                <Row>
                    <Col md={4} className="text-center mb-4">
                        <div className="service-box">
                            <h3>Reclutamiento</h3>
                            <p>Encuentra el talento adecuado para tu organización con nuestro servicio de reclutamiento.</p>
                        </div>
                    </Col>
                    <Col md={4} className="text-center mb-4">
                        <div className="service-box">
                            <h3>Gestión de Talento</h3>
                            <p>Desarrolla y retén el talento de tus empleados con nuestras estrategias de gestión de talento.</p>
                        </div>
                    </Col>
                    <Col md={4} className="text-center mb-4">
                        <div className="service-box">
                            <h3>Capacitación</h3>
                            <p>Ofrecemos programas de capacitación para mejorar las habilidades de tu equipo.</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <footer className="text-center bg-light py-4">
                <p>© 2024 Talento Humano. Todos los derechos reservados.</p>
                <p>
                    <a href="/contacto">Contacto</a> | <a href="/politicas">Políticas de Privacidad</a>
                </p>
            </footer>
        </div>
    );
}

export default Inicio;
