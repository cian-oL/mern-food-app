import { useGetMyUser, useUpdateMyUser } from "@/api/myUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: IsUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load User Profile</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={IsUpdateLoading}
    />
  );
};

export default UserProfilePage;
