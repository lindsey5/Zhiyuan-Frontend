import { useState } from "react";

export default function OrdersFilter({ onSearch }: any) {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    const val = e.target.value;
    setValue(val);

    clearTimeout((window as any).searchTimeout);
    (window as any).searchTimeout = setTimeout(() => {
      onSearch(val);
    }, 500);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder="Search orders..."
      className="input"
    />
  );
}