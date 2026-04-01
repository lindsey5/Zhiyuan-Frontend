import AccountPermissions from "../../components/user/settings/AccountPermissions";
import AccountSettingsForm from "../../components/user/settings/AccountSettingForm";
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