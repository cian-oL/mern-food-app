import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
} from "@/api/myRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isPostLoading } =
    useCreateMyRestaurant();
  const { currentRestaurant, isLoading: isGetLoading } = useGetMyRestaurant();

  if (isGetLoading) {
    return <span>Loading...</span>;
  }

  return (
    <ManageRestaurantForm
      currentRestaurant={currentRestaurant}
      onSave={createRestaurant}
      isLoading={isPostLoading}
    />
  );
};

export default ManageRestaurantPage;
