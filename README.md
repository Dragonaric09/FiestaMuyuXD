This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

src/
├── app/                  # (Frontend) Enrutamiento de Next.js (App Router)
│   ├── api/              # Si necesitamos Webhooks o endpoints externos (opcional)
│   ├── dashboard/        # Rutas del panel de administración
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── globals.css       # Estilos globales y variables de Tailwind/Shadcn
│   ├── layout.tsx        # Layout principal de la aplicación
│   └── page.tsx          # La Landing Page / Invitación (Pública)
│
├── components/           # (Frontend) Componentes de la interfaz
│   ├── ui/               # Componentes base generados por Shadcn UI (Botones, Inputs, etc.)
│   ├── landing/          # Componentes específicos de la invitación (Countdown, MusicPlayer)
│   └── dashboard/        # Componentes específicos del panel (GuestTable, StatsCards)
│
├── hooks/                # (Frontend) Lógica de estado y llamadas al backend
│   ├── useGuest.ts       # Ej: const { registerGuest, isLoading } = useGuest()
│   └── useDashboard.ts   # Ej: const { fetchGuests, markAsPaid } = useDashboard()
│
├── lib/                  # Utilidades compartidas (Frontend y Backend)
│   ├── prisma.ts         # Instancia singleton de Prisma Client (Muy importante en Next.js)
│   └── utils.ts          # Función `cn` requerida por Shadcn y otros helpers
│
└── services/             # (Backend) Lógica de negocio y base de datos (Server Actions)
    ├── guest.service.ts  # Funciones que interactúan con Prisma (crear invitado, obtener lista)
    └── dashboard.service.ts