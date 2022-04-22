import {shallow} from 'enzyme'
import { findByTestAttr, checkProps } from "../test/testUtils";
import App from './App'
/**
 * 
 * The setup function for app component
 * returns a shallow wrapper of the app component
 * @returns {shallowwrapper}
 */
const setup = () => {
    return shallow(<App  />)
}

//  Test that the app component appears
test('renders without error', () => {
    const wrapper = setup()
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent).toHaveLength(1)
})