import { NewProduct } from "@/app/_components/newProduct";
import { SideBar } from "@/app/_components/sidebar";

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
