import {ElementType, ComponentPropsWithRef, forwardRef} from 'react';
import type {SectionProps as ChildProps} from '@/types/main';
import type {Route} from '@/globals/routes'

type SectionOwnProps = ChildProps & {
  route: Route;
}

type SectionProps<E extends ElementType> = SectionOwnProps &
    ComponentPropsWithRef<E> &
    Omit<ComponentPropsWithRef<E>, keyof SectionOwnProps>

const Section = forwardRef(
    <E extends ElementType>(
        {
            route,
            ...props
        }: SectionProps<E>,
        ref: ComponentPropsWithRef<E>['ref']
    ) => {
        const Component = route.component;

        return (
            <Component ref={ref} {...props} />
        )
    },
)

Section.displayName = 'Section';

export default Section;
