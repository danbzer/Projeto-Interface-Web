export default function StarRating({ rating, size = "11px" }) {
  if (!rating) return null;
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ fontSize: size, color: "#F2C94C", letterSpacing: "1px" }}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
      <span style={{ color: "#888", marginLeft: "4px", fontSize: "10px" }}>{rating}</span>
    </span>
  );
}
