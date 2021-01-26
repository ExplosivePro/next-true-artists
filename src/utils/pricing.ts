export enum PriceType {
  RETAIL_PRICE = "retail_price",
  WHOLESALE_PRICE = "wholesale_price",
}

// Calculate price
export const calculatePrice = (
  type: PriceType,
  data: Product.Detail,
  commission: number | undefined,
  rowSelected: boolean, // Calculate price is applied for all row in inBulk mode and selected row in product by product mode
): string => {
  // If commission is define = update type is chosen
  if (commission !== undefined) {
    switch (type) {
      // Calculate retail price
      case PriceType.RETAIL_PRICE: {
        const wholeSalePrice = data[PriceType.WHOLESALE_PRICE];
        // If wholesale price is set
        if (wholeSalePrice && rowSelected) {
          return ((parseFloat(wholeSalePrice) * (100 + commission)) / 100).toFixed(1);
        } else {
          // Else return its own value
          return (parseFloat(String((data[type] as unknown) as number)) || 0).toFixed(1);
        }
      }

      // Calculate wholesale price
      case PriceType.WHOLESALE_PRICE: {
        // If whole sale price is not set
        if (!data[PriceType.WHOLESALE_PRICE]) {
          // If retail price is set already, calculate wholesale price base on this value
          if (data[PriceType.RETAIL_PRICE] && rowSelected) {
            return ((parseFloat(data[PriceType.RETAIL_PRICE]) * 100) / (100 + commission)).toFixed(1);
          } else {
            // Else return its own value
            return (parseFloat(String((data[type] as unknown) as number)) || 0).toFixed(1);
          }
        } else {
          // Else return its own value
          return (parseFloat(String((data[type] as unknown) as number)) || 0).toFixed(1);
        }
      }

      // Default return 0 value
      default: {
        return "0.0";
      }
    }
  } else {
    // Commission is not set = User did not select update type yet
    return (parseFloat(String((data[type] as unknown) as number)) || 0).toFixed(1);
  }
};
