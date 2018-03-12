/**
 * Created by liubingwen on 2018/3/12.
 */
import Comp from './index'
import {mount} from 'vue-test-utils'
describe('container', () => {
  it('basic', function () {
    const wrapper = mount(Comp)
    expect(wrapper.name()).to.equal('UAnimateContainer')
  })
})
