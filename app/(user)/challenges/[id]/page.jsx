import { ClientChallengePage } from "./ClientChallengePage";

export default async function ChallengePage(props) {
  const { params } = await props;
  const { id } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/challenges/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div>Challenge not found.</div>;
  }

  const challenge = await res.json();

  return <ClientChallengePage challenge={challenge} />;
}
