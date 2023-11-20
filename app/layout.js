
export default function RootLayout({children}) {
    return (
        <html lang={`en`} className={"h-full"}>
            <body className={"h-full bg-white dark:bg-black"}>
            {children}
            </body>
        </html>
    )
}
