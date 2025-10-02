import { Categories } from "./_components/categories";
import { Header } from "./_components/header";
import { ProductList } from "./_components/productList";

export default function Home() {
  return (
    <div className="">
      <Header />
      <Categories />
      <ProductList />
    </div>
  );
}
