import React from 'react'
import SubNav from '../SubNav'
import {render} from '../utils/testing'
import {render as HTMLRender, cleanup} from '@testing-library/react'
import {axe, toHaveNoViolations} from 'jest-axe'
import 'babel-polyfill'
expect.extend(toHaveNoViolations)

describe('SubNav.Link', () => {
  it('renders an <a> by default', () => {
    expect(render(<SubNav.Link />).type).toEqual('a')
  })

  it('has default theme', () => {
    expect(SubNav.Link).toSetDefaultTheme()
  })

  it('should have no axe violations', async () => {
    const {container} = HTMLRender(<SubNav.Link />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    cleanup()
  })

  it('renders the given "as" prop', () => {
    const Type = ({theme, ...props}) => <b {...props} />
    expect(render(<SubNav.Link as={Type} />)).toMatchSnapshot()
  })

  it('respects the "selected" prop', () => {
    expect(render(<SubNav.Link selected />)).toMatchSnapshot()
  })

  it('adds activeClassName={SELECTED_CLASS} when it gets a "to" prop', () => {
    const Mock = jest.fn(() => <div />)
    render(<SubNav.Link as={Mock} to="#" />)
    expect(Mock.mock.calls[0][0].to).toEqual('#')
    expect(Mock.mock.calls[0][0].activeClassName).toEqual('selected')
  })
})
