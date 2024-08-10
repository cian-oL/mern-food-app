import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  searchQuery: z.string({ required_error: "Restaurant name required" }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (formData: SearchForm) => void;
  placeholder: string;
  onReset?: () => void;
};

const SearchBar = ({ onSubmit, placeholder, onReset }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
  });

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center flex-1 flex-row justify-between gap-3 p-3 mx-5 border-2 rounded-full ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={(field) => (
            <FormItem className="flex-1">
              <Input
                {...field}
                placeholder={placeholder}
                className="border-none shadow-none text-xl focus-visible:ring-0"
              />
            </FormItem>
          )}
        />
        {form.formState.isDirty && (
          <Button
            type="button"
            onClick={handleReset}
            variant="outline"
            className="rounded-full"
          >
            Clear
          </Button>
        )}
        <Button type="submit" className="rounded-full bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  );
};
export default SearchBar;
