export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        fontFamily: "inherit",
      }}
    >
      {/* Animated Arabic Bismillah shimmer */}
      <div
        style={{
          fontSize: "2.4rem",
          fontFamily: "'KFGQPC Uthmanic Script', 'Scheherazade New', serif",
          direction: "rtl",
          color: "var(--gold)",
          opacity: 0,
          animation: "fadeInDown 0.7s ease forwards",
          letterSpacing: "0.04em",
          lineHeight: 2,
        }}
      >
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>

      {/* Pulsing crescent + orb */}
      <div
        style={{
          position: "relative",
          width: 80,
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid var(--gold)",
            opacity: 0.25,
            animation: "ping 1.6s cubic-bezier(0,0,0.2,1) infinite",
          }}
        />
        {/* Middle ring */}
        <div
          style={{
            position: "absolute",
            inset: 12,
            borderRadius: "50%",
            border: "2px solid var(--gold-light)",
            opacity: 0.4,
            animation: "ping 1.6s cubic-bezier(0,0,0.2,1) 0.3s infinite",
          }}
        />
        {/* Core */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
            boxShadow: "0 0 24px rgba(201,168,76,0.5)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* Loading dots */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--gold)",
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Label */}
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.85rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          animation: "fadeIn 1s ease 0.4s both",
        }}
      >
        Loading
      </p>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
