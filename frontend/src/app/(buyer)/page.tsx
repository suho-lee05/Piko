const bestProducts = [
  { id: "best-1", title: "장인 수제 머그", price: "32,000원" },
  { id: "best-2", title: "프리미엄 원목 도마", price: "45,000원" },
  { id: "best-3", title: "친환경 패브릭 가방", price: "28,000원" },
  { id: "best-4", title: "제조사 협업 캔들", price: "19,000원" },
];

const newProducts = [
  { id: "new-1", title: "스테인리스 텀블러", price: "24,000원" },
  { id: "new-2", title: "미니멀 식기 세트", price: "52,000원" },
  { id: "new-3", title: "천연 방향제", price: "17,000원" },
  { id: "new-4", title: "핸드메이드 액자", price: "36,000원" },
];

const categoryProducts = [
  { id: "cat-1", title: "라이프스타일", price: "인기 120개" },
  { id: "cat-2", title: "주방/리빙", price: "인기 86개" },
  { id: "cat-3", title: "패션/잡화", price: "인기 64개" },
  { id: "cat-4", title: "문구/디자인", price: "인기 42개" },
];

type ProductItem = {
  id: string;
  title: string;
  price: string;
};

function ProductGrid({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: ProductItem[];
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="aspect-[4/5] bg-slate-100">
              <img
                src="/product-placeholder.svg"
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-1 px-4 py-3">
              <h3 className="text-base font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500">{item.price}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function BuyerHomePage() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-10">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <img
            src="/banner-placeholder.svg"
            alt="P:Ko Market 배너"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-16">
        <ProductGrid
          title="Best"
          description="가장 사랑받는 국내 제조 베스트 상품"
          items={bestProducts}
        />
        <ProductGrid
          title="New"
          description="새롭게 입점한 제조사 신상품"
          items={newProducts}
        />
        <ProductGrid
          title="카테고리별 추천"
          description="관심 카테고리에서 인기 상품을 만나보세요"
          items={categoryProducts}
        />
      </main>
    </div>
  );
}
