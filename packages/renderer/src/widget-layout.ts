export interface WidgetLayoutBox {
  width: number;
  height: number;
  viewBox: string;
}

export function getWidgetLayoutBox(): WidgetLayoutBox {
  return {
    width: 520,
    height: 180,
    viewBox: "0 0 520 180"
  };
}
