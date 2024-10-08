import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

import { Form, FormDescription } from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import MenuItemsSection from "./MenuItemsSection";
import ImageSection from "./ImageSection";
import { Restaurant } from "@/types/types";

const formSchema = z
  .object({
    restaurantName: z.string().min(1, "Name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    deliveryPrice: z.coerce.number({
      required_error: "Delivery Price is required",
      invalid_type_error: "Must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated Delivery Time is required",
      invalid_type_error: "Must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty("Please select at least one item"),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "Required"),
        price: z.coerce.number().min(1, "Required"),
      })
    ),
    // in update scenario, need to make both optional as they are interdepenedent
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Required" }).optional(),
  })
  .refine((schemaData) => schemaData.imageUrl || schemaData.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  currentRestaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({
  currentRestaurant,
  onSave,
  isLoading,
}: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [], // need to have some array render in the first instance
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!currentRestaurant) {
      return;
    }

    // convert back the prices
    const deliveryPriceFormatted = parseInt(
      (currentRestaurant.deliveryPrice / 100).toFixed(2)
    );

    const menuItemsFormatted = currentRestaurant.menuItems.map((menuItem) => ({
      ...menuItem,
      price: parseInt((menuItem.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...currentRestaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, currentRestaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString() // convert price to lowest currency denomination (e.g. pence)
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );

    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 rounded-lg md:p-10"
      >
        <div>
          <h1 className="text-2xl font-bold">Manage Restaurant</h1>
          <FormDescription>
            Add and edit your restaurant details
          </FormDescription>
        </div>
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuItemsSection />
        <Separator />
        <ImageSection />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500 w-full md:w-fit">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
