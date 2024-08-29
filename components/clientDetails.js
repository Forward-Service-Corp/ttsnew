import React, {useState} from 'react';
import {WICountiesList} from "../lib/WI_Counties";

function ClientDetails({viewingUser}) {
    const [client, setClient] = useState({
        name: viewingUser.name ? viewingUser.name : "",
        email: viewingUser.email ? viewingUser.email : "",
        street: viewingUser.street ? viewingUser.street : "",
        city: viewingUser.city ? viewingUser.city : "",
        homeCounty: viewingUser.homeCounty ? viewingUser.homeCounty : "",
        state: viewingUser.state ? viewingUser.state : "",
        zip: viewingUser.zip ? viewingUser.zip : "",
        county: viewingUser.county ? viewingUser.county : [],
        phone: viewingUser.phone ? viewingUser.phone : "",
        coach: viewingUser.coach ? viewingUser.coach : [],
        programs: viewingUser.programs ? viewingUser.programs : [],
    });

    const [dataChanged, setDataChanged] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setClient((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setDataChanged(true)
    };

    const handleCountyChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setClient((prevData) => ({
            ...prevData,
            county: selectedOptions
        }));
        setDataChanged(true)
    };

    async function saveClientDetails() {
        const {name, street, city, homeCounty, state, zip, county, phone} = client
        await fetch("/api/save-client-details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, street, city, homeCounty, state, zip, county, phone,
                userId: viewingUser._id
            })
        })
        await setDataChanged(false)
        await setEditMode(false)
    }

    return (
        <div
            className={`mt-5 p-6 border rounded`}>
            <div className={"flex justify-between"}>
                <div><h2 className={"uppercase text-gray-500 mb-3 "}>Personal Details</h2></div>
                <button className={`p-2 text-white text-xs min-w-[140px] ${!editMode ? "bg-indigo-600" : "bg-red-600"}`}
                        onClick={() => {
                            setEditMode(!editMode)
                        }}>{!editMode ? "Edit Client" : "Cancel Editing"}</button>
            </div>
            <div className={"grid grid-cols-2 gap-5"}>
                <div className={""}>
                    <label htmlFor="name" className={`text-xs text-gray-500`}>First and Last Name
                        <input type={"text"} name={"name"}
                               disabled={!editMode}
                               className={"w-full text-sm block mt-2 disabled:border-gray-200 text-gray-400"}
                               placeholder={"Enter name here..."}
                               value={client.name}
                               onChange={handleChange}/>
                    </label>
                    <label htmlFor="email" className={`text-xs text-gray-500 mt-6 block`}>Email
                        <input disabled={true} type={"text"} name={"email"}
                               className={"w-full text-sm block mt-2 disabled:border-gray-200 text-gray-400"}
                               value={client.email}
                               onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="phone" className={`text-xs text-gray-500 mt-6 block`}>Phone Number
                        <input type={"text"} name={"phone"}
                               disabled={!editMode}
                               className={"w-full text-sm block mt-2 disabled:border-gray-200 text-gray-400"}
                               placeholder={"Enter phone number here..."}
                               onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="county" className={`text-xs text-gray-500 mt-6 block`}>Service Counties
                        <span
                            className={`block text-red-600 font-bold mb-2`}>CTRL + Click to select multiple counties</span>
                        <select multiple value={client.county} className={"w-full min-h-[270px] text-sm block mt-2 disabled:border-gray-200 text-gray-400"}
                                name={"county"} onChange={handleCountyChange} disabled={!editMode}>
                            {WICountiesList.map(county => {
                                return <option key={county} value={county}>{county}</option>
                            })}
                        </select>
                    </label>
                </div>

                <div className={""}>
                    <label htmlFor="street" className={`text-xs text-gray-500`}>Street Address
                        <input type={"text"} name={"street"}
                               disabled={!editMode}
                               value={client.street}
                               className={"w-full text-sm block mt-2 disabled:border-gray-200 text-gray-400"}
                               placeholder={"Enter street address here..."}
                               onChange={handleChange}/>
                    </label>
                    <label htmlFor="city" className={`text-xs text-gray-500 mt-6 block`}>City
                        <input type={"text"} name={"city"}
                               disabled={!editMode}
                               value={client.city}
                               className={"w-full text-sm block mt-2 disabled:border-gray-200 text-gray-400"}
                               placeholder={"Enter city here..."}
                               onChange={handleChange}/>

                    </label>
                    <label htmlFor="state" className={`text-xs text-gray-500 mt-6 block`}>State
                        <input type={"text"} name={"state"}
                               className={"w-full text-sm block mt-2 disabled:border-gray-200 text-gray-400"}
                               disabled={!editMode}
                               value={client.state}
                               placeholder={"Enter state here..."}
                               onChange={handleChange}/>
                    </label>
                    <label htmlFor="zip" className={`text-xs text-gray-500 mt-6 block`}>Zip
                        <input type={"text"} name={"zip"}
                               className={"w-full text-sm block mt-2 disabled:border-gray-200 text-gray-400"}
                               disabled={!editMode}
                               value={client.zip}
                               placeholder={"Enter zip code here..."}
                               onChange={handleChange}/>
                    </label>
                    <p className={"text-gray-500 text-xs mt-6 block"}>Programs</p>
                    {client.programs && client.programs.map((program, i) => (
                        <div className={`text-sm bg-amber-300 text-black mt-2 p-2`} key={i}>{program}</div>
                    ))}

                    <p className={"text-gray-500 text-xs mt-6 block"}>Coaches</p>
                    {client.coach && client.coach.map((coach, i) => (
                        <div className={`text-sm bg-sky-600 text-black mt-2 p-2`} key={i}>
                            <a className={"underline text-white"}
                            href={`mailto:${coach}`}>{coach}</a>
                        </div>
                    ))}

                </div>
            </div>
            <div className={"text-right pt-8"}>
                <button
                    disabled={!dataChanged}
                    className={`p-2 text-white text-xs min-w-[140px] bg-green-600 disabled:bg-gray-300 ${editMode ? 'visible' : 'hidden'}`}
                    onClick={saveClientDetails}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default ClientDetails;
