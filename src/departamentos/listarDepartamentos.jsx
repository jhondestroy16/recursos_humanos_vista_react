import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function ListarDepartamentos() { // El nombre del componente debe iniciar en mayúscula
    const [departamentos, setDepartamentos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDepartamentos = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/rh-app/departamentos');
                setDepartamentos(response.data);
                setCargando(false);
            } catch (err) {
                setError('Error al cargar los departamentos',err);
                setCargando(false);
            }
        };

        fetchDepartamentos();
    }, []);

    if (cargando) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    const toggleEstado = async (id) => {
        try {
            const departamento = departamentos.find(dep => dep.id === id);
            const nuevoEstado = !departamento.estado; // Invertimos el estado

            // Confirma la acción antes de continuar
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: `¿Deseas ${nuevoEstado ? 'activar' : 'desactivar'} a ${departamento.nombre}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            });

            if (result.isConfirmed) {
                // Llama al nuevo endpoint
                await axios.put(`http://127.0.0.1:8080/rh-app/departamentos/estado/${id}/${nuevoEstado}`);
                setDepartamentos(departamentos.map(dep => (dep.id === id ? { ...dep, estado: nuevoEstado } : dep)));

                // Muestra un mensaje de éxito
                Swal.fire(
                    '¡Éxito!',
                    `El departamento ${departamento.nombre} ha sido ${nuevoEstado ? 'activado' : 'desactivado'}.`,
                    'success'
                );
            }
        } catch (err) {
            setError('Error al actualizar el estado del departamento');
            Swal.fire(
                'Error',
                'No se pudo actualizar el estado del departamento.',
                'error'
            );
        }
    };


    return (
        <div className="container">
            <h1 className="text-center">Listado de Departamentos</h1>
            <table className="table table-striped table-hover align-middle">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Estado</th>
                        <th className="text-center">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {departamentos.map((departamento, indice) => (
                        <tr key={indice}>
                            <td className="text-center">{departamento.id}</td>
                            <td className="text-center">{departamento.nombre}</td>
                            <td className="text-center">{departamento.estado ? 'Activo' : 'Inactivo'}</td>
                            <td className="text-center">
                                <button
                                    className={`btn ${departamento.estado ? 'btn-danger' : 'btn-success'} me-2`}
                                    onClick={() => toggleEstado(departamento.id)}>
                                    {departamento.estado ? 'Desactivar' : 'Activar'}
                                </button>
                                <Link className="btn btn-info" to={`/departamentos/editar/${departamento.id}`}>Editar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
