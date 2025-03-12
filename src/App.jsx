import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListadoEmpleados from './empleados/ListadoEmpleados';
import Inicio from './inicio/Inicio';
import Login from './login/Login';
import AgregarEmpleado from './empleados/AgregarEmpleado';
import EditarEmpleado from './empleados/EditarEmpleado';
import ListarDepartamentos from './departamentos/listarDepartamentos';
import CrearDepartamento from './departamentos/CrearDepartamento';
import EditarDepartamento from './departamentos/EditarDepartamento';
import Navegacion from './plantilla/Navegacion';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'; // Ajusta la ruta según tu estructura

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Navegacion />
                <Routes>
                    <Route exact path='/' element={<Inicio />} />
                    <Route exact path='/login' element={<Login />} />
                    {/* Rutas protegidas usando PrivateRoute */}
                    <Route
                        path='/empleados'
                        element={
                            <PrivateRoute>
                                <ListadoEmpleados />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/departamentos'
                        element={
                            <PrivateRoute>
                                <ListarDepartamentos />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/departamentos/crear'
                        element={
                            <PrivateRoute>
                                <CrearDepartamento />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/departamentos/editar/:id'
                        element={
                            <PrivateRoute>
                                <EditarDepartamento />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/empleados/agregar'
                        element={
                            <PrivateRoute>
                                <AgregarEmpleado />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path='/empleados/editar/:id'
                        element={
                            <PrivateRoute>
                                <EditarEmpleado />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
