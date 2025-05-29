import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CurrencySelect } from "./CurrencySelect"
import { FilterBarProps } from "@/types"

export const FilterBar = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  showFavorites,
  onToggleFavorites,
  currency,
  onCurrencyChange,
}: FilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center justify-between mb-4">
      <div className="flex flex-col sm:flex-row gap-2 flex-1">
        <Input
          type="text"
          placeholder="Buscar criptomoeda..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-64"
        />
        <CurrencySelect
          currency={currency}
          onCurrencyChange={onCurrencyChange}
        />
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="market_cap_desc">Market Cap (Maior)</SelectItem>
            <SelectItem value="market_cap_asc">Market Cap (Menor)</SelectItem>
            <SelectItem value="price_desc">Preço (Maior)</SelectItem>
            <SelectItem value="price_asc">Preço (Menor)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        variant={showFavorites ? "secondary" : "outline"}
        onClick={onToggleFavorites}
        className="w-full sm:w-auto"
      >
        Mostrar Favoritos
      </Button>
    </div>
  )
}