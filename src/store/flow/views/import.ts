import {ILanguage} from '@floip/flow-runner/dist/flow-spec/ILanguage'
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlock, IContext} from '@floip/flow-runner'
import {cloneDeep, difference, differenceWith, find, findIndex, get, isEmpty, isEqual, join, keys, reject, set, uniq} from 'lodash'
import {IContactPropertyOption} from '../block-types/Core_SetContactPropertyStore'
import {IGroupOption} from '../block-types/Core_SetGroupMembershipStore'

import {
  checkSingleFlowOnly,
  detectedGroupChanges,
  detectedLanguageChanges,
  detectedPropertyChanges,
  getGroupBlocks,
  getPropertyBlocks,
  updateResourcesForLanguageMatch,
} from '../utils/importHelpers'

export const getters: GetterTree<IImportState, IRootState> = {
  languagesMissing: (state) => !isEmpty(state.missingLanguages),
  propertiesMissing: (state) => !isEmpty(state.missingProperties),
  groupsMissing: (state) => !isEmpty(state.missingGroups),
  hasUnsupportedBlockClasses: (state, getters) => !isEmpty(getters.unsupportedBlockClasses),
  unsupportedBlockClasses: (state, getters, _rootState, rootGetters) => difference(getters.uploadedBlockTypes, rootGetters.blockClasses),
  unsupportedBlockClassesList: (state, getters) => join(getters.unsupportedBlockClasses, ', '),
  uploadedBlockTypes: (state) => uniq(get(state.flowContainer, 'flows[0].blocks', []).map((block: IBlock) => block.type)),
}

export const mutations: MutationTree<IImportState> = {
  setUpdating(state, updatingStatus) {
    state.updating = updatingStatus
  },
  baseReset(state) {
    state.flowContainer = null
    state.flowJsonText = ''
    state.flowError = ''
    state.propertyBlocks = []
    state.groupBlocks = []
  },
  resetLanguageMatching(state) {
    state.matchingLanguages = []
    state.missingLanguages = []
    state.existingLanguagesWithoutMatch = []
  },
  resetPropertyMatching(state) {
    state.matchingLanguages = []
    state.blocksMissingProperties = {}
    state.missingProperties = []
    state.existingPropertiesWithoutMatch = []
  },
  resetGroupMatching(state) {
    state.matchingGroups = []
    state.blocksMissingGroups = {}
    state.missingGroups = []
    state.existingGroupsWithoutMatch = []
  },
  addMissingLanguage(state, language) {
    state.missingLanguages.push(language)
  },
  setMissingLanguages(state, languages) {
    state.missingLanguages = languages
  },
  setMatchingLanguages(state, languages) {
    state.matchingLanguages = languages
  },
  setExistingLanguagesWithoutMatch(state, languages) {
    state.existingLanguagesWithoutMatch = languages
  },
  setFlowLanguages(state, languages) {
    if (state.flowContainer) {
      state.flowContainer.flows[0].languages = languages
    } else {
      throw new Error('flowContainer is not set')
    }
  },
  setFlowResources(state, resources) {
    if (state.flowContainer) {
      state.flowContainer.resources = resources
    } else {
      throw new Error('flowContainer is not set')
    }
  },
  addFlowLanguage(state, language) {
    if (state.flowContainer) {
      state.flowContainer.flows[0].languages.push(language)
    } else {
      throw new Error('flowContainer is not set')
    }
  },
  setFlowJsonText(state, text) {
    state.flowJsonText = text
  },
  setFlowContainer(state, flowContainer) {
    state.flowContainer = flowContainer
  },
  setFlowContainerBlocks(state, blocks) {
    if (state.flowContainer) {
      set(state.flowContainer, 'flows[0].blocks', blocks)
    }
  },
  setFlowErrorWithInterpolations(state, { text, interpolations }) {
    state.flowError = text
    state.flowErrorInterpolations = interpolations
  },
  setFlowError(state, text) {
    state.flowError = text
    state.flowErrorInterpolations = null
  },
  setGroupBlocks(state, groupBlocks) {
    state.groupBlocks = groupBlocks
  },
  setPropertyBlocks(state, propertyBlocks) {
    state.propertyBlocks = propertyBlocks
  },
  setBlocksMissingProperties(state, blocksMissingProperties) {
    state.blocksMissingProperties = blocksMissingProperties
  },
  setMissingProperties(state, missingProperties) {
    state.missingProperties = missingProperties
  },
  setMatchingProperties(state, matchingProperties) {
    state.matchingProperties = matchingProperties
  },
  setExistingPropertiesWithoutMatch(state, existingPropertiesWithoutMatch) {
    state.existingPropertiesWithoutMatch = existingPropertiesWithoutMatch
  },
  setBlocksMissingGroups(state, blocksMissingGroups) {
    state.blocksMissingGroups = blocksMissingGroups
  },
  setMissingGroups(state, missingGroups) {
    state.missingGroups = missingGroups
  },
  setMatchingGroups(state, matchingGroups) {
    state.matchingGroups = matchingGroups
  },
  setExistingGroupsWithoutMatch(state, existingGroupsWithoutMatch) {
    state.existingGroupsWithoutMatch = existingGroupsWithoutMatch
  },
}

