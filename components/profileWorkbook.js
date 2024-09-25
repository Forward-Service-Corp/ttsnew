import React from 'react';
import WorkbookToggle from "./workbookToggle";
import ProfileSectionStyle from "./ProfileSectionStyle";

function ProfileWorkbook({user, version, setVersion, setSimpleModal}) {
    return (
        <ProfileSectionStyle title={`Workbook Version`}>
            <div className={`p-4`}>
                <div className={`dark:text-white`}>

                    This application has {version === true ? "an adult" : "a youth"} workbook. If you would like to
                    use that workbook,
                    simply toggle the switch below. You may switch back at any time. If you are unsure
                    which workbook to use, please reach out to your coach. Thank you.
                </div>
                <div className={`mt-8`}>
                    <WorkbookToggle user={user} version={version} setVersion={setVersion}
                                    setSimpleModal={setSimpleModal}/>
                </div>
            </div>
        </ProfileSectionStyle>
    );
}

export default ProfileWorkbook;
