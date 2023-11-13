import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {WICountiesList} from "../lib/WI_Counties";
import {XCircle} from "phosphor-react";

function ProfilePersonalDetails({user, darkMode}) {
    const router = useRouter()
    const [name, setName] = useState(user.name)
    const [street, setStreet] = useState(user.street ? user.street : "")
    const [city, setCity] = useState(user.city ? user.city : "")
    const [state, setState] = useState(user.state ? user.state : "")
    const [zip, setZip] = useState(user.zip ? user.zip : "")
    const [counties, setCounties] = useState(user.county ? user.county : [])

    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)

    const [dataChanged, setDataChanged] = useState(false)
    const [changeConfirm, setChangeConfirm] = useState(false)

    // const [darkMode, setDarkMode] = useState(null)
    //
    // useEffect(() => {
    //     const value = localStorage.theme
    //     let currentTheme = value !== undefined && value === 'dark' ? 'darkTheme' : 'lightTheme'
    //
    //     setDarkMode(currentTheme)
    // }, []);

    async function savePersonalDetails() {
        await fetch("/api/save-personal-details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, street, city, state, zip, counties, phone,
                userId: user._id
            })
        })
        router.reload()
    }

    const inputJSX = (label, value, setValue, disabled) => {
        return (
            <div className={"py-2"}>
                <p className={"text-sm text-gray-500 w-full dark:text-white"}>{label}</p>
                <input className={"rounded w-full dark:bg-black dark:text-white dark:font-light dark:border-gray-700 dark:focus:bg-black dark:autofill:bg-black"}
                       name={label}
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
            <h2 className={"uppercase text-gray-500 font-light mb-3 dark:text-white"}>Personal Details</h2>
            <div className={`bg-green-400 p-3 text-white rounded ${changeConfirm ? "visible" : "hidden"}`}>Details successfully saved.</div>
            <div className={"flex flex-col lg:flex-row"}>
                <div className={"lg:flex-1 lg:mr-10"}>
                    {inputJSX("Name", name, setName)}
                    {inputJSX("Street", street, setStreet)}
                    {inputJSX("City", city, setCity)}
                    {inputJSX("State", state, setState)}
                    {inputJSX("Zip", zip, setZip)}
                    {inputJSX("Email", email, setEmail, true)}
                    {inputJSX("Phone", phone, setPhone)}
                </div>

                <div className={"lg:flex-1"}>
                    <p className={"text-gray-500 mb-1 dark:text-white"}>Counties</p>
                    <div className={"lg:flex-1 flex flex-wrap"}>
                        {counties.map((currentCounty) => {
                            return (
                                <div key={currentCounty}
                                     className={"cursor-pointer rounded border font-light dark:border-[1px] dark:border-gray-800 py-1 px-2 h-8 mr-2 mb-2 flex justify-between align-middle text-sm dark:bg-[#111111]"}
                                     onClick={() => {
                                         setCounties(prevState => prevState.filter(item => item !== currentCounty))
                                         setDataChanged(true)
                                     }}>
                                    <div className={"inline-block mr-1 dark:text-white"}>{currentCounty}</div>
                                    <div className={"inline-block"}>
                                        <XCircle size={20} weight="thin" color={"orange"}/>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <p className={"text-indigo-600 text-sm mb-5 dark:text-white"}>Select all counties in which you may want to access resources.</p>
                    <select className={"w-full lg:min-h-[400px] dark:bg-black dark:text-white"} multiple={true} onChange={(e) => {
                        setCounties(prevState => {
                            if (counties.indexOf(e.target.value) === -1) {
                                return [...prevState, e.target.value]
                            } else {
                                return prevState
                            }
                        })
                        setDataChanged(true)
                    }}>
                        {WICountiesList.map((county) => {
                            return (
                                <option key={county} value={county}>{county}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <button className={"rounded bg-indigo-600 text-white p-2 mt-4 disabled:bg-gray-600"} onClick={() => {
                if (dataChanged) {
                    savePersonalDetails(user._id)
                        .then(res => console.log(res))
                        .catch(err => console.warn(err))
                    setChangeConfirm(true)
                    setTimeout(() => {
                        setChangeConfirm(false)
                    }, 3000)
                }
            }} disabled={!dataChanged}>Save details
            </button>
        </div>
    );
}

export default ProfilePersonalDetails;
