import { shallowMount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import AppFooter from '@/components/shared/AppFooter.vue'

let wrapper

describe('AppFooter.vue', () => {
  const localVue = createLocalVue()

  localVue.use(BootstrapVue)
  localVue.use(Router)

  const router = new Router()

  beforeEach(() => {
    wrapper = shallowMount(AppFooter, {
      localVue,
      router,
      mocks: {
        $t: jest.fn(),
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    wrapper.destroy()
  })
  
  it('should be vue', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})