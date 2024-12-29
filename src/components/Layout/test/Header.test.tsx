import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Header from '../Header';
import { MemoryRouter } from 'react-router-dom';

describe('Render Test', () => {
  test('Header가 정상적으로 렌더링되어야 한다', () => {
    render(
      <MemoryRouter>
        <Header isFilterExists={false} />
      </MemoryRouter>,
    );
    const logoImage = screen.getByAltText(/gotcha/i);

    expect(logoImage).toBeInTheDocument();
  });

  test('Home 또는 Bookmark 페이지에서 Filter 버튼이 생겨야 한다', () => {
    const pathList = ['/', '/bookmark'];

    pathList.forEach((path) => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <Header isFilterExists={false} />
        </MemoryRouter>,
      );

      const filterButton = screen.getByText(/Filter/i);
      expect(filterButton).toBeInTheDocument();

      cleanup();
    });
  });

  // 추후에 filter-slide role 이름 제거 후 다른 Element로 변경 필요
  test('Home 또는 Bookmark 페이지에서 저장된 필터 데이터가 있을 경우 데이터를 보여주는 슬라이드가 생겨야 한다', () => {
    const pathList = ['/', '/bookmark'];

    pathList.forEach((path) => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <Header isFilterExists={true} />
        </MemoryRouter>,
      );

      const filterButton = screen.getByRole('filter-slide');
      expect(filterButton).toBeInTheDocument();

      cleanup();
    });
  });

  test('모바일에서 첫 페이지를 제외하고는 뒤로가기 버튼이 생겨야 한다', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header isFilterExists={true} />
      </MemoryRouter>,
    );
  });
});

describe('Navigation Test', () => {
  // 추후에 screen.getByText('Home') 다른 Element로 변경 필요
  test('로고를 클릭하면 Home으로 이동해야 한다', () => {
    render(
      <MemoryRouter>
        <Header isFilterExists={true} />
      </MemoryRouter>,
    );

    const logoImage = screen.getByAltText(/gotcha/i);

    userEvent.click(logoImage);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('각각의 네비게이션 메뉴를 클릭하면 해당하는 페이지로 이동해야 한다', () => {});

  test('모바일에서 뒤로가기 버튼을 클릭하면 이전 페이지로 이동해야 한다', () => {
    render(
      <MemoryRouter>
        <Header isFilterExists={true} />
      </MemoryRouter>,
    );
  });
});
