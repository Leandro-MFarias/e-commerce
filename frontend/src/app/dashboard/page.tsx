import { SideBar } from "../_components/dashboard/sidebar";
import { ProducsDataTable } from "../_components/table/products-datatable";

export default async function Dashboard() {
  return (
    <div className="flex md:h-screen">
      <SideBar />
      <div className="flex w-full px-14 md:h-screen">
        <ProducsDataTable />
      </div>
    </div>
  );
}
