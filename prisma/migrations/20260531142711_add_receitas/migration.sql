-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "rota" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategoria" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subcategoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lugar" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categoriaId" TEXT,
    "subcategoriaId" TEXT,
    "descricaoCurta" TEXT NOT NULL,
    "descricaoCompleta" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "imagemAlt" TEXT NOT NULL,
    "endereco" TEXT,
    "cidade" TEXT,
    "bairro" TEXT,
    "enderecoGoogleMaps" TEXT,
    "enderecoGoogleMapsLabel" TEXT,
    "enderecoGoogleMaps2" TEXT,
    "enderecoGoogleMaps2Label" TEXT,
    "telefone" TEXT,
    "instagram" TEXT,
    "instagramReview" TEXT,
    "website" TEXT,
    "horarioFuncionamento" TEXT,
    "faixaPreco" INTEGER,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lugar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cupom" (
    "id" TEXT NOT NULL,
    "lugarId" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "validade" TIMESTAMP(3),
    "termos" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cupom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receitas" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "convidado" TEXT NOT NULL,
    "ingredientes" TEXT NOT NULL,
    "passos" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "opiniao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receitas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_slug_key" ON "Categoria"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategoria_categoriaId_nome_key" ON "Subcategoria"("categoriaId", "nome");

-- CreateIndex
CREATE UNIQUE INDEX "Lugar_slug_key" ON "Lugar"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "receitas_slug_key" ON "receitas"("slug");

-- CreateIndex
CREATE INDEX "receitas_slug_idx" ON "receitas"("slug");

-- AddForeignKey
ALTER TABLE "Subcategoria" ADD CONSTRAINT "Subcategoria_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lugar" ADD CONSTRAINT "Lugar_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lugar" ADD CONSTRAINT "Lugar_subcategoriaId_fkey" FOREIGN KEY ("subcategoriaId") REFERENCES "Subcategoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cupom" ADD CONSTRAINT "Cupom_lugarId_fkey" FOREIGN KEY ("lugarId") REFERENCES "Lugar"("id") ON DELETE CASCADE ON UPDATE CASCADE;
