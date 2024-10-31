"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <div dangerouslySetInnerHTML={{ __html: search ?? "" }} />;
}
