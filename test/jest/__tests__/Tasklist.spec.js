import { mount } from '@vue/test-utils'
import TasklistClosed from '../../../src/components/TasklistClosed'
import {describe, expect, it} from "@jest/globals";


describe('TasklistClosed', () => {
  // Inspect the raw component options
  it('has data', () => {
    expect(typeof TasklistClosed.data).toBe('function')
  })
})
