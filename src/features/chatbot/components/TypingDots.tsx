export function TypingDots() {
  return (
    <span className="inline-flex gap-1 items-center" aria-label="Escribiendo">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="w-1.5 h-1.5 rounded-full animate-bounce bg-ios"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}
