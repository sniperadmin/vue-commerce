import { shallowMount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import SidebarBrand from '@/components/shared/admin/sidebar/SidebarBrand.vue'

let wrapper

describe('SidebarBrand.vue', () => {
  const localVue = createLocalVue()

  localVue.use(BootstrapVue)
  localVue.use(Router)

  const router = new Router()

  beforeEach(() => {
    wrapper = shallowMount(SidebarBrand, {
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