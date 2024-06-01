/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container, TextField } from '@mui/material';
import { useState } from 'react';
import { LITERAL } from '../../shared/constants/literal';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../redux/slices/alert.slice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const userString = localStorage.getItem('user');
  const user = userString
    ? JSON.parse(userString)
    : {
        name: '',
        email: '',
        phone: '',
        address: '',
        lastname: '',
      };
  const [form, setForm] = useState(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { name, email, phone, lastname } = form;
    if (!name || !email || !phone || !lastname) {
      const alert = {
        type: 'error' as const,
        title: 'Error',
        description: LITERAL.errorInputs,
      };
      dispatch(showAlert(alert));
      return;
    }
    localStorage.setItem('user', JSON.stringify(form));

    const alert = {
      type: 'success' as const,
      title: user ? 'Registro exitoso' : 'Actualización exitosa',
      description: 'Tus datos han sido guardados correctamente',
    };
    dispatch(showAlert(alert));
    navigate(-1);
  };
  return (
    <Container>
      <div className='flex flex-col'>
        <h3 className='font-medium text-xl my-3'>Registro</h3>
        <hr />
      </div>
      <form
        onSubmit={handleSubmit}
        className='my-5 flex flex-col gap-y-4 w-full sm:w-2/3 justify-center items-center mx-auto'
      >
        <TextField
          name='name'
          id='name-label'
          label='Nombre'
          variant='outlined'
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className='w-full'
          helperText={form.name === '' ? 'Campo requerido' : ''}
        />
        <TextField
          name='lastname'
          id='lastname-label'
          label='Apellidos'
          variant='outlined'
          value={form.lastname}
          onChange={(e) => setForm({ ...form, lastname: e.target.value })}
          required
          className='w-full'
          helperText={form.lastname === '' ? 'Campo requerido' : ''}
        />
        <TextField
          error={!validateEmail(form.email) && form.email !== ''}
          name='email'
          id='email-label'
          label='Email'
          variant='outlined'
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className='w-full'
          helperText={
            form.email === ''
              ? 'Campo requerido'
              : !validateEmail(form.email)
              ? 'Email inválido'
              : 'Email válido'
          }
        />
        <TextField
          name='phone'
          id='phone-label'
          label='Teléfono'
          variant='outlined'
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          className='w-full'
          helperText={form.phone === '' ? 'Campo requerido' : ''}
        />

        <TextField
          name='address'
          id='address-label'
          label='Dirección'
          variant='outlined'
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className='w-full'
        />
        <Button variant='contained' type='submit' className='w-full sm:w-1/3'>
          Registrar
        </Button>
      </form>
    </Container>
  );
};

export default Profile;
