import {ReactElement} from 'react';
import {Props as SubheadingProps} from '@/components/ui/Subheading';

export type Content = {
    route_id: string;
    subheading?: string;
    tagline?: string;
    body?: string;
    jsx?: ReactElement[]
}

export type SectionProps = Partial<SubheadingProps> & React.ComponentPropsWithRef<any> & {
    jsx?: ReactElement[]
}
