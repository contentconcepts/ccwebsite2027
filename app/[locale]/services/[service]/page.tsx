export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; service: string }>
}) {
  const { service } = await params
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">{service}</h1>
    </main>
  )
}
