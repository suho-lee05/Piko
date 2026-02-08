type ItemDetailPageProps = {
  params: { id: string };
};

export default function ItemDetailPage({ params }: ItemDetailPageProps) {
  return (
    <section>
      <h2>상품 상세</h2>
      <p>상품 ID: {params.id}</p>
    </section>
  );
}
