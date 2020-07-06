import { shallowMount, createLocalVue } from '@vue/test-utils'
import Profile from '@/components/Profile.vue'
import BootstrapVue from 'bootstrap-vue'

let wrapper

describe('Profile.vue', () => {
  const localVue = createLocalVue()

  localVue.use(BootstrapVue)

  beforeEach(() => {
    wrapper = shallowMount(Profile, {
      localVue,
      mocks: {
        $t: jest.fn(),
      },
      firestore: jest.fn()
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