import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListadoEmpleados from './empleados/ListadoEmpleados';
import Inicio from './inicio/Inicio';
import AgregarEmpleado from './empleados/AgregarEmpleado';
import EditarEmpleado from './empleados/EditarEmpleado';
import ListarDepartamentos from './departamentos/listarDepartamentos';
import CrearDepartamento from './departamentos/CrearDepartamento';
import EditarDepartamento from './departamentos/EditarDepartamento';
import Navegacion from './plantilla/Navegacion';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Navegacion />
                <Routes>
                    <Route exact path='/' element={<Inicio />}/>
                    <Route exact path='/empleados' element={<ListadoEmpleados/>}/>
                    <Route exact path='/departamentos' element={<ListarDepartamentos />}/>
                    <Route exact path='/departamentos/crear' element={<CrearDepartamento />} />
                    <Route exact path='/departamentos/editar/:id' element={<EditarDepartamento />} />
                    <Route exact path='/empleados/agregar' element={<AgregarEmpleado />} />
                    <Route exact path='/empleados/editar/:id' element={<EditarEmpleado />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
