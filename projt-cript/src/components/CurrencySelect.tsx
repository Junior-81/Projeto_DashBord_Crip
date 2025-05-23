import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CurrencySelectProps } from "@/types"

export const CurrencySelect = ({
  currency,
  onCurrencyChange,
}: CurrencySelectProps) => {
  return (
    <Select value={currency} onValueChange={onCurrencyChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecionar moeda" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Dinheiro</SelectLabel>
          <SelectItem value="BRL">R$ BRL</SelectItem>
          <SelectItem value="USD">$ USD</SelectItem>
          <SelectItem value="EUR">€ EUR</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Crypto</SelectLabel>
          <SelectItem value="BTC">₿ BTC</SelectItem>
          <SelectItem value="ETH">Ξ ETH</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}