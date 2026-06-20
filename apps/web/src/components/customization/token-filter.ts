import {
  TOKEN_GROUPS,
  TOKEN_LABELS,
  type TokenName,
  type TokenTab,
  type TokenValues,
} from "./customization-tokens"

export interface TokenRowModel {
  token: TokenName
  value: string
}

export interface TokenGroupModel {
  id: string
  label: string
  rows: TokenRowModel[]
}

function matchesFilter(token: TokenName, groupLabel: string, filterQuery: string) {
  const normalizedFilter = filterQuery.trim().toLowerCase()

  if (!normalizedFilter) {
    return true
  }

  return (
    token.toLowerCase().includes(normalizedFilter) ||
    TOKEN_LABELS[token].toLowerCase().includes(normalizedFilter) ||
    groupLabel.toLowerCase().includes(normalizedFilter)
  )
}

function mapTokenRows(tokens: readonly TokenName[], values: TokenValues): TokenRowModel[] {
  return tokens.map((token) => ({
    token,
    value: values[token],
  }))
}

export function filterTokenGroups(
  values: TokenValues,
  filterQuery: string,
  tab?: TokenTab,
): TokenGroupModel[] {
  const sourceGroups = tab ? TOKEN_GROUPS.filter((group) => group.tab === tab) : TOKEN_GROUPS

  return sourceGroups
    .map((group) => ({
      id: group.id,
      label: group.label,
      rows: mapTokenRows(
        group.tokens.filter((token) => matchesFilter(token, group.label, filterQuery)),
        values,
      ),
    }))
    .filter((group) => group.rows.length > 0)
}
