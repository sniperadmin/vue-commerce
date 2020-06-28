import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {

  const wrapper = shallowMount(App, {
    mocks: {
      $t: () => {
        // something
      },
    }
  })
  
  it('renders props.msg when passed', () => {
    const app = wrapper.find('.flyout')
    expect(app.exists()).toBe(true)
  })
})
