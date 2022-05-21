import {useState} from "react";
import {useRouter} from "next/router";

function ProfilePersonalDetails({user}) {
    const router = useRouter()
    const [name, setName] = useState(user.name)
    const [street, setStreet] = useState(user.street ? user.street : "")
    const [city, setCity] = useState(user.city ? user.city : "")
    const [state, setState] = useState(user.state ? user.state : "")
    const [zip, setZip] = useState(user.zip ? user.zip : "")
    const [county, setCounty] = useState(user.county ? user.county : [])

    const [email, setEmail] = useState(user.email)

    const [dataChanged, setDataChanged] = useState(false)

    async function savePersonalDetails () {
        await fetch("/api/save-personal-details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                street, city, state, zip, county,
                userId: user._id
            })
        })
        router.reload()
    }

    const inputJSX = (label, value, setValue, disabled) => {
        return (
            <div className={"py-2 w-1/2"}>
                <p className={"text-sm text-gray-500 w-full"}>{label}</p>
                <input className={"rounded w-full"}
                       placeholder={label}
                       type="text"
                       value={value}
                       disabled={disabled}
                       onChange={(e) => {
                           setValue(e.target.value)
                           setDataChanged(true)
                       }}/>
            </div>
        )
    }

    return (
        <div>
            {inputJSX("Name", name, setName, true)}
            {inputJSX("Street", street, setStreet)}
            {inputJSX("City", city, setCity)}
            {inputJSX("State", state, setState)}
            {inputJSX("Zip", zip, setZip)}
            {inputJSX("Email", email, setEmail, true)}
            <button className={"rounded bg-indigo-600 text-white p-2 mt-4 disabled:bg-gray-600"} onClick={() => {
                if(dataChanged){
                    savePersonalDetails(user._id)
                        .then(res => console.log(res))
                        .catch(err => console.warn(err))
                }
            }} disabled={!dataChanged}>Save details</button>
        </div>
    );
}

export default ProfilePersonalDetails;
