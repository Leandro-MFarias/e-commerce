import { Header } from "@/app/_components/header/header";
import { Product } from "@/app/_components/product/product";

interface ParamsProp {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ParamsProp) {
  const { id } = await params;

  return (
    <div>
      <Header />
      <Product productId={id} />
    </div>
  );
}
