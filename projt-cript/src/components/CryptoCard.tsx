import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { CryptoCardProps } from "@/types"

export const CryptoCard = ({
  id,
  name,
  symbol,
  price,
  priceChange24h,
  image,
  isFavorite,
  onFavoriteClick,
  currency
}: CryptoCardProps) => {
  const priceChangeColor = priceChange24h >= 0 ? "text-green-500" : "text-red-500"
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <img src={image} alt={name} className="w-8 h-8" />
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{symbol.toUpperCase()}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onFavoriteClick}
          className={cn(
            "hover:text-yellow-500",
            isFavorite && "text-yellow-500"
          )}
        >
          <Star className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <Link href={`/coin/${id}?currency=${currency}`} className="block">
          <div className="flex justify-between items-end">
            <p className="text-2xl font-bold">
              {formatPrice(price, currency)}
            </p>
            <p className={`text-sm font-medium ${priceChangeColor}`}>
              {priceChange24h > 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
            </p>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}