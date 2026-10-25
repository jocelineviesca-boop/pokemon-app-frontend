import { useState } from "react";
import "./Login.css";

function Login({
  onLogin,
  onSwitchToRegister,
  onClose,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");

  function validateEmail(value) {
    if (!value.trim()) {
      return "El correo electrónico es obligatorio";
    }

    if (!value.includes("@")) {
      return "Introduce un correo electrónico válido";
    }

    return "";
  }

  function validatePassword(value) {
    if (!value.trim()) {
      return "La contraseña es obligatoria";
    }

    return "";
  }

  function handleEmailChange(event) {
    const value = event.target.value;

    setEmail(value);
    setEmailError(validateEmail(value));
  }

  function handlePasswordChange(event) {
    const value = event.target.value;

    setPassword(value);
    setPasswordError(validatePassword(value));
  }

  const isFormValid =
    email.trim() &&
    password.trim() &&
    !validateEmail(email) &&
    !validatePassword(password);

  function handleSubmit(event) {
    event.preventDefault();

    const currentEmailError =
      validateEmail(email);

    const currentPasswordError =
      validatePassword(password);

    setEmailError(currentEmailError);
    setPasswordError(currentPasswordError);

    if (
      currentEmailError ||
      currentPasswordError
    ) {
      return;
    }

    setError("");

    onLogin({
      email,
      password,
    }).catch((apiError) => {
      setError(
        apiError.message ||
          "No se pudo iniciar sesión"
      );
    });
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="login"
      onMouseDown={handleOverlayClick}
    >
      <form
        className="login__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <button
          className="login__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        <h2 className="login__title">
          Iniciar sesión
        </h2>

        <label className="login__label">
          Correo electrónico

          <input
            className="login__input"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          {emailError && (
            <span className="login__field-error">
              {emailError}
            </span>
          )}
        </label>

        <label className="login__label">
          Contraseña

          <input
            className="login__input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          {passwordError && (
            <span className="login__field-error">
              {passwordError}
            </span>
          )}
        </label>

        {error && (
          <p className="login__error">
            {error}
          </p>
        )}

        <button
          className="login__button"
          type="submit"
          disabled={!isFormValid}
        >
          Iniciar sesión
        </button>

        <button
          className="login__switch"
          type="button"
          onClick={onSwitchToRegister}
        >
          ¿No tienes cuenta? Regístrate
        </button>
      </form>
    </div>
  );
}

export default Login;