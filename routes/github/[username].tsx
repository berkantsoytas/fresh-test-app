/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";

interface User {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
}

export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const { username } = ctx.params;
    const resp = await fetch(`https://api.github.com/users/${username}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const user: User = await resp.json();
    return ctx.render(user);
  },
};

export default function Page({ data }: PageProps<User | null>) {
  console.log(data);

  if (!data) {
    return <h1>not found!</h1>;
  }

  return (
    <div>
      <img src={data.avatar_url} width={64} height={64} />
      <h1>{data.name}</h1>
      <p>{data.login}</p>
      <p>
        <a href={data.html_url} target="_blank" rel="noopener noreferrer">
          Go to {data.name} github page.
        </a>
      </p>
    </div>
  );
}
