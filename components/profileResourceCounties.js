import {XCircle} from "phosphor-react";
import {WICountiesList} from "../lib/WI_Counties";
import ProfileSectionStyle from "./ProfileSectionStyle";
import {useState} from "react";

function ProfileResourceCounties({counties, setCounties}) {

    const [open, setOpen] = useState(false)

    const getFieldClass = (required, value) => {
        if(required){
            return value.length ? 'border-gray-300' : 'border-red-500';
        }
    };

    return (
        <ProfileSectionStyle title={`Resource Counties`} buttonActionTitle={"+ Add "} open={open} setOpen={setOpen}>
            <div className={`${open ? 'visible' : 'hidden'}`}>
                <p className={"text-sm mb-5"}>Select all counties in which you may want
                    to access resources.</p>
                <select className={`h-[260px] w-full border-2 ${getFieldClass(true, counties)}`} multiple={true}
                        onChange={(e) => {
                            setCounties(prevState => {
                                if (counties.indexOf(e.target.value) === -1) {
                                    return [...prevState, e.target.value]
                                } else {
                                    return prevState
                                }
                            })
                        }}>
                    {WICountiesList.map((county) => {
                        return (
                            <option key={county} value={county}>{county}</option>
                        )
                    })}
                </select>
            </div>
                <h2 className={"uppercase text-gray-600 font-light mb-3 mt-6 dark:text-white"}>Your Counties of
                    Resources<span className={"text-red-600"}>*</span></h2>
                <div className={"lg:flex-1 flex flex-wrap"}>
                    {counties.map((currentCounty) => {
                        return (
                            <div key={currentCounty}
                                 className={"cursor-pointer rounded py-1 px-2 min-h-8 mr-2 mb-2 flex justify-between items-center text-xs text-black w-auto bg-yellow-100"}
                                 onClick={() => {
                                     setCounties(prevState => prevState.filter(item => item !== currentCounty))
                                 }}>
                                <div className={"inline-block mr-1 dark:text-white"}>{currentCounty}</div>
                                <div className={"inline-block"}>
                                    <XCircle size={20} weight="regular" color={"red"}/>
                                </div>
                            </div>
                        )
                    })}

                </div>
        </ProfileSectionStyle>
);
}

export default ProfileResourceCounties;
