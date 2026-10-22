// Renders `backtick` spans as inline code.
export default function Text({ children }: { children: string }) {
  return children.split("`").map((part, i) =>
    i % 2 ? (
      <code key={i} className="bg-[color-mix(in_srgb,currentColor_14%,transparent)] px-1.5 py-0.5 font-mono text-[0.88em]">
        {part}
      </code>
    ) : (
      part
    ),
  );
}
