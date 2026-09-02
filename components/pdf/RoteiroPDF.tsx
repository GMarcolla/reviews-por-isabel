/* eslint-disable jsx-a11y/alt-text -- <Image> aqui é a primitiva do
   @react-pdf/renderer, que desenha no PDF e não aceita prop `alt`. */
import {
  Document,
  Page,
  View,
  Text,
  Image,
  Link,
  StyleSheet,
  Svg,
  Defs,
  LinearGradient,
  Stop,
  Rect,
} from "@react-pdf/renderer";
import type { Roteiro, RoteiroPeriodo } from "@/lib/types";
import {
  formatarLocalizacao,
  type RoteiroLugar,
} from "@/lib/data/roteiro";
import { pdfImageUrl } from "@/lib/cloudinary-url";
import { colors, PAGE, CONTENT_WIDTH, registerFonts } from "./theme";
import { Icon, type IconName } from "./Icon";

registerFonts();

/** Period ordering, matching the on-screen roteiro. */
const ORDER = ["manha", "almoco", "tarde", "extras", "noite"] as const;

const PERIODO_LABELS: Record<string, string> = {
  manha: "Manhã",
  almoco: "Almoço",
  tarde: "Tarde",
  extras: "Passeios Extras",
  noite: "Noite",
};

/**
 * The page marks periods with emoji (🌅 🍽️ ☀️ ⭐ 🌙). Emoji in a PDF would
 * require an external emoji font fetched at render time, so each maps to the
 * closest Lucide icon instead.
 */
const PERIODO_ICONS: Record<string, IconName> = {
  manha: "sunrise",
  almoco: "utensils",
  tarde: "sun",
  extras: "star",
  noite: "moon",
};

const PERIODO_SUBTITULOS: Record<string, string> = {
  noite: "Indicações de jantar",
};

/** Two-column grid geometry for the compact variant. */
const GRID_GAP = 16;
const GRID_CELL = (CONTENT_WIDTH - GRID_GAP) / 2;

