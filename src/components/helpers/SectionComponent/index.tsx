import type { SectionProps as ChildProps } from "@/types/main";
import type { Route } from "@/globals/routes";

type SectionProps = ChildProps & {
  route: Route;
};

// React 19 passes `ref` as a regular prop, so no forwardRef is needed.
export default function Section({ route, ...props }: SectionProps) {
  const Component = route.component;

  return <Component {...props} />;
}
