import { Link } from 'react-router-dom';
export default function Navegacion() {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Sistema de recursos humanos</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Empleados</a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/empleados">Listar Empleado</Link></li>
                                    <li><Link className="dropdown-item" to="/empleados/agregar">Agregar Empleado</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Departamentos</a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/departamentos">Listar Departamentos</Link></li>
                                    <li><Link className="dropdown-item" to="/departamentos/crear">Agregar Departamentos</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}