import moment from "moment";

function NoteItem({noteItem}) {
    return (
        <div key={noteItem._id}>
            <div className={"ml-8"}><span className={"text-xs text-gray-500"}>{moment(noteItem.timestamp).format("MMMM Do YYYY")} - </span><span className={"text-sm"}>{noteItem.note}</span></div>
        </div>
    );
}

export default NoteItem;
