((typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpflow_builder"] || []).push([[10],{

/***/ "b6b9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "install", function() { return /* reexport */ install; });

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b019c1b8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/ConsoleIO_ReadBlock.vue?vue&type=template&id=45eba13b&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h3',{staticClass:"no-room-above"},[_vm._v(" "+_vm._s(_vm._f("trans")('flow-builder.edit-block-type',{block_type: _vm.trans(("flow-builder." + (_vm.block.type)))}))+" ")]),_c('block-name-editor',{attrs:{"block":_vm.block}}),_c('block-label-editor',{attrs:{"block":_vm.block}}),_c('block-semantic-label-editor',{attrs:{"block":_vm.block}}),_c('block-format-string-editor',{attrs:{"block":_vm.block},on:{"commitFormatStringChange":_vm.setFormatString}}),_vm._l((_vm.destinationVariablesFields),function(variableStringFormat,i){return _c('div',{staticClass:"form-group form-inline"},[_c('text-editor',{attrs:{"label":i+1,"placeholder":_vm._f("trans")('flow-builder.edit-variable'),"value":""},on:{"keydown":_vm.filterVariableName,"input":function($event){return _vm.updatedestinationVariables($event, i)}}})],1)}),_c('first-block-editor-button',{attrs:{"flow":_vm.flow,"block-id":_vm.block.uuid}}),_c('block-id',{attrs:{"block":_vm.block}})],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/ConsoleIO_ReadBlock.vue?vue&type=template&id=45eba13b&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("bee2");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js
var inherits = __webpack_require__("262e");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js + 3 modules
var createSuper = __webpack_require__("2caf");

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__("9ab4");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./node_modules/vuex-class/lib/index.js + 1 modules
var lib = __webpack_require__("4bb5");

// EXTERNAL MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
var vue_property_decorator = __webpack_require__("60a3");

// EXTERNAL MODULE: ./src/components/interaction-designer/resource-editors/ResourceEditor.vue + 20 modules
var ResourceEditor = __webpack_require__("510a");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/NameEditor.vue + 4 modules
var NameEditor = __webpack_require__("f04e");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/LabelEditor.vue + 4 modules
var LabelEditor = __webpack_require__("3411");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/SemanticLabelEditor.vue + 4 modules
var SemanticLabelEditor = __webpack_require__("1b4e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"b019c1b8-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/FormatStringEditor.vue?vue&type=template&id=8ecedac6&
var FormatStringEditorvue_type_template_id_8ecedac6_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('text-editor',{attrs:{"is-editable":_vm.isEditable,"label":_vm._f("trans")('flow-builder.format-string'),"placeholder":_vm._f("trans")('flow-builder.enter-format-string')},model:{value:(_vm.formatString),callback:function ($$v) {_vm.formatString=$$v},expression:"formatString"}})],1)}
var FormatStringEditorvue_type_template_id_8ecedac6_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/FormatStringEditor.vue?vue&type=template&id=8ecedac6&

// EXTERNAL MODULE: ./src/components/common/TextEditor.vue + 4 modules
var TextEditor = __webpack_require__("d883");

// EXTERNAL MODULE: ./src/lib/filters/lang.js
var lang = __webpack_require__("3a37");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-editors/FormatStringEditor.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//