export const actions: ActionTree<IImportState, IRootState> = {
  async setFlowJson({commit, state, dispatch}, value: string) {
    commit('setFlowError', '')
    commit('setFlowJsonText', value)
    let flowContainer
    try {
      // check valid json
      flowContainer = JSON.parse(state.flowJsonText)
    } catch (e) {
      commit('resetLanguageMatching')
      commit('resetPropertyMatching')
      commit('resetGroupMatching')
      commit('setFlowError', 'flow-builder.invalid-json-provided')
      return
    }

    //We know it's valid JSON at least. Let's display it correctly formatted
    commit('setFlowJsonText', JSON.stringify(flowContainer, null, 2))

    if (!checkSingleFlowOnly(flowContainer)) {
      commit('setFlowError', 'flow-builder.importer-currently-supports-single-flow-only')
      return
    }
    const validationErrors = await dispatch('validation/validate_flowContainer', { flowContainer }, { root: true })
    if (!validationErrors.isValid) {
      commit('setFlowErrorWithInterpolations', { text: 'flow-builder.flow-invalid', interpolations: { version: flowContainer.specification_version } })
      return
    }

    const oldFlowContainer = cloneDeep(state.flowContainer)
    const newFlowContainer = cloneDeep(flowContainer)
    commit('setFlowContainer', flowContainer)

    if (detectedLanguageChanges({flowContainer: newFlowContainer, oldFlowContainer})) {
      await dispatch('validateLanguages', state.flowContainer)
    }
    // matching on "property_key" == "name" in builder.config.json
    const newPropertyBlocks = getPropertyBlocks(flowContainer)
    if (detectedPropertyChanges({newPropertyBlocks, oldPropertyBlocks: state.propertyBlocks})) {
      commit('setPropertyBlocks', newPropertyBlocks)
      await dispatch('validateProperties', state.propertyBlocks)
    }
    // matching on "group_key" == "id" in builder.config.json
    const newGroupBlocks = getGroupBlocks(flowContainer)
    if (detectedGroupChanges({newGroupBlocks, oldGroupBlocks: state.groupBlocks})) {
      commit('setGroupBlocks', newGroupBlocks)
      await dispatch('validateGroups', state.groupBlocks)
    }
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2))
  },
  async validateLanguages({state, commit, rootGetters}, flowContainer: IContext) {
    const uploadLanguages: ILanguage[] = get(flowContainer, 'flows[0].languages', [])
    const matchingLanguages: ILanguage[] = []
    if (uploadLanguages) {
      uploadLanguages.forEach((language) => {
        const matchingLanguage = find(rootGetters.languages, (orgLanguage) => isEqual(orgLanguage, language))
        if (!matchingLanguage) {
          // Unlike the others we don't reset this.
          // A previously unmatched language can only be fixed by updating or adding a language
          commit('addMissingLanguage', language)
        } else {
          matchingLanguages.push(language)
        }
      })
      commit('setMatchingLanguages', matchingLanguages)
      // Update the languages so we use the org settings for things like id and orgId
      commit('setFlowLanguages', state.matchingLanguages)
      commit('setExistingLanguagesWithoutMatch', differenceWith(rootGetters.languages, state.matchingLanguages, isEqual))
    }
  },
  async validateProperties({rootGetters, state, commit}, newPropertyBlocks: IBlock[]) {
    const matchingProperties: IContactPropertyOption[] = []
    const blocksMissingProperties = cloneDeep(state.blocksMissingProperties)
    newPropertyBlocks.forEach((propertyBlock) => {
      const propertyIdentifier = get(propertyBlock, 'config.set_contact_property.property_key')
      if (propertyIdentifier) {
        const matchingProperty = find(rootGetters.subscriberPropertyFields, (orgProperty) => isEqual(orgProperty.name, propertyIdentifier))
        if (!matchingProperty) {
          // Unlike the others we don't reset this.
          // A previously unmatched property can only be fixed by updating or adding a language
          //
          // Name is all we can get when there isn't a match
          // ...as the block sidebar gets the actual displayLabel by matching
          if (!get(blocksMissingProperties, propertyIdentifier)) {
            blocksMissingProperties[propertyIdentifier] = []
          }
          blocksMissingProperties[propertyIdentifier].push(propertyBlock.uuid)
        } else {
          matchingProperties.push(matchingProperty)
        }
      }
    })
    commit('setBlocksMissingProperties', blocksMissingProperties)

    commit(
      'setMissingProperties',
      keys(state.blocksMissingProperties).map((propertyIdentifier) => ({
        name: propertyIdentifier,
        blockIds: state.blocksMissingProperties[propertyIdentifier],
      })),
    )
    commit('setMatchingProperties', matchingProperties)
    // Update the languages so we use the org settings for things like id and orgId
    commit('setExistingPropertiesWithoutMatch', differenceWith(rootGetters.subscriberPropertyFields, state.matchingProperties, isEqual))
  },

  async validateGroups({rootGetters, state, commit}, newGroupBlocks: IBlock[]) {
    const matchingGroups: IGroupOption[] = []
    const blocksMissingGroups = cloneDeep(state.blocksMissingGroups)
    newGroupBlocks.forEach((groupBlock) => {
      const groupIdentifier = get(groupBlock, 'config.group_key')
      const groupName = get(groupBlock, 'config.group_name')
      if (groupIdentifier) {
        const matchingGroup = find(rootGetters.groups, (orgGroup) => (isEqual(orgGroup.id, groupIdentifier)
          && isEqual(orgGroup.name, groupName)))
        if (!matchingGroup) {
          // Unlike the others we don't reset this.
          // A previously unmatched group can only be fixed by updating or adding a language
          if (!get(blocksMissingGroups, groupIdentifier)) {
            blocksMissingGroups[groupIdentifier] = {group_name: groupName, blockIds: []}
          }
          blocksMissingGroups[groupIdentifier].blockIds.push(groupBlock.uuid)
        } else {
          matchingGroups.push(matchingGroup)
        }
      }
    })
    commit('setBlocksMissingGroups', blocksMissingGroups)

    commit(
      'setMissingGroups',
      keys(state.blocksMissingGroups).map((groupIdentifier) => ({id: groupIdentifier, ...state.blocksMissingGroups[groupIdentifier]})),
    )
    commit('setMatchingGroups', matchingGroups)
    // Update the languages so we use the org settings for things like id and orgId
    commit('setExistingGroupsWithoutMatch', differenceWith(rootGetters.groups, state.matchingGroups, isEqual))
  },
  matchLanguage({commit, state, dispatch}, {oldLanguage, matchingNewLanguage}) {
    commit('addFlowLanguage', matchingNewLanguage)
    commit(
      'setFlowResources',
      updateResourcesForLanguageMatch(get(state.flowContainer, 'resources', []), oldLanguage.id, matchingNewLanguage.id),
    )
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2))
    commit('setMissingLanguages', reject(state.missingLanguages, (language) => isEqual(language, oldLanguage)))
    dispatch('validateLanguages', state.flowContainer)
  },
  matchProperty({commit, state, dispatch}, {oldProperty, matchingNewProperty}) {
    const blocks = cloneDeep(get(state.flowContainer, 'flows[0].blocks'))
    if (!blocks) {
      return
    }
    oldProperty.blockIds.forEach((blockId: string) => {
      const blockIndex = findIndex(blocks, (block: IBlock) => block.uuid === blockId)
      if (blockIndex < 0) {
        return
      }
      set(blocks, `${blockIndex}.config.set_contact_property.property_key`, matchingNewProperty.name)
    })
    commit('setFlowContainerBlocks', blocks)
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2))
    // missingProperties gets updated again when we validate below
    const newBlocksMissingProperties: { [key: string]: string[] } = {}
    commit('setBlocksMissingProperties', keys(state.blocksMissingProperties).reduce((newBlocksMissingProperties, propertyIdentifier) => {
      if (oldProperty.name !== propertyIdentifier) {
        newBlocksMissingProperties[propertyIdentifier] = state.blocksMissingProperties[propertyIdentifier]
      }
      return newBlocksMissingProperties
    }, newBlocksMissingProperties))
    commit('setPropertyBlocks', getPropertyBlocks(state.flowContainer as IContext))
    dispatch('validateProperties', state.propertyBlocks)
  },
  matchGroup({commit, state, dispatch}, {oldGroup, matchingNewGroup}) {
    const blocks = cloneDeep(get(state.flowContainer, 'flows[0].blocks'))
    if (!blocks) {
      return
    }
    oldGroup.blockIds.forEach((blockId: string) => {
      const blockIndex = findIndex(blocks, (block: IBlock) => block.uuid === blockId)
      if (blockIndex < 0) {
        return
      }
      set(blocks, `${blockIndex}.config.group_key`, matchingNewGroup.id)
      set(blocks, `${blockIndex}.config.group_name`, matchingNewGroup.name)
    })
    commit('setFlowContainerBlocks', blocks)
    commit('setFlowJsonText', JSON.stringify(state.flowContainer, null, 2))
    // missingGroups gets updated again when we validate below
    const newBlocksMissingGroups: { [key: string]: { group_name: string, blockIds: string[] } } = {}
    commit('setBlocksMissingGroups', keys(state.blocksMissingGroups).reduce((newBlocksMissingGroups, groupIdentifier) => {
      if (oldGroup.id !== groupIdentifier) {
        newBlocksMissingGroups[groupIdentifier] = state.blocksMissingGroups[groupIdentifier]
      }
      return newBlocksMissingGroups
    }, newBlocksMissingGroups))
    commit('setGroupBlocks', getGroupBlocks(state.flowContainer as IContext))
    dispatch('validateGroups', state.groupBlocks)
  },
}