const s = StyleSheet.create({
  page: {
    fontFamily: "Outfit",
    fontSize: 10.5,
    color: colors.terracota,
    backgroundColor: colors.branco,
    paddingTop: PAGE.paddingTop,
    paddingBottom: PAGE.paddingBottom,
    paddingHorizontal: PAGE.paddingHorizontal,
  },

  // ---- Capa ----------------------------------------------------------------
  // Sem padding na Page: o Svg de fundo ocupa a folha inteira, e um elemento
  // mais alto que o content box forçaria uma quebra de página em branco.
  // O respiro vem do padding do conteúdo interno.
  capa: {
    fontFamily: "Outfit",
    color: colors.terracota,
    position: "relative",
  },
  capaFundo: { position: "absolute", top: 0, left: 0 },
  capaConteudo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: PAGE.paddingTop,
    paddingBottom: PAGE.paddingBottom,
    paddingHorizontal: 70,
    textAlign: "center",
  },
  capaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.areiaSuave,
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 16,
    marginBottom: 28,
  },
  capaBadgeTexto: { fontSize: 10, fontWeight: 600, color: colors.textoSuave },
  capaTitulo: {
    fontSize: 42,
    fontWeight: 700,
    lineHeight: 1.15,
    marginBottom: 20,
  },
  capaDescricao: {
    fontSize: 13,
    lineHeight: 1.6,
    color: colors.textoSuave,
    marginBottom: 30,
  },
  capaDuracao: { flexDirection: "row", alignItems: "center", gap: 7 },
  capaDuracaoTexto: { fontSize: 10.5, color: colors.textoSuave },
  capaRodape: {
    position: "absolute",
    bottom: 46,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 9,
    color: colors.textoTenue,
  },
  capaSumario: {
    marginTop: 44,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  capaSumarioItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: colors.areiaMedia,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
  capaSumarioTexto: { fontSize: 8.5, color: colors.textoSuave, fontWeight: 600 },

  // ---- Cabeçalho do período ------------------------------------------------
  periodoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 22,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.areiaSuave,
  },
  periodoIconeCirculo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.terracota,
    alignItems: "center",
    justifyContent: "center",
  },
  periodoEtiqueta: {
    fontSize: 7.5,
    fontWeight: 600,
    letterSpacing: 1.1,
    color: colors.textoTenue,
    marginBottom: 3,
  },
  periodoTitulo: { fontSize: 26, fontWeight: 700, lineHeight: 1.1 },
  periodoSubtitulo: { fontSize: 10, color: colors.textoSuave, marginTop: 3 },

  // ---- Card ----------------------------------------------------------------
  card: {
    backgroundColor: colors.branco,
    borderWidth: 1,
    borderColor: colors.areiaSuave,
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
  },
  cardImagem: { borderRadius: 7, objectFit: "cover" },
  creditoImagem: {
    fontSize: 7,
    color: colors.textoTenue,
    marginTop: 5,
    textAlign: "right",
  },
  cardTitulo: { fontWeight: 700, lineHeight: 1.2 },
  cardDescricao: { color: colors.textoSuave, lineHeight: 1.55 },

  // ---- Blocos internos -----------------------------------------------------
  infoBloco: {
    backgroundColor: colors.background,
    borderRadius: 7,
    padding: 12,
    gap: 8,
  },
  // Sem `gap` nesta row: com gap, o @react-pdf mede o texto na largura cheia
  // (cabe em 1 linha) e o renderiza na largura reduzida (quebra em 2), fazendo
  // a linha seguinte se sobrepor. A coluna do ícone reserva o espaço no lugar.
  infoLinha: { flexDirection: "row", alignItems: "flex-start" },
  infoIcone: { width: 19 },
  infoTexto: { flex: 1, fontSize: 9, color: colors.textoSuave, lineHeight: 1.45 },

  dicasBloco: {
    backgroundColor: colors.areiaSuave,
    borderRadius: 7,
    padding: 12,
  },
  dicasHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  dicasTitulo: { fontSize: 10.5, fontWeight: 700 },
  // Mesmo cuidado do infoLinha: espaçamento por largura reservada, não por gap.
  dicaLinha: { flexDirection: "row", alignItems: "flex-start" },
  dicaMarcador: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.terracota,
    marginTop: 5,
    marginRight: 7,
  },
  dicaTexto: { flex: 1, fontSize: 9, color: colors.textoSuave, lineHeight: 1.45 },


  // ---- Fechamento ----------------------------------------------------------
  fechamentoCaixa: {
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.areiaSuave,
    padding: 34,
    alignItems: "center",
    textAlign: "center",
  },
  fechamentoTitulo: { fontSize: 22, fontWeight: 700, marginBottom: 12 },
  fechamentoTexto: {
    fontSize: 11,
    lineHeight: 1.6,
    color: colors.textoSuave,
    marginBottom: 22,
  },
  fechamentoLink: {
    fontSize: 11,
    fontWeight: 600,
    color: colors.terracota,
    textDecoration: "none",
  },

  // ---- Rodapé --------------------------------------------------------------
  rodape: {
    position: "absolute",
    bottom: 22,
    left: PAGE.paddingHorizontal,
    right: PAGE.paddingHorizontal,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: colors.textoTenue,
  },
});

/** Local alias — os dados vêm de getRoteiroLugares(). */
type LugarRef = RoteiroLugar;

interface RoteiroPDFProps {
  roteiro: Roteiro;
  /** Restaurants resolved from `lugarId`, keyed by that id. */
  lugares: Record<string, LugarRef>;
  siteUrl: string;
}

// ---------------------------------------------------------------------------
// Blocos reutilizados pelas três variantes de card
// ---------------------------------------------------------------------------

/**
 * Where it is and when it opens.
 *
 * The PDF is meant to be printed and carried, so a link back to the site is
 * useless here. Activities that name a `lugarId` fall back to that place's
 * record in the database; activities that spell the details out in
 * lib/data/roteiro.ts win, since those were written for this roteiro.
 */
