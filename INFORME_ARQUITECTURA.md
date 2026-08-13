    # Informe de Cambios Arquitectónicos - FiestaMuyu

**Proyecto:** The Tortured Poets Department - Invitación Interactiva  
**Fecha:** 12 de Agosto, 2026  
**Responsable:** Desarrollo Frontend  

---

## 📋 Resumen Ejecutivo

Se ha implementado una arquitectura de página de invitación interactiva con gestión de estado, animaciones suaves y efectos visuales avanzados. La aplicación maneja dos estados principales: **portada cerrada** y **portada abierta**, con transiciones fluidas entre ellas.

---

## 🏗️ Cambios Realizados

### 1. **Configuración Base de Tailwind CSS**
**Archivo:** `tailwind.config.ts`

```typescript
- Registra variables CSS para fuentes personalizadas
- font-sans: Inter (--font-inter)
- font-typewriter: Special Elite (--font-typewriter)
```

**Propósito:** Centralizar la configuración de estilos y permitir extensión futura con paletas de colores de Shadcn.

---

### 2. **Corrección de Layout Principal**
**Archivo:** `app/layout.tsx`

```typescript
Antes:   ❌ HTML y body no estaban declarados
Después: ✅ <html lang="es" className={fuentes}><body>{children}</body></html>
```

**Impacto:** Resuelve errores de hidratación en Next.js y permite aplicar variables CSS de fuentes globalmente.

---

### 3. **Estilos Globales Avanzados**
**Archivo:** `app/globals.css`

Se agregaron dos clases CSS sofisticadas:

#### `.redacted-overlay`
- **Función:** Barras de redacción censurada con "ventana" que sigue al mouse
- **Técnica:** Gradient repetido + radial mask que se actualiza con variables `--x` y `--y`
- **Caso de Uso:** Efecto de expediente clasificado con revelación interactiva
- **Accesibilidad:** Respeta `prefers-reduced-motion`

#### `.paper-grain`
- **Función:** Textura de grano de papel de archivo antiguo
- **Técnica:** SVG base64 con filtro FeTurbulence (sin archivos externos)
- **Opacidad:** 0.05 para subtileza

---

### 4. **Componente de Cuenta Regresiva**
**Archivo:** `components/landing/Countdown.tsx`

```typescript
Props:     { targetDate: Date }
Estado:    { days, hours, minutes, seconds }
Hidratación: ✅ Renderiza solo en cliente (evita mismatch)
Actualización: Cada 1 segundo
```

**Lógica:**
- Calcula diferencia entre fecha actual y fecha objetivo
- Renderiza subcomponente `TimeUnit` para cada unidad temporal
- Los números siempre tienen 2 dígitos (padding con ceros)
- Diseño: Bordes tipo expediente, tipografía typewriter

**Ejemplo de uso:**
```tsx
<Countdown targetDate={new Date("2026-12-25")} />
```

---

### 5. **Componente de Partículas Flotantes**
**Archivo:** `components/landing/InkParticles.tsx`

```typescript
Cantidad:      250 partículas
Generación:    useEffect (evita hydration mismatch)
Animación:     Framer Motion
```

**Lógica Clave:**
1. **Estado Inicial:** Vacío en servidor
2. **Montaje en Cliente:** `useEffect` genera 250 especificaciones aleatorias
3. **Cada partícula tiene:**
   - `x, y`: Posición aleatoria (0-100%)
   - `d`: Duración de animación (6-12s)
   - `delay`: Retraso inicial (0-4s)

**Animación:**
- Movimiento vertical: `y: [0, -40, 0]`
- Opacidad: `[0, 0.5, 0]`
- Repetición infinita con ease "easeInOut"

**Propósito:** Efecto de tinta flotante que simula documentos antiguos.

---

## 🎬 Página Principal - Lógica de Estados

**Archivo:** `app/page.tsx`

### Flujo de Navegación

```
┌─────────────────────────────────────────┐
│   ESTADO: isOpened = false              │
│   "LA PORTADA (Expediente Cerrado)"     │
├─────────────────────────────────────────┤
│  ✓ Partículas flotantes de tinta       │
│  ✓ Título en typewriter                │
│  ✓ Sello "File No. 1989 · Confidential"│
│  ✓ Subtítulo poético                   │
│  ✓ BOTÓN: "Abrir el expediente"        │
└─────────────────────────────────────────┘
                    ↓ onClick
    setIsOpened(true) + AnimatePresence
                    ↓
┌─────────────────────────────────────────┐
│   ESTADO: isOpened = true               │
│   "LA INVITACIÓN (Expediente Abierto)"  │
├─────────────────────────────────────────┤
│  [Preparado para: Invitación, Música,  │
│   Cuenta Regresiva, Efectos Adicionales]│
└─────────────────────────────────────────┘
```

