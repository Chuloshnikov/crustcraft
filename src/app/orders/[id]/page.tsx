import OrderContent from "@/components/order/OrderContent";


export default function OrderPage({ params }: { params: { id: string } }) {
  
  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <OrderContent orderId={params.id} />
    </section>
  );
}