interface ParamsProp {
  params: { id: string };
}

export default async function ProductPage({ params }: ParamsProp) {
  const { id } = await params;

  return <div>{id}</div>;
}