export interface IImportState {
  matchingLanguages: ILanguage[],
  missingLanguages: ILanguage[],
  existingLanguagesWithoutMatch: ILanguage[],
  blocksMissingProperties: { [key: string]: string[] },
  missingProperties: { name: string, blockIds: string[] }[],
  matchingProperties: IContactPropertyOption[],
  existingPropertiesWithoutMatch: IContactPropertyOption[],
  blocksMissingGroups: { [key: string]: { group_name: string, blockIds: string[] } },
  missingGroups: { id: string, group_name: string, blockIds: string[] }[],
  matchingGroups: IGroupOption[],
  existingGroupsWithoutMatch: IGroupOption[],
  flowContainer: IContext | null,
  flowJsonText: string,
  flowError: string,
  flowErrorInterpolations: null | object,
  propertyBlocks: IBlock[],
  groupBlocks: IBlock[],
  updating: boolean,
}

export const stateFactory = (): IImportState => ({
  matchingLanguages: [],
  missingLanguages: [],
  existingLanguagesWithoutMatch: [],
  blocksMissingProperties: {},
  missingProperties: [],
  matchingProperties: [],
  existingPropertiesWithoutMatch: [],
  blocksMissingGroups: {},
  missingGroups: [],
  matchingGroups: [],
  existingGroupsWithoutMatch: [],
  flowContainer: null,
  flowJsonText: '',
  flowError: '',
  flowErrorInterpolations: null,
  propertyBlocks: [],
  groupBlocks: [],
  updating: false,
})

export default {
  namespaced: true,
  state: stateFactory,
  getters,
  mutations,
  actions,
}
