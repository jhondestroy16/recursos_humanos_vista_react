import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AgregarEmpleado() {
    let navegacion = useNavigate();

    const [departamentos, setDepartamentos] = useState([]);
    const [empleado, setEmpleado] = useState({
        nombre: '',
        departamento: {
            id: '',
            nombre: '' // Puedes agregar m�s campos si los necesitas
        },
        salario: '',
    });

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');

    const { nombre, departamento, salario } = empleado;

    const onInputChange = (e) => {
        if (e.target.name === 'departamento') {
            const selectedDepartamento = departamentos.find(dept => dept.id === parseInt(e.target.value));
            setEmpleado({
                ...empleado,
                departamento: selectedDepartamento || { id: '', nombre: '' }, // Aseg�rate de que est� definido
            });
        } else {
            setEmpleado({ ...empleado, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        const fetchDepartamentos = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/rh-app/departamentos');
                setDepartamentos(response.data);
                setCargando(false);
            } catch (err) {
                setError('Error al cargar los departamentos', err);
                setCargando(false);
            }
        };

        fetchDepartamentos();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !departamento.id || !salario) {
            Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
            return;
        }
        if (isNaN(salario)) {
            Swal.fire('Error', 'El salario debe ser un n�mero v�lido.', 'error');
            return;
        }

        try {
            const result = await Swal.fire({
                title: '�Est�s seguro?',
                text: '�Desea agregar un empleado?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'S�',
                cancelButtonText: 'No'
            });

            if (result.isConfirmed) {
                setCargando(true);
                await axios.post("http://127.0.0.1:8080/rh-app/empleados/save", empleado);
                Swal.fire('��xito!', 'Se agreg� el empleado correctamente.', 'success');
                navegacion('/empleados');
            }
        } catch (err) {
            console.error(err);
            setError('Hubo un problema al agregar el empleado.');
            Swal.fire('Error', 'No se pudo agregar el empleado.', 'error');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="container">
            <div className="text-center mb-4">
                <h2>Agregar Empleados</h2>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={nombre}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="departamento" className="form-label">Departamento:</label>
                    <select
                        className="form-control"
                        id="departamento"
                        name="departamento"
                        value={departamento.id}
                        onChange={onInputChange}
                        required>
                        <option value="">Seleccione un departamento</option>
                        {departamentos.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="salario" className="form-label">Sueldo:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="salario"
                        name="salario"
                        value={salario}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-warning btn-sm me-3" disabled={cargando}>
                        {cargando ? 'Agregando...' : 'Agregar'}
                    </button>
                    <a href="/" className="btn btn-info btn-sm">Volver</a>
                </div>
            </form>
        </div>
    );
}
