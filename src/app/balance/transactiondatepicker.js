import React, { useState } from "react";

export default function TransactionDatePicker() {
  const [value, setValue] = useState(Date());
  return (
    <input
      id="transaction_date"
      type="date"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
