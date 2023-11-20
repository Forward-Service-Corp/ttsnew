export default function Footer () {
    return (
        <div className={"p-4 bg-gray-600 dark:bg-gray-900 grid grid-cols-1 md:grid-cols-4 text-white text-sm  font-light"}>
            <div className={"text-center"}>Map of My Dreams Web Application</div>
            <div className={"text-center"}>Forward Service Corporation &copy; 2024</div>
            <div className={"text-center"}>
                <a href={"/disclaimer"}
                   target={"_self"}
                   rel={"noreferrer"}
                   className={"text-orange-300 underline"}>
                    Data Usage Disclaimer
                </a>
            </div>
            <div className={"text-center"}>
                <a href={"https://fsc-support.zendesk.com/hc/en-us/requests/new?ticket_form_id=9189050108308"}
                   target={"_blank"}
                   rel={"noreferrer"}
                   className={"text-orange-300 underline"}>
                    Feedback: Let us know how we&apos;re doing!
                </a>
            </div>
        </div>
    )
}
