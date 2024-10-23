"use client"; 
import { useState } from 'react';

export default function TextInput() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="mt-8">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="rounded px-4 py-2 text-black"
        placeholder="Enter text here"
      />
    </div>
  );
}