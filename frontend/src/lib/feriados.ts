// Calcula feriados móveis
export function calcularFeriadosMoveis(ano: number) {
  const a = ano % 19
  const b = Math.floor(ano / 100)
  const c = ano % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const mes = Math.floor((h + l - 7 * m + 114) / 31)
  const dia = ((h + l - 7 * m + 114) % 31) + 1

  const pascoa = new Date(ano, mes - 1, dia)
  const carnaval = new Date(pascoa)
  carnaval.setDate(pascoa.getDate() - 47)

  const corpusChristi = new Date(pascoa)
  corpusChristi.setDate(pascoa.getDate() + 60)

  return { pascoa, carnaval, corpusChristi }
}

// Retorna todos os feriados nacionais do Brasil
export function feriadosBrasil(ano: number) {
  const { pascoa, carnaval, corpusChristi } = calcularFeriadosMoveis(ano)

  return [
    new Date(ano, 0, 1),
    carnaval,
    pascoa,
    new Date(ano, 3, 21),
    new Date(ano, 4, 1),
    corpusChristi,
    new Date(ano, 8, 7),
    new Date(ano, 9, 12),
    new Date(ano, 10, 2),
    new Date(ano, 10, 15),
    new Date(ano, 11, 25),
  ]
}
