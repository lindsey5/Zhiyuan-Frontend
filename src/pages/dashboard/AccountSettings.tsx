import AccountPermissions from "../../components/account/AccountPermissions";
import AccountSettingsForm from "../../components/account/AccountSettingForm";
import PageContainer from "../../components/ui/PageContainer";

export default function AccountSettings() {

    return (
        <PageContainer 
            title="Account Settings"
            description="Update your profile and security settings."
        >
            <AccountSettingsForm />
            <AccountPermissions />
        </PageContainer>
    );
}