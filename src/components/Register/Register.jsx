import { useState } from "react";
import "./Register.css";

function Register({
  onRegister,
  onSwitchToLogin,
  onClose,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

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

  function validateName(value) {
    if (!value.trim()) {
      return "El nombre es obligatorio";
    }

    if (value.trim().length < 2) {
      return "El nombre debe tener al menos 2 caracteres";
    }

    if (value.trim().length > 30) {
      return "El nombre no puede superar 30 caracteres";
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

  function handleNameChange(event) {
    const value = event.target.value;

    setName(value);
    setNameError(validateName(value));
  }

  const isFormValid =
    email.trim() &&
    password.trim() &&
    name.trim() &&
    !validateEmail(email) &&
    !validatePassword(password) &&
    !validateName(name);

  function handleSubmit(event) {
    event.preventDefault();

    const currentEmailError =
      validateEmail(email);

    const currentPasswordError =
      validatePassword(password);

    const currentNameError =
      validateName(name);

    setEmailError(currentEmailError);
    setPasswordError(currentPasswordError);
    setNameError(currentNameError);

    if (
      currentEmailError ||
      currentPasswordError ||
      currentNameError
    ) {
      return;
    }

    setError("");

    onRegister({
      email,
      password,
      name,
    }).catch((apiError) => {
      setError(
        apiError.message ||
          "No se pudo completar el registro"
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
      className="register"
      onMouseDown={handleOverlayClick}
    >
      <form
        className="register__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <button
          className="register__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        <h2 className="register__title">
          Registrarse
        </h2>

        <label className="register__label">
          Correo electrónico

          <input
            className="register__input"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          {emailError && (
            <span className="register__field-error">
              {emailError}
            </span>
          )}
        </label>

        <label className="register__label">
          Contraseña

          <input
            className="register__input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          {passwordError && (
            <span className="register__field-error">
              {passwordError}
            </span>
          )}
        </label>

        <label className="register__label">
          Nombre

          <input
            className="register__input"
            type="text"
            value={name}
            onChange={handleNameChange}
            minLength="2"
            maxLength="30"
            required
          />

          {nameError && (
            <span className="register__field-error">
              {nameError}
            </span>
          )}
        </label>

        {error && (
          <p className="register__error">
            {error}
          </p>
        )}

        <button
          className="register__button"
          type="submit"
          disabled={!isFormValid}
        >
          Registrarse
        </button>

        <button
          className="register__switch"
          type="button"
          onClick={onSwitchToLogin}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </form>
    </div>
  );
}

export default Register;