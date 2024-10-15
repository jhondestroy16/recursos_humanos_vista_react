import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function CrearDepartamento() {
    let navegacion = useNavigate();

    const [departamento, setdepartamento] = useState({
        nombre: ''
    });

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');

    const { nombre } = departamento;

    const onInputChange = (e) => {
        setdepartamento({ ...departamento, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!nombre) {
            Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
            return;
        }
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Desea agregar un departamento?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            });

            if (result.isConfirmed) {
                setCargando(true);
                await axios.post("http://127.0.0.1:8080/rh-app/departamentos/save", departamento);
                Swal.fire('¡Éxito!', 'Se agregó el departamento correctamente.', 'success');
                navegacion('/departamentos');
            }
        } catch (err) {
            console.error(err);
            setError('Hubo un problema al agregar el departamento.');
            Swal.fire('Error', 'No se pudo agregar el departamento.', 'error');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="container">
            <div className="text-center mb-4">
                <h2>Agregar Departamentos</h2>
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
                <div className="text-center">
                    <button type="submit" className="btn btn-warning btn-sm me-3" disabled={cargando}> {cargando ? 'Agregando...' : 'Agregar'}</button>
                    <Link className="btn btn-info btn-sm" to={`/departamentos`}>Volver</Link>
                </div>
            </form>
        </div>
    );
}
