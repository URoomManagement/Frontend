import { useRouter } from 'next/router';

export default function ItemPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>User ID: {id}</h1>
      <p>This page is for the item with ID: {id}</p>
    </div>
  );
}
