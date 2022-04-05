import React from 'react';
import renderer from 'react-test-renderer';
import Container from '../index';

describe('Container', function () {
  it('should render correctly', () => {
    const container = renderer
      .create(
        <Container>
          <div>Hello world</div>
        </Container>,
      )
      .toJSON();

    expect(container).toMatchSnapshot();
  });
});
