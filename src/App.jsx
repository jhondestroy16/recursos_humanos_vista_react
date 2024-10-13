import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListadoEmpleados from './empleados/ListadoEmpleados';
import AgregarEmpleado from './empleados/AgregarEmpleado';
import Navegacion from './plantilla/Navegacion';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Navegacion />
                <Routes>
                    <Route exact path='/' element={<ListadoEmpleados/>}/>
                    <Route exact path='/agregar' element={<AgregarEmpleado />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
