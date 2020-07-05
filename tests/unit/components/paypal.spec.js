import { shallowMount, createLocalVue } from '@vue/test-utils'
import PayPal from '@/components/PayPal.vue'
import BootstrapVue from 'bootstrap-vue'

let wrapper

describe('Paypal.vue', () => {
  const localVue = createLocalVue()

  localVue.use(BootstrapVue)

  beforeEach(() => {
    wrapper = shallowMount(PayPal, {
      localVue
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    wrapper.destroy()
  })
  
  it('should be vue', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should test loading setLoaded()', () => {
    setTimeout(() => {
      const mocksetLoaded = jest.spyOn(wrapper.vm, 'setLoaded')
      expect(mocksetLoaded).toHaveBeenCalled()
    }, 2000);
  });
})