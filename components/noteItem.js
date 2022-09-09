import moment from "moment";
import log from "tailwindcss/lib/util/log";

function NoteItem({noteItem, loggedInUser}) {

    function evaluateEmail (modifiedEmail) {
        return modifiedEmail === loggedInUser?.email ? "Me" : modifiedEmail
    }

    return (
        <div key={noteItem._id}>
            <div className={"px-3 py-1 relative"}>
                <span className={"w-2 h-2 -left-[4px] top-[14px] bg-gray-300 rounded-full absolute block"}/>
                <span className={"text-xs text-gray-500"}>{moment(noteItem.timestamp).calendar()} - </span>
                <span className={"text-xs"}>{noteItem.note}</span>
                <span className={"text-gray-400 text-[11px]"}> - Added by: {noteItem.modifiedBy === null ? "unknown" : evaluateEmail(noteItem.modifiedBy)}</span>
            </div>
        </div>
    );
}

export default NoteItem;
