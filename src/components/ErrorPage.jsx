import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  console.log("sdnsdnvlsndv");

  const containerStyle = {
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    color: "#222",
    fontFamily:
      "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    padding: "24px",
    textAlign: "center",
  };

  const codeStyle = {
    fontSize: "clamp(48px, 10vw, 96px)",
    fontWeight: 700,
    margin: 0,
    lineHeight: 1,
  };

  const titleStyle = {
    margin: 0,
    fontSize: "clamp(18px, 2.2vw, 24px)",
    color: "#555",
  };

  const linkStyle = {
    display: "inline-block",
    marginTop: "12px",
    padding: "10px 18px",
    background: "#0066ff",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
  };

  return (
    <main style={containerStyle} role="main" aria-labelledby="notfound-heading">
      <h1 style={codeStyle}>404</h1>
      <h2 id="notfound-heading" style={titleStyle}>
        Sahifa topilmadi
      </h2>
      <p style={{ margin: 0, color: "#666" }}>
        {error.statusText || error.message}
      </p>
      <Link to="/" style={linkStyle}>
        Bosh sahifaga qaytish
      </Link>
    </main>
  );
}
