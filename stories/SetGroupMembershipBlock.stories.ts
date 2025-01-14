import Vue from 'vue'
import Vuex from 'vuex'

import SetGroupMembershipBlock from '@/components/interaction-designer/block-types/Core_SetGroupMembershipBlock.vue'

import {IRootState, store} from '@/store'
import SetGroupMembershipStore, {BLOCK_TYPE} from '@/store/flow/block-types/Core_SetGroupMembershipStore'
import {Component} from 'vue-property-decorator'
import {Mutation} from 'vuex-class'
import {BaseMountedVueClass} from './story-utils/storeSetup'
import FlowBuilderSidebarEditorContainer from './story-utils/FlowBuilderSidebarEditorContainer.vue'

Vue.use(Vuex)

export default {
  title: 'Core/Set Group Membership',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
}

const SetGroupMembershipBlockTemplate = `
  <flow-builder-sidebar-editor-container :block="activeBlock">
    <set-group-membership-block
      :block="activeBlock"
      :flow="activeFlow"/>
  </flow-builder-sidebar-editor-container>
`
const baseOptions = {
  components: {SetGroupMembershipBlock, FlowBuilderSidebarEditorContainer},
  template: SetGroupMembershipBlockTemplate,
  store: new Vuex.Store<IRootState>(store),
}

// default state
@Component<any>({
  ...baseOptions,
  async mounted() {
    await this.baseMounted(BLOCK_TYPE, SetGroupMembershipStore)
  },

})
class DefaultClass extends BaseMountedVueClass {
}

export const Default = () => (DefaultClass)

@Component<any>({
  ...baseOptions,
})
class ExistingDataBlockClass extends BaseMountedVueClass {
  @Mutation addContactGroup!: ({group}: { group: any }) => void

  async mounted() {
    const {block: {uuid: blockId}} = await this.baseMounted(BLOCK_TYPE, SetGroupMembershipStore)

    // Add sample data
    this.addContactGroup({
      group: {
        id: 987,
        name: 'Group 1',
      },
    })
    this.addContactGroup({
      group: {
        id: 988,
        name: 'Group 2',
      },
    })

    this.setTags(blockId)
  }
}

export const ExistingDataBlock = () => (ExistingDataBlockClass)
