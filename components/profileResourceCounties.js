import {XCircle} from "phosphor-react";
import {WICountiesList} from "../lib/WI_Counties";
import ProfileSectionStyle from "./ProfileSectionStyle";

function ProfileResourceCounties({counties, setCounties}) {

    const getFieldClass = (required, value) => {
        if(required){
            return value.length ? 'border-gray-300' : 'border-red-500';
        }
    };

    return (
            <ProfileSectionStyle title={`Resource Counties`}>
                <p className={"text-indigo-600 text-sm mb-5 dark:text-white"}>Select all counties in which you may want to access resources.</p>
                <select className={`h-[260px] w-full border-2 ${getFieldClass(true, counties)}`} multiple={true} onChange={(e) => {
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
                <h2 className={"uppercase text-gray-600 font-light mb-3 mt-6 dark:text-white"}>Your Counties of Resources<span className={"text-red-600"}>*</span></h2>
                <div className={"lg:flex-1 flex flex-wrap"}>
                    {counties.map((currentCounty) => {
                        return (
                            <div key={currentCounty}
                                 className={"cursor-pointer rounded border py-1 px-2 min-h-8 mr-2 mb-2 flex justify-between align-middle text-sm w-auto bg-indigo-600 text-white"}
                                 onClick={() => {
                                     setCounties(prevState => prevState.filter(item => item !== currentCounty))
                                 }}>
                                <div className={"inline-block mr-1 dark:text-white"}>{currentCounty}</div>
                                <div className={"inline-block"}>
                                    <XCircle size={20} weight="regular" color={"white"}/>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </ProfileSectionStyle>
    );
}

export default ProfileResourceCounties;
