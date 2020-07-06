import { shallowMount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import Router from 'vue-router'
import Nav from '@/components/shared/Nav.vue'

let wrapper

describe('Nav.vue', () => {
  const localVue = createLocalVue()

  localVue.use(BootstrapVue)
  localVue.use(Router)

  const router = new Router()

  beforeEach(() => {
    wrapper = shallowMount(Nav, {
      localVue,
      router,
      mocks: {
        $t: jest.fn(),
        $i18n: {
          locale: 'en'
        }
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

  // eslint-disable-next-line no-inline-comments
  it('should test logout()', () => {
    const mocklogout = jest.spyOn(wrapper.vm, 'logout')
    const mockconsole = jest.spyOn(console, 'log')

    wrapper.vm.$on('click', mocklogout)
    wrapper.vm.$emit('click')
    expect(mocklogout).toHaveBeenCalled()
    expect(mockconsole.mock.calls[0][0]).toBe('should logout')
  })
})
