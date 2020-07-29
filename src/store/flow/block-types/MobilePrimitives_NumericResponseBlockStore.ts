import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {IRootState} from '@/store'
import {IBlockExit, SupportedMode, SupportedContentType} from '@floip/flow-runner'
import IdGeneratorUuidV4 from '@floip/flow-runner/dist/domain/IdGeneratorUuidV4'
import INumericResponseBlock from '@floip/flow-runner/src/model/block/INumericResponseBlock'
import {defaults} from 'lodash'
import {IFlowsState} from '../index'

export const BLOCK_TYPE = 'MobilePrimitives\\NumericResponse'

export const getters: GetterTree<IFlowsState, IRootState> = {}

export const mutations: MutationTree<IFlowsState> = {}

export const actions: ActionTree<IFlowsState, IRootState> = {
  async setValidationMinimum({commit, rootGetters}, {blockId, value} : {blockId: string, value: number}) {
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'validationMinimum',
      value
    }, {root: true})
    return value
  },
  async setValidationMaximum({commit, rootGetters}, {blockId, value} : {blockId: string, value: number}) {
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'validationMaximum',
      value
    }, {root: true})
    return value
  },
  async setMaxDigits({commit, rootGetters}, {blockId, value} : {blockId: string, value: number}) {
    commit('flow/block_updateConfigByKey', {
      blockId,
      key: 'ivr',
      value: {
        maxDigits: value
      }
    }, {root: true})
    return value
  },
  async createWith({rootGetters, dispatch, commit}, {props}: {props: {uuid: string} & Partial<INumericResponseBlock>}) {
    const exits: IBlockExit[] = [
      await dispatch('flow/block_createBlockDefaultExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4).generate(),
          tag: 'Default',
          label: 'Default',
        }) as IBlockExit}, {root: true}),
      await dispatch('flow/block_createBlockExitWith', {
        props: ({
          uuid: (new IdGeneratorUuidV4).generate(),
          tag: 'Error',
          label: 'Error',
        }) as IBlockExit}, {root: true}),
    ]

    const blankResource = await dispatch('flow/flow_addBlankResourceForEnabledModesAndLangs', null, {root: true})
    commit('flow/resource_add', {resource: blankResource}, {root: true})

    return defaults(props, {
      type: BLOCK_TYPE,
      name: '',
      label: '',
      semanticLabel: '',
      exits,
      config: {
        prompt: blankResource.uuid,
        validationMinimum: '',
        validationMaximum: '',
      },
    })
  },
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
}