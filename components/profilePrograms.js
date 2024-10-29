import {XCircle} from "phosphor-react";
import ProfileSectionStyle from "./ProfileSectionStyle";
import {ProgramsList}  from "../lib/lists";

function ProfilePrograms({programs, setPrograms}) {

    const getFieldClass = (required, value) => {
        if(required){
            return value.length ? 'border-gray-300' : 'border-red-500';
        }
    };

    return (
            <ProfileSectionStyle title={`Programs`}>
                    <h2 className={"uppercase text-gray-600 font-light mb-3 dark:text-white"}>Available Programs</h2>
                    <select className={`h-[260px] w-full border-2 ${getFieldClass(true, programs)}`} multiple onChange={(e) => {
                        setPrograms(prevState => {
                            if (programs.indexOf(e.target.value) === -1) {
                                return [...prevState, e.target.value]
                            } else {
                                return prevState
                            }
                        })
                    }}>
                        {
                            ProgramsList.map((program, i) => {
                                return (
                                    <option key={i} value={program}>{program}</option>
                                )
                            })
                        }
                    </select>
                    <h2 className={"uppercase text-gray-600 font-light mb-3 mt-6 dark:text-white"}>Your Selected Programs<span className={"text-red-600"}>*</span></h2>
                    <div className={"lg:flex-1 flex flex-wrap"}>
                        {programs.map(program => (
                            <div className={"cursor-pointer rounded border py-1 px-2 min-h-8 mr-2 mb-2 flex justify-between align-middle text-sm w-auto bg-indigo-600 text-white"} key={program}
                                 onClick={() => {
                                     setPrograms(prevState => prevState.filter(item => item !== program))
                                 }}>
                                <div className={"inline-block"}>{program}</div>
                                <div className={"inline-block"}><XCircle size={20} weight="regular" color={"white"}/></div>
                            </div>
                        ))}
                    </div>
            </ProfileSectionStyle>
    );
}

export default ProfilePrograms;
