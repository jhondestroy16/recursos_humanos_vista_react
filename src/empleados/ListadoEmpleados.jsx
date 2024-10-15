import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
export default function ListadoEmpleados() {
    const [empleados, setEmpleados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/rh-app/empleados');
                setEmpleados(response.data);
                setCargando(false);
            } catch (err) {
                setError('Error al cargar los empleados',err);
                setCargando(false);
            }
        };

        fetchEmpleados();
    }, []);

    if (cargando) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    const toggleEstado = async (id) => {
        try {
            const empleado = empleados.find(emp => emp.id === id);
            const nuevoEstado = !empleado.estado; // Invertimos el estado

            // Confirma la acción antes de continuar
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: `¿Deseas ${nuevoEstado ? 'activar' : 'desactivar'} a ${empleado.nombre}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            });

            if (result.isConfirmed) {
                // Llama al nuevo endpoint
                await axios.put(`http://127.0.0.1:8080/rh-app/empleados/estado/${id}/${nuevoEstado}`);
                setEmpleados(empleados.map(emp => (emp.id === id ? { ...emp, estado: nuevoEstado } : emp)));

                // Muestra un mensaje de éxito
                Swal.fire(
                    '¡Éxito!',
                    `El empleado ${empleado.nombre} ha sido ${nuevoEstado ? 'activado' : 'desactivado'}.`,
                    'success'
                );
            }
        } catch (err) {
            setError('Error al actualizar el estado del empleado',err);
            Swal.fire(
                'Error',
                'No se pudo actualizar el estado del empleado.',
                'error'
            );
        }
    };


    return (
        <div className="container">
            <h1 className="text-center">Listado de Empleados</h1>
            <table className="table table-striped table-hover align-middle">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Departamento</th>
                        <th className="text-center">Salario</th>
                        <th className="text-center">Estado</th>
                        <th className="text-center">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado, indice) => (
                        <tr key={indice}>
                            <td className="text-center">{empleado.id}</td>
                            <td className="text-center">{empleado.nombre}</td>
                            <td className="text-center">{empleado.nombreDepartamento}</td>
                            <td className="text-center">{empleado.salario.toLocaleString('es-CO')}</td>
                            <td className="text-center">{empleado.estado ? 'Activo' : 'Inactivo'}</td>
                            <div className="text-center">
                                <button
                                    className={`btn ${empleado.estado ? 'btn-danger' : 'btn-success'} me-2`}
                                    onClick={() => toggleEstado(empleado.id)}>
                                    {empleado.estado ? 'Desactivar' : 'Activar'}
                                </button>
                                <Link className="btn btn-info" to={`/empleados/editar/${empleado.id}`}>Editar</Link>
                            </div>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
