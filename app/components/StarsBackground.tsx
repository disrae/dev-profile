export function StarsBackground() {
  return (
    <div aria-hidden className="space-stars pointer-events-none">
      <div className="space-star-layer star-layer-one" />
      <div className="space-star-layer star-layer-two" />
      <div className="space-star-layer star-layer-three" />
      <div className="space-glow-layer" />
      <div className="space-vignette-layer" />
    </div>
  );
}
