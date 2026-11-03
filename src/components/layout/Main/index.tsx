import { routes } from "@/globals/routes";
import type { Content } from "@/types/main";

type Props = {
  content: Record<string, Content>;
};

export default function Main({ content }: Props) {
  return (
    <main>
      {routes.map(({ id, component: Section }) => (
        <Section key={id} {...content[id]} id={id} />
      ))}
    </main>
  );
}
