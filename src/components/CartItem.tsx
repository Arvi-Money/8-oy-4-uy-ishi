import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/FormatCurrency"
import book from '../assets/book.jpg'
import computer from '../assets/computer.jpg'
import banana from '../assets/banana.jpg'
import car from '../assets/car.jpg'

type CartItemProps = {
  id: number
  quantity: number
}

const getImageSrc = (itemId: number) => {
    switch (itemId) {
        case 1:
            return book;
        case 2:
            return computer;
        case 3:
            return banana;
        case 4:
            return car;
        default:
            return ""; 
    }
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart()
  const item = storeItems.find(i => i.id === id)
  if (item == null) return null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={getImageSrc(item.id)}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      /> 
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  )
}