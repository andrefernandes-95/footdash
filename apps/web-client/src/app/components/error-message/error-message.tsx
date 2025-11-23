interface Props {
    message: string | undefined | null;
}

export default function ErrorMessage({ message }: Props) {
    if (!message) return null;

    return (
        <div className="w-full bg-red-500/60 border border-red-400/40 text-red-700 px-4 py-3 rounded-xl shadow-md backdrop-blur-sm animate-fade-in">
            <p className="text-white text-sm text-center font-bold">{message}</p>
        </div>
    );
}
