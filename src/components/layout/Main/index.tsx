import SectionComponent from '@/components/helpers/SectionComponent';
import HomeSection from '@/components/layout/HomeSection';

import {routes} from '@/globals/routes';
import type {Content} from '@/types/main';

type Props = {
  className?: string,
  content: Record<string, Content>
}

export default function Main({className, content}: Props) {
  return (
    <main className={className}>
      {routes.map(route => {
        const sectionContent = content[route.id];

        if (route.id === 'home') {
          return (
            <HomeSection
              key={route.id}
              route={route}
              {...sectionContent}
            />
          );
        }

        return (
          <SectionComponent
            key={route.id}
            route={route}
            {...sectionContent}
          />
        )}
      )}
    </main>
  )
}
