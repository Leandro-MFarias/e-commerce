import { SideBar } from "../_components/sidebar";
import { ProducsDataTable } from "../_components/table/products-datatable";

export default async function AdminPage() {
  return (
    <div className="flex md:h-screen">
      <SideBar />
      <div className="flex w-full px-14 md:h-screen">
        <ProducsDataTable />
      </div>
    </div>
  );
}
