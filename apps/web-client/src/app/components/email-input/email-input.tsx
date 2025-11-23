import { ChangeEventHandler } from "react";

interface Props {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function EmailInput({ value, onChange }: Props) {
    return (
        <div>
            <label className="block mb-2">Email</label>
            <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="you@example.com"
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
}