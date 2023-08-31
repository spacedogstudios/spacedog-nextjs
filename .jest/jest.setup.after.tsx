// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}));

jest.mock('../src/lib/parseContent');

