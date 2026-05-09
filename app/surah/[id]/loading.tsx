export default function SurahLoading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar skeleton */}
      <div
        style={{
          height: 60,
          background: "var(--bg-secondary)",
          borderBottom: "1px solid var(--border)",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={shimmer(120, 16)} />
        <div style={{ flex: 1 }} />
        <div style={shimmer(80, 16)} />
        <div style={shimmer(36, 36, "50%")} />
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar skeleton (desktop) */}
        <div
          style={{
            width: 260,
            background: "var(--bg-secondary)",
            borderRight: "1px solid var(--border)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
          className="hidden lg:flex"
        >
          <div style={shimmer("100%", 20)} />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={shimmer("100%", 42, 8)} />
          ))}
        </div>

        {/* Main content skeleton */}
        <main style={{ flex: 1, padding: "2rem", maxWidth: 780, margin: "0 auto", width: "100%" }}>

          {/* Surah header */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: "2rem",
              marginBottom: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div style={shimmer(160, 28)} />
            <div style={shimmer(220, 40)} />
            <div style={shimmer(100, 16)} />
          </div>

          {/* Ayah cards */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "1.5rem",
                marginBottom: "1rem",
                animation: `fadeIn 0.4s ease ${i * 0.08}s both`,
              }}
            >
              {/* Verse number + actions row */}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.2rem" }}>
                <div style={shimmer(36, 36, "50%")} />
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={shimmer(32, 32, "50%")} />
                  <div style={shimmer(32, 32, "50%")} />
                  <div style={shimmer(32, 32, "50%")} />
                </div>
              </div>
              {/* Arabic text */}
              <div style={{ direction: "rtl", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={shimmer("95%", 28)} />
                <div style={shimmer("80%", 28)} />
              </div>
              {/* Translation */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={shimmer("100%", 14)} />
                <div style={shimmer("85%", 14)} />
                <div style={shimmer("60%", 14)} />
              </div>
            </div>
          ))}
        </main>
      </div>

      <style>{`
        @keyframes shimmerAnim {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hidden { display: none; }
        @media (min-width: 1024px) { .hidden.lg\\:flex { display: flex; } }
      `}</style>
    </div>
  );
}

function shimmer(
  width: number | string,
  height: number,
  borderRadius: number | string = 6
): React.CSSProperties {
  return {
    width,
    height,
    borderRadius,
    flexShrink: 0,
    background:
      "linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-hover) 50%, var(--bg-tertiary) 75%)",
    backgroundSize: "800px 100%",
    animation: "shimmerAnim 1.4s linear infinite",
  };
}
