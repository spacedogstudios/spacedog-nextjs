import {ReactElement} from 'react';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeReact from 'rehype-react';
import * as prod from 'react/jsx-runtime';

import type {Content} from '@/types/main';

// @ts-expect-error: the react types are missing.
const production = {Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs}

async function markdownToReact(item: Content): Promise<ReactElement[]> {
    const jsx:ReactElement[] = [];

    if (item.body) {
        const body = JSON.parse(item.body);

        for (const bodyText of body) {
            const file = await unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypeSanitize)
                .use(rehypeReact, production)
                .process(bodyText);

            jsx.push(file.result)
        }
    }

    return jsx;
}

export default async function parseContent(content: Content[]): Promise<Record<string, Content>> {
    await Promise.all(content.map(async (item: Content) => item.jsx = await markdownToReact(item)));
    return content.reduce((result: Record<string, Content>, item) => {
        result[item.route_id] = {...item};
        return result;
    }, {});
}
