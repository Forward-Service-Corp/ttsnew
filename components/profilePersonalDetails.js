import {useState} from "react";
import {useRouter} from "next/router";
import {WICountiesList} from "../lib/WI_Counties";

function ProfilePersonalDetails({user}) {
    const router = useRouter()
    const [name, setName] = useState(user.name)
    const [street, setStreet] = useState(user.street ? user.street : "")
    const [city, setCity] = useState(user.city ? user.city : "")
    const [state, setState] = useState(user.state ? user.state : "")
    const [zip, setZip] = useState(user.zip ? user.zip : "")
    const [county, setCounty] = useState(user.county ? user.county : [])

    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)

    const [dataChanged, setDataChanged] = useState(false)

    async function savePersonalDetails() {
        await fetch("/api/save-personal-details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                street, city, state, zip, county, phone,
                userId: user._id
            })
        })
        router.reload()
    }

    const inputJSX = (label, value, setValue, disabled) => {
        return (
            <div className={"py-2"}>
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
            <h2 className={"uppercase text-gray-500 font-light mb-3"}>Personal Details</h2>
            <div className={"flex"}>

                <div className={"w-1/3"}>
                    {inputJSX("Name", name, setName, true)}
                    {inputJSX("Street", street, setStreet)}
                    {inputJSX("City", city, setCity)}
                    {inputJSX("State", state, setState)}
                    {inputJSX("Zip", zip, setZip)}
                    {inputJSX("Email", email, setEmail, true)}
                    {inputJSX("Phone", phone, setPhone)}
                </div>

                <div className={"w-1/3 px-5"}>
                    <p className={"text-gray-500"}>Available counties</p>
                    <p className={"text-indigo-600 text-sm mb-5"}>Click below to add a county</p>
                    <select className={"w-1/2 min-h-[400px]"} multiple={true} onChange={(e) => {
                        setCounty(prevState => {
                            if (county.indexOf(e.target.value) === -1) {
                                return [...prevState, e.target.value]
                            } else {
                                return prevState
                            }
                        })
                        setDataChanged(true)
                    }}>
                        {WICountiesList.map((county) => {
                            return (
                                <option key={county}>{county}</option>
                            )
                        })}
                    </select>
                </div>

                <div className={"w-1/3"}>
                    <p className={"text-gray-600"}>Your selected counties</p>
                    <p className={"text-red-600 text-sm mb-5"}>Click below to remove a county</p>
                    {county.map((c) => {
                        return (
                            <div key={c} className={"cursor-pointer"} onClick={() => {
                                setCounty(prevState => prevState.filter(item => item !== c))
                                setDataChanged(true)
                            }}>{c}</div>
                        )
                    })}

                </div>
            </div>
            <button className={"rounded bg-indigo-600 text-white p-2 mt-4 disabled:bg-gray-600"} onClick={() => {
                if (dataChanged) {
                    savePersonalDetails(user._id)
                        .then(res => console.log(res))
                        .catch(err => console.warn(err))
                }
            }} disabled={!dataChanged}>Save details
            </button>
        </div>
    );
}

export default ProfilePersonalDetails;
