import React, {useState} from 'react';
import {XCircle} from "phosphor-react";
import {WICountiesList} from "../lib/WI_Counties";
import {useRouter} from "next/router";

function ClientDetails({viewingUser}) {

    const router = useRouter()
    const [name, setName] = useState(viewingUser.name ? viewingUser.name : "")
    const [email, setEmail] = useState(viewingUser.email ? viewingUser.email : "")
    const [street, setStreet] = useState(viewingUser.street ? viewingUser.street : "")
    const [city, setCity] = useState(viewingUser.city ? viewingUser.city : "")
    const [state, setState] = useState(viewingUser.state ? viewingUser.state : "WI")
    const [zip, setZip] = useState(viewingUser.zip ? viewingUser.zip : "")
    const [counties, setCounties] = useState(viewingUser.county ? viewingUser.county : [])
    const [phone, setPhone] = useState(viewingUser.phone || "")
    const [dataChanged, setDataChanged] = useState(false)
    const [editMode, setEditMode] = useState(false)


    async function saveClientDetails() {
        await fetch("/api/save-client-details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, street, city, state, zip, counties, phone,
                userId: viewingUser._id
            })
        })
        router.reload()
    }

    return (
        <div className={`mt-5 p-6 border rounded dark:border-none dark:bg-black dark:bg-opacity-70 dark:text-white dark:rounded-lg dark:shadow-xl`}>
            <div className={"flex justify-between"}>
                <div><h2 className={"uppercase text-gray-500 mb-3 dark:text-gray-400"}>Personal Details</h2></div>
                {editMode ?
                    <div className={"text-sm text-red-500 underline cursor-pointer"} onClick={() => {
                        setEditMode(!editMode)
                        router.reload()
                    }}>Cancel editing
                    </div>
                    :
                    <div className={"text-sm text-orange-500 underline cursor-pointer"} onClick={() => {
                        setEditMode(!editMode)
                    }}>Edit this client
                    </div>
                }
            </div>
            <div className={"flex"}>
                <div className={"flex-1"}>

                    <div>
                        <p className={"text-gray-500 text-xs dark:text-gray-400"}>Name</p>
                        <div className={`${editMode ? "hidden" : "visible"}`}>{name ||
                            <span className={"text-red-600 text-sm"}>Please add name to profile.</span>}</div>
                        <div className={`${editMode ? "visible" : "hidden"}`}>
                            <input type={"text"} id={"name"} autoComplete={"true"}
                                   className={"min-w-[300px] text-sm"}
                                   placeholder={name || "Enter name here..."}
                                   onChange={(e) => {
                                       setName(e.target.value)
                                       setDataChanged(true)
                                   }}/>
                        </div>
                    </div>

                    <div>
                        <p className={"text-gray-500 text-xs dark:text-gray-400"}>Email</p>
                        <div className={`${editMode ? "hidden" : "visible"}`}>{email ||
                            <span className={"text-red-600 text-sm"}>Please add email to profile.</span>}</div>
                        <div className={`${editMode ? "visible" : "hidden"}`}>
                            <input disabled={true} type={"text"} id={"email"} autoComplete={"true"}
                                   className={"min-w-[300px] text-sm"}
                                   placeholder={email || "Enter email here..."}
                                   onChange={(e) => {
                                       setEmail(e.target.value)
                                       setDataChanged(true)
                                   }}
                            />
                        </div>
                    </div>
                    <div>
                        <p className={"text-gray-500 text-xs dark:text-gray-400"}>Phone</p>
                        <div className={`${editMode ? "hidden" : "visible"}`}>{phone || <span
                            className={"text-red-600 text-sm"}>Please add phone number to profile.</span>}</div>
                        <div className={`${editMode ? "visible" : "hidden"}`}>
                            <input type={"text"} id={"phone"} autoComplete={"true"}
                                   className={"min-w-[300px] text-sm"}
                                   placeholder={phone || "Enter phone number here..."}
                                   onChange={(e) => {
                                       setPhone(e.target.value)
                                       setDataChanged(true)
                                   }}
                            />
                        </div>
                    </div>

                    <p className={"text-gray-500 text-xs mt-4 dark:text-gray-400"}>Counties</p>
                    <div className={`${editMode ? "hidden" : "visible"}`}>
                        <ul className={"text-sm"}>
                            {counties && counties.map(county => (
                                <li key={county}>{county}</li>
                            ))}
                        </ul>
                    </div>

                    <div className={`${editMode ? "visible" : "hidden"}`}>
                        <div className={"flex"}>
                            {counties.map((currentCounty) => {
                                return (
                                    <div key={currentCounty}
                                         className={"cursor-pointer rounded border py-1 px-2 h-8 mr-2 mb-2 flex justify-between align-middle text-sm max-w-[180px] truncate"}
                                         onClick={() => {
                                             setCounties(prevState => prevState.filter(item => item !== currentCounty))
                                             setDataChanged(true)
                                         }}>
                                        <div className={"inline-block mr-1"}>{currentCounty}</div>
                                        <div className={"inline-block"}><XCircle size={20} weight="thin"
                                                                                 color={"red"}/></div>
                                    </div>
                                )
                            })}
                        </div>
                        <select multiple className={"min-w-[300px] min-h-[300px] text-sm"} id={"counties"} onChange={(e) => {
                            setCounties(prevState => {
                                if (counties.indexOf(e.target.value) === -1) {
                                    setDataChanged(true)
                                    return [...prevState, e.target.value]
                                } else {
                                    return prevState
                                }
                            })
                        }}>
                            {WICountiesList.map(county => {
                                return <option key={county} value={county}>{county}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <p className={"text-gray-500 text-xs mt-4 dark:text-gray-400"}>Coaches</p>
                        {viewingUser.coach.map((coach, i) => {
                            return (<li key={i}><a className={"underline text-orange-500"}
                                                   href={`mailto:${coach}`}>{coach}</a></li>)
                        })}
                    </div>
                </div>


                <div className={"flex-1"}>
                    <div>
                        <p className={"text-gray-500 text-xs dark:text-gray-400"}>Address</p>
                        <div className={`${editMode ? "hidden" : "visible"}`}>{street ||
                            <span className={"text-red-600 text-sm"}>Please add address to profile.</span>}</div>
                        <div className={`${editMode ? "visible" : "hidden"}`}>
                            <input type={"text"} id={"address"} autoComplete={"true"}
                                   className={"min-w-[300px] text-sm"}
                                   placeholder={street || "Enter street address here..."}
                                   onChange={(e) => {
                                       setStreet(e.target.value)
                                       setDataChanged(true)
                                   }}
                            />
                        </div>
                    </div>

                    <div>
                        <p className={"text-gray-500 text-xs dark:text-gray-400"}>City</p>
                        <div className={`${editMode ? "hidden" : "visible"}`}>{city ||
                            <span className={"text-red-600 text-sm"}>Please add city to profile.</span>}</div>
                        <div className={`${editMode ? "visible" : "hidden"}`}>
                            <input type={"text"} id={"city"}
                                   className={"min-w-[300px] text-sm"}
                                   placeholder={city || "Enter city here..."}
                                   onChange={(e) => {
                                       setCity(e.target.value)
                                       setDataChanged(true)
                                   }}
                            />
                        </div>
                    </div>

                    <div>
                        <p className={"text-gray-500 text-xs dark:text-gray-400"}>State</p>
                        <div className={`${editMode ? "hidden" : "visible"}`}>{state ||
                            <span className={"text-red-600 text-sm"}>Please add state to profile.</span>}</div>
                        <div className={`${editMode ? "visible" : "hidden"}`}>
                            <input type={"text"} id={"state"}
                                   className={"min-w-[300px] text-sm"}
                                   value={state}
                                   placeholder={state || "Enter state here..."}
                                   onChange={(e) => {
                                       setState(e.target.value)
                                       setDataChanged(true)
                                   }}
                            />
                        </div>
                    </div>

                    <div>
                        <p className={"text-gray-500 text-xs dark:text-gray-400"}>Zip Code</p>
                        <div className={`${editMode ? "hidden" : "visible"}`}>{zip ||
                            <span className={"text-red-600 text-sm"}>Please add zip code to profile.</span>}</div>
                        <div className={`${editMode ? "visible" : "hidden"}`}>
                            <input type={"text"} id={"zip"}
                                   className={"min-w-[300px] text-sm"}
                                   value={zip}
                                   placeholder={zip || "Enter zip code here..."}
                                   onChange={(e) => {
                                       setZip(e.target.value)
                                       setDataChanged(true)
                                   }}
                            />
                        </div>
                    </div>

                    <p className={"text-gray-500 text-xs mt-4 dark:text-gray-400"}>Programs</p>
                    <ul>
                        {viewingUser.programs && viewingUser.programs.map((program, i) => (
                            <li key={i}>{program}</li>
                        ))}
                    </ul>
                </div>
                <div className={"flex justify-end"}>
                    <div>
                        <button
                            disabled={!dataChanged}
                            className={"py-2 px-6 text-white text-sm rounded bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400 cursor-pointer"}
                            onClick={saveClientDetails}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientDetails;
