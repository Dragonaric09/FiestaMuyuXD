-- CreateTable
CREATE TABLE "guests" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "rsvpStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "hasPaid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);
