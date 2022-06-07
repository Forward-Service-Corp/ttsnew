import moment from "moment";

function NoteItem({noteItem}) {
    return (
        <div key={noteItem._id}>
            <div className={"px-3 py-1 relative"}>
                <span className={"w-2 h-2 -left-[4px] top-[14px] bg-gray-300 rounded-full absolute block"}/>
                <span className={"text-xs text-gray-500"}>{moment(noteItem.timestamp).format("MMMM Do YYYY")} - </span>
                <span className={"text-xs"}>{noteItem.note}</span>
            </div>
        </div>
    );
}

export default NoteItem;
