import { useState } from "react";

export default function CoverImg({ src, style, alt = "capa" }) {
  const [error, setError] = useState(false);

  // Garante https independente do que vier da API
  const safeSrc = src?.replace("http://", "https://") || null;

  if (!safeSrc || error) {
    return (
      <div
        style={{
          ...style,
          backgroundColor: "#E5E0EA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          borderRadius: style?.borderRadius || 0,
        }}
      >
        <span style={{ fontSize: style?.width > 80 ? "32px" : "18px" }}>📚</span>
      </div>
    );
  }

  return (
    <img
      src={safeSrc}
      alt={alt}
      style={{ ...style, objectFit: "cover", flexShrink: 0 }}
      onError={() => setError(true)}
    />
  );
}