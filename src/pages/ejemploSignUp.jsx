import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div className="form-control">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nombres"
          {...register("Nombres", { required: true, maxLength: 80 })}
        />
        <input
          type="text"
          placeholder="Apellidos"
          {...register("Apellidos", { required: true, maxLength: 100 })}
        />
        <input
          type="text"
          placeholder="RUT"
          {...register("RUT", {
            required: true,
            maxLength: 12,
            pattern: /^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/i,
          })}
        />
        <input
          type="text"
          placeholder="Email"
          {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          {...register("Contraseña", { max: 12, min: 7 })}
        />
        <select {...register("Tipo de usuario")}>
          <option value="Alumno">Alumno</option>
          <option value="Profesor">Profesor</option>
          <option value="Apoderado">Apoderado</option>
        </select>

        <input type="submit" />
      </form>
    </div>
  );
}
