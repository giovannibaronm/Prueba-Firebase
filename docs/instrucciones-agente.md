# Instrucciones para agentes

Antes de trabajar en este repositorio, leer:

```text
docs/contexto-proyecto.md
```

Usar ese archivo como memoria persistente del proyecto.

Cuando se haga un cambio relevante, actualizar `docs/contexto-proyecto.md` para que una futura sesion pueda retomar el trabajo sin depender del historial del chat.

No guardar secretos en el repositorio. En especial:

- `AZDO_TOKEN`
- credenciales Firebase
- service accounts
- tokens personales

Preferir variables runtime del proveedor o Secret Manager para credenciales.
