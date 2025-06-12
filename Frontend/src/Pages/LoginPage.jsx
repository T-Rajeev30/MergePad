import React from "react";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f6fa",
  },
  form: {
    background: "#fff",
    padding: "2rem 2.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    minWidth: "320px",
    gap: "1.2rem",
  },
  input: {
    padding: "0.75rem",
    border: "1px solid #dcdde1",
    borderRadius: "4px",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "0.75rem",
    background: "#4078c0",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  title: {
    marginBottom: "0.5rem",
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#222f3e",
    textAlign: "center",
  },
};

const LoginPage = () => {
  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <div style={styles.title}>Login</div>
        <input style={styles.input} type="email" placeholder="Email" required />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          required
        />
        <button style={styles.button} type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
