# 🤖 Phrases MCP Server

Un servidor MCP (Model Context Protocol) elegante y eficiente para gestionar frases inspiradoras. Diseñado para integrarse perfectamente con Claude for Desktop y otros clientes MCP.

<div align="center">
  <img src="https://github.com/ronniemh/phrases-MCP-server/raw/main/assets/diagram.png" alt="Diagrama de arquitectura" width="600">
</div>

## ✨ Características

- **Gestión completa de frases** - Crea, lee, actualiza y elimina frases con facilidad
- **Integración con Claude for Desktop** - Interactúa con tus frases directamente desde Claude
- **API Mock integrada** - Utiliza una API mock para pruebas y desarrollo

## 🛠️ Herramientas disponibles
no
El servidor expone las siguientes herramientas MCP:

| Herramienta | Descripción |
|-------------|-------------|
| `get-all-phrases` | Obtiene todas las frases disponibles |
| `get-phrase-by-id` | Busca una frase por su ID |
| `get-phrase-by-name` | Busca frases por nombre de autor |
| `create-phrase` | Crea una nueva frase |
| `update-phrase` | Actualiza el texto de una frase existente |
| `delete-phrase` | Elimina una frase por su ID |

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/ronniemh/phrases-MCP-server.git
cd phrases-MCP-server

# Instalar dependencias
npm install

# Compilar el proyecto
npm run build
```

## 🔌 Configuración con Claude for Desktop

1. Instala [Claude for Desktop](https://claude.ai/download) (asegúrate de tener la última versión)

2. Configura Claude for Desktop para usar este servidor MCP:

   Abre el archivo (MAC/Linux) de configuración en:
   ```
   ~/Library/Application Support/Claude/claude_desktop_config.json
   ```

3. Agrega la configuración del servidor:

   ```json
   {
       "mcpServers": {
           "phrases": {
               "command": "node",
               "args": [
                   "/RUTA_ABSOLUTA_A/phrases/build/index.js"
               ]
           }
       }
   }
   ```

4. Reinicia Claude for Desktop

## 💡 Uso con Claude

Una vez configurado, puedes interactuar con tus frases directamente desde Claude for Desktop:

- "Muéstrame todas las frases disponibles"
- "Busca frases de [nombre de autor]"
- "Crea una nueva frase para [nombre] que diga [texto]"
- "Actualiza la frase con ID [número] a [nuevo texto]"
- "Elimina la frase con ID [número]"

## 🧪 Pruebas

### ⚠️ Importante: Configuración para pruebas

Antes de ejecutar las pruebas, debes modificar temporalmente el archivo `tsconfig.json`. Cambia la sección `compilerOptions` a:

```json
"compilerOptions": {
  "target": "ES2020",
  "module": "NodeNext",
  "moduleResolution": "NodeNext",
  "esModuleInterop": true,
  "outDir": "build",
  "strict": true
}
```

> **Nota**: No olvides volver a la configuración original después de las pruebas para que la compilación del servidor MCP funcione correctamente.

Para ejecutar las pruebas:

```bash
npm run test:requests
```

Este comando ejecutará una serie de pruebas que crean, leen, actualizan y eliminan frases utilizando la API mock.

## 🏗️ Estructura del proyecto

```
src/
├── helpers/
│   └── makeMockAPIRequest.ts  # Funciones de ayuda para interactuar con la API
├── index.ts                   # Punto de entrada principal y definición de herramientas
└── testRequest.ts             # Script para probar las funciones de la API
```

## 🔄 Flujo de trabajo de desarrollo

1. Modifica el código en `src/`
2. Compila con `npm run build`
3. Prueba con `npm run test:requests`
4. Reinicia Claude for Desktop para aplicar los cambios

## 🔍 Configuración de MockAPI

Este proyecto utiliza [MockAPI](https://mockapi.io/) como backend para almacenar y gestionar las frases. La URL base configurada es:

```
https://67ec86aeaa794fb3222e0682.mockapi.io/frases/api/v1/user
```

### Configurar tu propia instancia de MockAPI

1. Crea una cuenta en [MockAPI](https://mockapi.io/)
2. Crea un nuevo proyecto
3. Crea un recurso llamado `user` con los siguientes campos:
   - `id` (number, autogenerado)
   - `name` (string)
   - `phrase` (string)
4. Copia la URL de tu API
5. Actualiza la constante `BASE_URL` en el archivo `src/helpers/makeMockAPIRequest.ts`

```typescript
// Cambia esta línea con tu propia URL de MockAPI
const BASE_URL = "https://tu-proyecto.mockapi.io/tu-path/user";
```

## 📝 Notas adicionales

- Este servidor utiliza una API mock para almacenar datos. En un entorno de producción, considera implementar una base de datos real.
- La estructura del proyecto sigue las [directrices oficiales de MCP](https://modelcontextprotocol.io/) para una mejor mantenibilidad.
- Si encuentras problemas con la API mock, verifica los límites de uso gratuito de MockAPI.

## 📄 Licencia

ISC