/* harmony default export */ var FormatStringEditorvue_type_script_lang_js_ = ({
  components: {
    TextEditor: TextEditor["a" /* default */]
  },
  mixins: [lang["a" /* default */]],
  props: {
    isEditable: {
      default: true,
      type: Boolean
    },
    block: {
      type: Object,
      required: true
    }
  },
  computed: {
    formatString: {
      get: function get() {
        return this.block.config.format_string;
      },
      set: function set(value) {
        this.$emit('commitFormatStringChange', value);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/FormatStringEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var block_editors_FormatStringEditorvue_type_script_lang_js_ = (FormatStringEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/interaction-designer/block-editors/FormatStringEditor.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  block_editors_FormatStringEditorvue_type_script_lang_js_,
  FormatStringEditorvue_type_template_id_8ecedac6_render,
  FormatStringEditorvue_type_template_id_8ecedac6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FormatStringEditor = (component.exports);
// EXTERNAL MODULE: ./src/components/interaction-designer/flow-editors/FirstBlockEditorButton.vue + 4 modules
var FirstBlockEditorButton = __webpack_require__("192b");

// EXTERNAL MODULE: ./src/components/interaction-designer/block-editors/BlockId.vue + 4 modules
var BlockId = __webpack_require__("792f");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./node_modules/@floip/flow-runner/dist/domain/IdGeneratorUuidV4.js
var IdGeneratorUuidV4 = __webpack_require__("31aa");
var IdGeneratorUuidV4_default = /*#__PURE__*/__webpack_require__.n(IdGeneratorUuidV4);

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// CONCATENATED MODULE: ./src/store/flow/block-types/ConsoleIO_ReadBlockStore.ts




var BLOCK_TYPE = 'ConsoleIO\\Read';
var ConsoleIO_ReadBlockStore_getters = {
  destinationVariablesFields: function destinationVariablesFields(state, getters, rootState, rootGetters) {
    var activeBlock = rootGetters['builder/activeBlock']; // TODO: correct the destination variables array according to scanf library we're using, and think about consecutive % or other error we should avoid

    return new Array(Object(lodash["split"])(activeBlock.config.format_string || '', "%").length - 1);
  }
};
var mutations = {};
var actions = {
  setFormatString: function setFormatString(_ref, newFormatString) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var commit, rootGetters, activeBlock, newConfig;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit, rootGetters = _ref.rootGetters;
              activeBlock = rootGetters['builder/activeBlock'];
              newConfig = {
                format_string: newFormatString
              };
              commit('flow/block_updateConfigByKey', {
                blockId: activeBlock.uuid,
                key: 'format_string',
                value: newFormatString
              }, {
                root: true
              });
              return _context.abrupt("return", newConfig);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  editDestinationVariable: function editDestinationVariable(_ref2, _ref3) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var commit, dispatch, getters, rootGetters, variableName, keyIndex, activeBlock, newDestinationVariables;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit, dispatch = _ref2.dispatch, getters = _ref2.getters, rootGetters = _ref2.rootGetters;
              variableName = _ref3.variableName, keyIndex = _ref3.keyIndex;
              activeBlock = rootGetters['builder/activeBlock'];
              newDestinationVariables = activeBlock.config.destination_variables || [];
              newDestinationVariables[keyIndex] = variableName;
              commit('flow/block_updateConfigByKey', {
                blockId: activeBlock.uuid,
                key: 'destination_variables',
                value: newDestinationVariables
              }, {
                root: true
              });
              return _context2.abrupt("return", newDestinationVariables);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  createWith: function createWith(_ref4, _ref5) {
    return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var dispatch, props, exits;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              dispatch = _ref4.dispatch;
              props = _ref5.props;
              _context3.next = 4;
              return dispatch('flow/block_createBlockDefaultExitWith', {
                props: {
                  uuid: new IdGeneratorUuidV4_default.a().generate(),
                  tag: 'Default',
                  label: 'Default'
                }
              }, {
                root: true
              });

            case 4:
              _context3.t0 = _context3.sent;
              exits = [_context3.t0];
              _context3.t1 = exits;
              _context3.next = 9;
              return dispatch('flow/block_createBlockExitWith', {
                props: {
                  uuid: new IdGeneratorUuidV4_default.a().generate(),
                  tag: 'Error',
                  label: 'Error'
                }
              }, {
                root: true
              });

            case 9:
              _context3.t2 = _context3.sent;

              _context3.t1.push.call(_context3.t1, _context3.t2);

              return _context3.abrupt("return", Object(lodash["defaults"])(props, {
                type: BLOCK_TYPE,
                name: '',
                label: '',
                semanticLabel: '',
                config: {
                  format_string: '',
                  destination_variables: []
                },
                exits: exits
              }));

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  }
};
/* harmony default export */ var ConsoleIO_ReadBlockStore = ({
  namespaced: true,
  getters: ConsoleIO_ReadBlockStore_getters,
  mutations: mutations,
  actions: actions
});
// EXTERNAL MODULE: ./src/store/builder/index.ts + 6 modules
var builder = __webpack_require__("af98");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--13-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/interaction-designer/block-types/ConsoleIO_ReadBlock.vue?vue&type=script&lang=ts&





















var blockVuexNamespace = Object(lib["b" /* namespace */])("flow/".concat(BLOCK_TYPE));

var ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock = /*#__PURE__*/function (_Vue) {
  Object(inherits["a" /* default */])(ConsoleIO_ReadBlock, _Vue);

  var _super = Object(createSuper["a" /* default */])(ConsoleIO_ReadBlock);

  function ConsoleIO_ReadBlock() {
    Object(classCallCheck["a" /* default */])(this, ConsoleIO_ReadBlock);

    return _super.apply(this, arguments);
  }

  Object(createClass["a" /* default */])(ConsoleIO_ReadBlock, [{
    key: "filterVariableName",
    value: function filterVariableName(e) {
      if (e.key.match(/\W+|Enter/g)) {
        e.preventDefault();
      }
    }
  }, {
    key: "updatedestinationVariables",
    value: function updatedestinationVariables(value, i) {
      this.editDestinationVariable({
        variableName: value,
        keyIndex: i
      });
    }
  }]);

  return ConsoleIO_ReadBlock;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock.prototype, "block", void 0);

Object(tslib_es6["__decorate"])([Object(vue_property_decorator["b" /* Prop */])()], ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock.prototype, "flow", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock.prototype, "setFormatString", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Action], ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock.prototype, "editDestinationVariable", void 0);

Object(tslib_es6["__decorate"])([blockVuexNamespace.Getter], ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock.prototype, "destinationVariablesFields", void 0);

ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock = Object(tslib_es6["__decorate"])([Object(vue_property_decorator["a" /* Component */])({
  components: {
    ResourceEditor: ResourceEditor["a" /* default */],
    BlockNameEditor: NameEditor["a" /* default */],
    BlockLabelEditor: LabelEditor["a" /* default */],
    BlockSemanticLabelEditor: SemanticLabelEditor["a" /* default */],
    BlockFormatStringEditor: FormatStringEditor,
    FirstBlockEditorButton: FirstBlockEditorButton["a" /* default */],
    TextEditor: TextEditor["a" /* default */],
    BlockId: BlockId["a" /* default */]
  },
  mixins: [lang["a" /* default */]]
})], ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock);
/* harmony default export */ var ConsoleIO_ReadBlockvue_type_script_lang_ts_ = (ConsoleIO_ReadBlockvue_type_script_lang_ts_ConsoleIO_ReadBlock);
var install = Object(builder["b" /* createDefaultBlockTypeInstallerFor */])(BLOCK_TYPE, ConsoleIO_ReadBlockStore);
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/ConsoleIO_ReadBlock.vue?vue&type=script&lang=ts&
 /* harmony default export */ var block_types_ConsoleIO_ReadBlockvue_type_script_lang_ts_ = (ConsoleIO_ReadBlockvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./src/components/interaction-designer/block-types/ConsoleIO_ReadBlock.vue





/* normalize component */

var ConsoleIO_ReadBlock_component = Object(componentNormalizer["a" /* default */])(
  block_types_ConsoleIO_ReadBlockvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var block_types_ConsoleIO_ReadBlock = __webpack_exports__["default"] = (ConsoleIO_ReadBlock_component.exports);

/***/ })

}]);
//# sourceMappingURL=flow-builder.umd.10.js.map