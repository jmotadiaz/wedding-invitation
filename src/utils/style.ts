export const show = (
  properties?: astroHTML.JSX.CSSProperties
): astroHTML.JSX.CSSProperties =>
  ({
    ...properties,
    opacity: 1,
  } as const);

export const translate = (
  properties?: astroHTML.JSX.CSSProperties
): astroHTML.JSX.CSSProperties =>
  ({
    ...properties,
    transform: "translateY(0)",
  } as const);

export const onIntersect = (
  properties: astroHTML.JSX.CSSProperties
): { [":style"]: string } => ({
  ":style": `shown && ${JSON.stringify(properties)}`,
});
