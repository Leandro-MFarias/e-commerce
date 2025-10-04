import { Categories } from "./_components/home/categories";
import { Header } from "./_components/header/header";
import { ProductList } from "./_components/home/productList";

export default function Home() {
  return (
    <div>
      <Header />
      <Categories />
      <ProductList />
    </div>
  );
}
