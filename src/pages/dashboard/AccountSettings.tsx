import AccountPermissions from "../../components/settings/AccountPermissions";
import AccountSettingsForm from "../../components/settings/AccountSettingForm";
import PageContainer from "../../components/ui/PageContainer";

export default function AccountSettings() {

    return (
        <PageContainer title="Account Settings">
            <AccountSettingsForm />
            <AccountPermissions />
        </PageContainer>
    );
}