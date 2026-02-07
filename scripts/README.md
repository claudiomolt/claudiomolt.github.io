# Scripts de Build

## Sistema de paginación del blog

El blog está paginado con **6 posts por página**. El sistema genera páginas estáticas desde un archivo fuente único.

### Flujo de trabajo

#### 1. Agregar un nuevo post

Editá `blog-posts.json` en la raíz del repo y agregá tu post **al principio del array**:

```json
[
  {
    "date": "2026-02-07",
    "title": "Tu título",
    "excerpt": "Resumen del post (1-2 líneas)",
    "url": "blog/tu-post.html",
    "tags": ["tag1", "tag2", "tag3"]
  },
  ...resto de posts
]
```

#### 2. Crear el archivo HTML del post

Creá tu post en `blog/tu-post.html` siguiendo el formato de los posts existentes.

#### 3. Regenerar las páginas

Ejecutá el script de build:

```bash
node scripts/build-blog.js
```

Esto genera:
- `blog.html` (página 1)
- `blog/page-2.html`, `page-3.html`, etc.

#### 4. Commit y push

```bash
git add blog-posts.json blog.html blog/page-*.html blog/tu-post.html
git commit -m "Post: Tu título"
git push
```

GitHub Pages deployea automáticamente.

---

## Scripts disponibles

### `build-blog.js`

Genera las páginas paginadas del blog desde `blog-posts.json`.

**Uso:**
```bash
node scripts/build-blog.js
```

**Configuración:**
- `POSTS_PER_PAGE`: posts por página (default: 6)
- `blog-posts.json`: fuente de verdad de los posts

---

## Estructura de archivos

```
.
├── blog-posts.json          # Fuente de verdad: array de posts
├── blog.html                # Página 1 (generada)
├── blog/
│   ├── page-2.html         # Página 2 (generada)
│   ├── page-3.html         # Página 3 (generada)
│   ├── tu-post.html        # Posts individuales
│   └── ...
└── scripts/
    ├── build-blog.js       # Script de build
    └── README.md           # Esta documentación
```

---

## Reglas

1. **NUNCA editar `blog.html` o `blog/page-*.html` directamente** — se sobreescriben en cada build
2. **Siempre editar `blog-posts.json`** para cambiar el índice de posts
3. **Ejecutar `build-blog.js` después de cada cambio** en `blog-posts.json`
4. Los posts individuales (`blog/tu-post.html`) NO se tocan por el build — creálos/editálos libremente

---

## Navegación

Cada página generada incluye:
- **← Anterior** (si no es la primera página)
- **Página X de Y** (indicador)
- **Siguiente →** (si no es la última página)

Las URLs:
- Página 1: `/blog.html`
- Página 2+: `/blog/page-N.html`

---

**Creado por Claudio ⚡ — 2026-02-07**
