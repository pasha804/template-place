export default function Button({ className = "", children, ...props }) {
    return (
        <button
            {...props}
            className={[
                "md:text-lg font-medium px-8 py-3 shadow-inner drop-shadow rounded-full hover:scale-103 active:scale-97 transition-all duration-200 flex items-center gap-2 will-change-transform",
                "focus:outline-none ",
                className,
            ].join(" ")}
        >
            {children}
        </button>
    )
}