function InfoBloco({
  atividade,
  lugares,
}: {
  atividade: RoteiroPeriodo;
  lugares: Record<string, LugarRef>;
}) {
  const lugar = atividade.lugarId ? lugares[atividade.lugarId] : undefined;

  const enderecos = atividade.enderecos?.length
    ? atividade.enderecos
    : lugar
      ? formatarLocalizacao(lugar)
      : [];

  const horarioDoLugar = lugar?.horarioFuncionamento?.trim();
  const horarios = atividade.horarios?.length
    ? atividade.horarios
    : horarioDoLugar
      ? [horarioDoLugar]
      : [];

  if (!enderecos.length && !horarios.length) return null;

  return (
    <View style={s.infoBloco}>
      {enderecos.length > 0 && (
        <View style={s.infoLinha}>
          <View style={s.infoIcone}>
            <Icon name="mapPin" size={11} color={colors.terracota} />
          </View>
          <Text style={s.infoTexto}>{enderecos.join("\n")}</Text>
        </View>
      )}
      {horarios.length > 0 && (
        <View style={s.infoLinha}>
          <View style={s.infoIcone}>
            <Icon name="clock" size={11} color={colors.terracota} />
          </View>
          <Text style={s.infoTexto}>{horarios.join("\n")}</Text>
        </View>
      )}
    </View>
  );
}

