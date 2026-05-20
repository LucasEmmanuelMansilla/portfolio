# Logos de tecnologías destacadas

Coloca aquí los archivos SVG referenciados en `app/data/featured-tech.ts`.

## Cómo reemplazar un logo

1. Exporta o descarga el SVG oficial de la marca (Simple Icons, devicons, etc.).
2. Renómbralo exactamente como indica `logoFile` en `featured-tech.ts` (ej: `react-native.svg`).
3. Recomendaciones:
   - `viewBox` cuadrado (ej: `0 0 24 24` o `0 0 48 48`)
   - Sin dimensiones fijas en px, o usa `width="100%" height="100%"`
   - Para fondo oscuro del portfolio, preferí versiones claras/monocromáticas

## Agregar una tecnología nueva

1. Añade el SVG en esta carpeta.
2. Agrega un objeto en el array `featuredTechnologies` en `app/data/featured-tech.ts`:

```ts
{
  id: "expo",
  name: "Expo",
  logoFile: "expo.svg",
  category: "Mobile",
}
```

## Archivos esperados (por defecto)

- react-native.svg
- typescript.svg
- react.svg
- nextjs.svg
- nodejs.svg
- redux.svg
- zustand.svg
- tanstack-query.svg
- firebase.svg
- mongodb.svg
- postgresql.svg
- git.svg
