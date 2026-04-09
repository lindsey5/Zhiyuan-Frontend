import { useState } from "react";

type OrderFilters = {
  status?: string;
  payment_status?: string;
  delivery_type?: string;
};

type Props = {
  onSearch: (value: string) => void;
  onFilter?: (filters: OrderFilters) => void; 
};

export default function OrdersFilter({ onSearch, onFilter }: Props) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    onSearch(val);
  };

  return (
    <div className="flex gap-3 ml-3 md:ml-3.5 lg:ml-4">
      <input
        value={value}
        onChange={handleChange}
        placeholder="Search orders..."
        className="input"
      />

      {onFilter && (
        <button
          onClick={() => onFilter({ status: "pending" })}
          className="px-3 py-2 bg-yellow-600 text-white text-xs rounded"
        >
          Pending
        </button>
      )}
    </div>
  );
}