---

## 🔘 El Botón "Abrir el expediente"

### ¿Qué hace?

```typescript
<Button
  onClick={() => setIsOpened(true)}
  aria-label="Abrir el expediente y ver la invitación"
  className="... border-zinc-800 text-zinc-800 hover:bg-zinc-800 hover:text-white ..."
>
  Abrir el expediente
</Button>
```

### Comportamiento Técnico

1. **Trigger:** Click del usuario
2. **Acción:** Ejecuta `setIsOpened(true)` 
3. **Efecto Salida:** La portada actual ejecuta:
   - `opacity: 0`
   - `scale: 1.05` (zoom leve)
   - `blur(4px)` (desenfoque)
   - Duración: 700ms con easing "easeInOut"

4. **Efecto Entrada:** La invitación entra con:
   - `opacity: 0 → 1`
   - `y: 20 → 0` (desplazamiento hacia arriba)
   - Duración: 800ms con delay 100ms

### Estilos Visuales

| Estado | Fondo | Borde | Texto |
|--------|-------|-------|-------|
| Normal | Transparente | zinc-800 | zinc-800 |
| Hover | zinc-800 | zinc-800 | white |
| Transición | 500ms de duración | | |

---

## 🎨 Stack Tecnológico

| Componente | Tecnología |
|------------|-----------|
| Animaciones | Framer Motion |
| Estilos | Tailwind CSS + CSS personalizado |
| UI Base | Shadcn/ui |
| Framework | Next.js 15+ |
| Fuentes | Google Fonts (Inter, Special Elite) |

---

## ⚙️ Patrones y Buenas Prácticas Implementadas

### 1. **Prevención de Hydration Mismatch**
```typescript
// ❌ INCORRECTO
const particles = Array.from({ length: 250 }, () => ({...}))

// ✅ CORRECTO
useEffect(() => {
  setParticles(Array.from({ length: 250 }, () => ({...})))
}, [])
```

**Razón:** Servidor y cliente generan valores aleatorios distintos → mismatch

### 2. **Animaciones con AnimatePresence**
```typescript
<AnimatePresence mode="wait">
  {isOpened ? <InvitationPage /> : <CoverPage />}
</AnimatePresence>
```

**Razón:** Permite animar la salida antes de entrar el siguiente componente

### 3. **Estructura de Variants**
```typescript
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 }
}
```

**Razón:** Reutilizable, mantenible, escalable a más elementos

### 4. **Accesibilidad**
- `aria-label` en botón para lectores de pantalla
- `aria-hidden="true"` en elementos puramente decorativos
- Respeta `prefers-reduced-motion`

---

## 📊 Flujo de Datos

```
page.tsx (State Manager)
    │
    ├── useState(isOpened)
    │
    ├─→ isOpened = false
    │   └─→ <motion.main key="cover">
    │       ├─→ <InkParticles /> (250 especificaciones)
    │       ├─→ Animated título, subtítulo
    │       └─→ <Button onClick={() => setIsOpened(true)} />
    │
    └─→ isOpened = true
        └─→ <motion.main key="invitation">
            └─→ [Espacio para invitación + countdown + música]
```

---

## 🚀 Próximas Implementaciones Sugeridas

1. **Integrar Countdown** en la página de invitación
2. **Agregar audio** (música de fondo, efectos sonoros)
3. **Implementar redacted-overlay** con mouse tracking en el título
4. **Añadir conffetti** o efectos de ruptura al abrir
5. **Respuestas del servidor** para validar asistencia
6. **Dark mode** alternativo

---

## ✅ Estado de Calidad

| Aspecto | Estado |
|---------|--------|
| Hidratación | ✅ Verified |
| Accesibilidad | ✅ ARIA labels |
| Performance | ✅ Client-optimized |
| Responsividad | ✅ Mobile-first |
| Mantenibilidad | ✅ Componentes reutilizables |

---

**Aprobación Pendiente:** Arquitectura completada y lista para extensiones
