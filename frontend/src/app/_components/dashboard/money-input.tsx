import { NumericFormat, NumericFormatProps } from 'react-number-format';

export function MoneyInput(props: NumericFormatProps) {
  return (
    <NumericFormat
      {...props}
      thousandSeparator="."
      decimalSeparator=','
      prefix='R$ '
      allowNegative={false}
      decimalScale={2}
    />
  )
}