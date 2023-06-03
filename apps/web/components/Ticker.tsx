import { Paper, Text } from "@mantine/core";
import Marquee from "react-fast-marquee";

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export const StockTicker = () => {
  const stocks: Stock[] = [
    { symbol: "AAPL", price: 150.23, change: 0.45 },
    { symbol: "TSLA", price: 800.45, change: -2.33 },
    { symbol: "AMZN", price: 3200.45, change: 1.23 },
    { symbol: "GOOG", price: 2500.45, change: 0.23 },
  ];

  return (
    <Paper p="md" className="stock-ticker">
      <Marquee>
        {stocks.map((stock, index) => (
          <Text key={index} ml={8} color={stock.change > 0 ? "green" : "red"}>
            <strong>{stock.symbol}:</strong> ${stock.price.toFixed(2)}{" "}
            {stock.change > 0 ? "▲" : "▼"} {Math.abs(stock.change).toFixed(2)}
          </Text>
        ))}
      </Marquee>
    </Paper>
  );
};