function DicasBloco({ dicas }: { dicas?: string[] }) {
  if (!dicas?.length) return null;

  return (
    <View style={s.dicasBloco}>
      <View style={s.dicasHeader}>
        <Icon name="lightbulb" size={12} color={colors.terracota} />
        <Text style={s.dicasTitulo}>Dicas da Isa</Text>
      </View>
      <View style={{ gap: 5 }}>
        {dicas.map((dica, i) => (
          <View key={i} style={s.dicaLinha}>
            <View style={s.dicaMarcador} />
            <Text style={s.dicaTexto}>{dica}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Variantes de card — escolhidas pela quantidade de atividades do período
// ---------------------------------------------------------------------------

/** 1 atividade: imagem 16:9 em largura total. */
function CardHero(props: {
  atividade: RoteiroPeriodo;
  lugares: Record<string, LugarRef>;
}) {
  const { atividade, lugares } = props;
  const largura = CONTENT_WIDTH - 40; // menos o padding do card

  return (
    <View style={s.card} wrap={false}>
      {atividade.imagem && (
        <View style={{ marginBottom: 16 }}>
          <Image
            src={pdfImageUrl(atividade.imagem)}
            style={{
              ...s.cardImagem,
              width: largura,
              height: largura * (10 / 16),
            }}
          />
          {atividade.creditoImagem && (
            <Text style={s.creditoImagem}>Foto: {atividade.creditoImagem}</Text>
          )}
        </View>
      )}

      <Text style={{ ...s.cardTitulo, fontSize: 21, marginBottom: 10 }}>
        {atividade.titulo}
      </Text>
      <Text style={{ ...s.cardDescricao, fontSize: 11, marginBottom: 14 }}>
        {atividade.descricao}
      </Text>

      <View style={{ gap: 10 }}>
        <InfoBloco atividade={atividade} lugares={lugares} />
        <DicasBloco dicas={atividade.dicas} />
      </View>
    </View>
  );
}

/** 2–3 atividades: imagem à esquerda, texto à direita. */
function CardHorizontal(props: {
  atividade: RoteiroPeriodo;
  lugares: Record<string, LugarRef>;
}) {
  const { atividade, lugares } = props;
  const larguraImagem = 196;

  return (
    <View style={{ ...s.card, flexDirection: "row", gap: 16 }} wrap={false}>
      {atividade.imagem && (
        <View style={{ width: larguraImagem }}>
          <Image
            src={pdfImageUrl(atividade.imagem, 600)}
            style={{
              ...s.cardImagem,
              width: larguraImagem,
              height: larguraImagem * (2 / 3),
            }}
          />
          {atividade.creditoImagem && (
            <Text style={{ ...s.creditoImagem, textAlign: "left" }}>
              Foto: {atividade.creditoImagem}
            </Text>
          )}
        </View>
      )}

      <View style={{ flex: 1, gap: 9 }}>
        <Text style={{ ...s.cardTitulo, fontSize: 15 }}>{atividade.titulo}</Text>
        <Text style={{ ...s.cardDescricao, fontSize: 9.5 }}>
          {atividade.descricao}
        </Text>
        <InfoBloco atividade={atividade} lugares={lugares} />
        <DicasBloco dicas={atividade.dicas} />
      </View>
    </View>
  );
}

/** 4+ atividades: grade 2×2 compacta. */
function CardGrade(props: {
  atividade: RoteiroPeriodo;
  lugares: Record<string, LugarRef>;
}) {
  const { atividade, lugares } = props;
  const largura = GRID_CELL - 28; // menos o padding do card

  return (
    <View
      style={{ ...s.card, width: GRID_CELL, padding: 14, marginBottom: 0 }}
      wrap={false}
    >
      {atividade.imagem && (
        <View style={{ marginBottom: 11 }}>
          <Image
            src={pdfImageUrl(atividade.imagem, 700)}
            style={{
              ...s.cardImagem,
              width: largura,
              height: largura * (9 / 16),
            }}
          />
          {atividade.creditoImagem && (
            <Text style={s.creditoImagem}>Foto: {atividade.creditoImagem}</Text>
          )}
        </View>
      )}

      <Text style={{ ...s.cardTitulo, fontSize: 13, marginBottom: 7 }}>
        {atividade.titulo}
      </Text>
      <Text style={{ ...s.cardDescricao, fontSize: 9, marginBottom: 9 }}>
        {atividade.descricao}
      </Text>

      <View style={{ gap: 9 }}>
        <InfoBloco atividade={atividade} lugares={lugares} />
        <DicasBloco dicas={atividade.dicas} />
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Página de período
// ---------------------------------------------------------------------------

function PaginaPeriodo({
  periodoKey,
  atividades,
  lugares,
}: {
  periodoKey: string;
  atividades: RoteiroPeriodo[];
  lugares: Record<string, LugarRef>;
}) {
  // A densidade do card acompanha a densidade real do conteúdo: períodos com
  // uma atividade ganham imagem grande, os cheios usam layouts compactos.
  const variante =
    atividades.length === 1
      ? "hero"
      : atividades.length <= 3
        ? "horizontal"
        : "grade";

  const subtitulo = PERIODO_SUBTITULOS[periodoKey];

  return (
    <Page size="A4" style={s.page}>
      <View style={s.periodoHeader}>
        <View style={s.periodoIconeCirculo}>
          <Icon
            name={PERIODO_ICONS[periodoKey]}
            size={20}
            color={colors.branco}
            strokeWidth={2}
          />
        </View>
        <View style={{ flex: 1 }}>
          {periodoKey !== "extras" && (
            <Text style={s.periodoEtiqueta}>PERÍODO</Text>
          )}
          <Text style={s.periodoTitulo}>{PERIODO_LABELS[periodoKey]}</Text>
          {subtitulo && <Text style={s.periodoSubtitulo}>{subtitulo}</Text>}
        </View>
      </View>

      {variante === "grade" ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: GRID_GAP,
          }}
        >
          {atividades.map((atividade) => (
            <CardGrade
              key={atividade.titulo}
              atividade={atividade}
              lugares={lugares}
            />
          ))}
        </View>
      ) : (
        atividades.map((atividade) => {
          const Card = variante === "hero" ? CardHero : CardHorizontal;
          return (
            <Card
              key={atividade.titulo}
              atividade={atividade}
              lugares={lugares}
            />
          );
        })
      )}

      <Rodape />
    </Page>
  );
}

function Rodape() {
  return (
    <View style={s.rodape} fixed>
      <Text>Reviews por Isabel</Text>
      <Text
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} / ${totalPages}`
        }
      />
    </View>
  );
}

// ---------------------------------------------------------------------------
// Documento
// ---------------------------------------------------------------------------

export function RoteiroPDF({ roteiro, lugares, siteUrl }: RoteiroPDFProps) {
  const porPeriodo = roteiro.periodos.reduce(
    (acc, atividade) => {
      (acc[atividade.periodo] ??= []).push(atividade);
      return acc;
    },
    {} as Record<string, RoteiroPeriodo[]>
  );

  const periodosVisiveis = ORDER.filter((key) => porPeriodo[key]?.length);
  const totalAtividades = roteiro.periodos.length;
  const dominio = siteUrl.replace(/^https?:\/\//, "");

  return (
    <Document
      title={roteiro.titulo}
      author="Isabel"
      subject="Roteiro de um dia em Blumenau"
      creator="Reviews por Isabel"
      producer="Reviews por Isabel"
    >
      {/* Capa */}
      <Page size="A4" style={s.capa}>
        {/* `fixed` tira o fundo do fluxo: sem isso um elemento da altura da
            folha inteira gera uma página em branco antes do conteúdo. */}
        <Svg
          fixed
          style={s.capaFundo}
          width={PAGE.width}
          height={PAGE.height}
          viewBox={`0 0 ${PAGE.width} ${PAGE.height}`}
        >
          <Defs>
            <LinearGradient id="capa" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={colors.areiaSuave} />
              <Stop offset="0.55" stopColor={colors.background} />
              <Stop offset="1" stopColor={colors.branco} />
            </LinearGradient>
          </Defs>
          <Rect
            x={0}
            y={0}
            width={PAGE.width}
            height={PAGE.height}
            fill="url(#capa)"
          />
        </Svg>

        <View style={s.capaConteudo}>
          <View style={s.capaBadge}>
            <Icon name="mapPin" size={11} color={colors.textoSuave} />
            <Text style={s.capaBadgeTexto}>Blumenau, SC</Text>
          </View>

          <Text style={s.capaTitulo}>{roteiro.titulo}</Text>
          <Text style={s.capaDescricao}>{roteiro.descricao}</Text>

          <View style={s.capaDuracao}>
            <Icon name="clock" size={12} color={colors.textoSuave} />
            <Text style={s.capaDuracaoTexto}>
              Duração: 1 dia completo · {totalAtividades} paradas
            </Text>
          </View>

          <View style={s.capaSumario}>
            {periodosVisiveis.map((key) => (
              <View key={key} style={s.capaSumarioItem}>
                <Icon
                  name={PERIODO_ICONS[key]}
                  size={9}
                  color={colors.terracota}
                />
                <Text style={s.capaSumarioTexto}>{PERIODO_LABELS[key]}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={s.capaRodape}>{dominio}</Text>
      </Page>

      {/* Uma página por período — transborda para uma segunda se o conteúdo crescer */}
      {periodosVisiveis.map((key) => (
        <PaginaPeriodo
          key={key}
          periodoKey={key}
          atividades={porPeriodo[key]}
          lugares={lugares}
        />
      ))}

      {/* Fechamento */}
      <Page size="A4" style={s.page}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={s.fechamentoCaixa}>
            <Text style={s.fechamentoTitulo}>Pronto para sua aventura?</Text>
            <Text style={s.fechamentoTexto}>
              Este roteiro é apenas uma sugestão! Sinta-se livre para adaptar
              conforme seu estilo e preferências. Explore mais lugares nas outras
              seções do site.
            </Text>
            <Link style={s.fechamentoLink} src={siteUrl}>
              {dominio}
            </Link>
          </View>
        </View>
        <Rodape />
      </Page>
    </Document>
  );
}
