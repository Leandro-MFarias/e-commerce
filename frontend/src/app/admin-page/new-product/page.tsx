import { NewProduct } from "@/app/components/newProduct";
import { SideBar } from "@/app/components/sidebar";

export default function NewProductPage() {
  return (
    <div className="flex md:h-screen">
      <SideBar />
      <div className="flex w-full px-14 md:h-screen md:items-center">
        <NewProduct />
      </div>
    </div>
  );
}
