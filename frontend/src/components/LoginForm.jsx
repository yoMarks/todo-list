import { useState } from "react";

function LoginForm({ onLogin, onChangeMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Correo y contraseña son obligatorios");
      return;
    }

    await onLogin(email, password);
  }

  return (
    <section className="form-section auth-section">
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Entrar</button>
      </form>

      <p>
        ¿No tienes cuenta?{" "}
        <button type="button" className="link-button" onClick={onChangeMode}>
          Registrarse
        </button>
      </p>
    </section>
  );
}

export default LoginForm;