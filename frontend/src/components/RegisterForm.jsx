import { useState } from "react";

function RegisterForm({ onRegister, onChangeMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Nombre, correo y contraseña son obligatorios");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    await onRegister(name, email, password);
  }

  return (
    <section className="form-section auth-section">
      <h1>Crear cuenta</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Registrarse</button>
      </form>

      <p>
        ¿Ya tienes cuenta?{" "}
        <button type="button" className="link-button" onClick={onChangeMode}>
          Iniciar sesión
        </button>
      </p>
    </section>
  );
}

export default RegisterForm;