import { useState } from "react";

export default function CoverImg({ src, style, alt = "capa" }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        style={{
          ...style,
          backgroundColor: "#E5E0EA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: style?.width > 80 ? "32px" : "18px" }}>📚</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{ ...style, objectFit: "cover", flexShrink: 0 }}
      onError={() => setError(true)}
    />
  );
}
