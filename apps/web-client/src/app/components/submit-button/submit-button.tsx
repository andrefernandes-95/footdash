interface Props {
    label: string;
}

export default function SubmitButton({ label }: Props) {
    return (
        <button
            type="submit"
            className="w-full bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/30 hover:shadow-[0_0_5px_rgba(0,0,0,0.1)] transition duration-300"
        >
            {label}
        </button>
    )
}
