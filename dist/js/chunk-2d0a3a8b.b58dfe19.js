(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a3a8b"],{"02b5":function(e,t,o){"use strict";o.r(t),o.d(t,"install",(function(){return z}));var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"core-set-group-membership-block"},[o("h3",{staticClass:"no-room-above"},[e._v(" "+e._s(e._f("trans")("flow-builder.edit-block-type",{block_type:e.trans("flow-builder."+e.block.type)}))+" ")]),o("fieldset",{attrs:{disabled:!e.isEditable}},[o("block-name-editor",{attrs:{block:e.block}}),o("block-label-editor",{attrs:{block:e.block}}),o("block-semantic-label-editor",{attrs:{block:e.block}}),o("div",{staticClass:"form-group"},[o("label",[e._v(e._s(e._f("trans")("flow-builder.action-label")))]),o("vue-multiselect",{attrs:{"track-by":"id",label:"name",placeholder:e._f("trans")("flow-builder.action-placeholder"),options:e.actionsList,"allow-empty":!0,"show-labels":!1,searchable:!1},model:{value:e.selectedAction,callback:function(t){e.selectedAction=t},expression:"selectedAction"}})],1),o("group-selector",{attrs:{block:e.block}}),e._t("extras"),o("first-block-editor-button",{attrs:{flow:e.flow,"block-id":e.block.uuid}})],2),o("block-id",{attrs:{block:e.block}})],1)},r=[],c=o("d4ec"),l=o("bee2"),i=o("262e"),n=o("2caf"),s=o("9ab4"),b=o("4bb5"),u=o("60a3"),d=o("f04e"),p=o("3411"),f=o("1b4e"),k=o("192b"),m=o("792f"),h=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"block-group form-group"},[o("label",[e._v(e._s(e._f("trans")("flow-builder.group-label")))]),o("vue-multiselect",{attrs:{"track-by":"id",label:"name",placeholder:e._f("trans")("flow-builder.group-selector-placeholder"),options:e.groups,"allow-empty":!1,"show-labels":!1,searchable:!0},model:{value:e.selectedGroup,callback:function(t){e.selectedGroup=t},expression:"selectedGroup"}})],1)},v=[],j=(o("b0c0"),o("8e5f")),O=o.n(j),g=o("4a51"),w=o("2ef0"),_=o("2fe1"),y=Object(b["e"])("flow"),B=function(e){Object(i["a"])(o,e);var t=Object(n["a"])(o);function o(){return Object(c["a"])(this,o),t.apply(this,arguments)}return Object(l["a"])(o,[{key:"selectedGroup",get:function(){var e=this.block.config.group_key;if(!e)return{};var t=Object(w["find"])(this.groups,{id:e});return t||{}},set:function(e){this.block_updateConfigByPath({blockId:this.block.uuid,path:"group_key",value:e.id}),this.block_updateConfigByPath({blockId:this.block.uuid,path:"group_name",value:e.name})}}]),o}(Object(_["c"])(g["a"]));Object(s["a"])([Object(u["b"])()],B.prototype,"block",void 0),Object(s["a"])([y.Mutation],B.prototype,"block_updateConfigByPath",void 0),Object(s["a"])([b["b"]],B.prototype,"groups",void 0),B=Object(s["a"])([Object(u["a"])({components:{VueMultiselect:O.a}})],B);var x=B,C=x,E=o("2877"),G=Object(E["a"])(C,h,v,!1,null,null,null),I=G.exports,M=(o("d3b7"),o("25f0"),o("96cf"),o("1da1")),L=o("31aa"),A="add",P="remove",D="Core.SetGroupMembership",R={},S={},V={createWith:function(e,t){return Object(M["a"])(regeneratorRuntime.mark((function o(){var a,r,c;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return a=e.dispatch,r=t.props,o.t0=a,o.next=5,(new L["IdGeneratorUuidV4"]).generate();case 5:return o.t1=o.sent,o.t2={uuid:o.t1,tag:"Default",label:"Default"},o.t3={props:o.t2},o.t4={root:!0},o.next=11,(0,o.t0)("flow/block_createBlockDefaultExitWith",o.t3,o.t4);case 11:return o.t5=o.sent,c=[o.t5],o.abrupt("return",Object(w["defaultsDeep"])(r,{type:D,name:"",label:"",semantic_label:"",config:{group_key:"",group_name:"",is_member:null},exits:c}));case 14:case"end":return o.stop()}}),o)})))()},setIsMember:function(e,t){return Object(M["a"])(regeneratorRuntime.mark((function o(){var a,r,c,l,i;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:a=e.commit,r=e.rootGetters,c=r["builder/activeBlock"],l="",t&&(i=t.id===A,l=i.toString()),a("flow/block_updateConfigByPath",{blockId:c.uuid,path:"is_member",value:l},{root:!0});case 5:case"end":return o.stop()}}),o)})))()}},J={namespaced:!0,getters:R,mutations:S,actions:V},W=o("af98"),$=Object(b["e"])("flow/".concat(D)),F=Object(b["e"])("flow"),N=Object(b["e"])("builder"),U=function(e){Object(i["a"])(o,e);var t=Object(n["a"])(o);function o(){var e;return Object(c["a"])(this,o),e=t.apply(this,arguments),e.actionsList=[{id:A,name:e.trans("flow-builder.add")},{id:P,name:e.trans("flow-builder.remove")}],e}return Object(l["a"])(o,[{key:"selectedAction",get:function(){var e=this.block.config.is_member;return"false"===e?Object(w["find"])(this.actionsList,{id:P})||{}:"true"===e&&Object(w["find"])(this.actionsList,{id:A})||{}},set:function(e){this.setIsMember(e)}}]),o}(Object(_["c"])(g["a"]));Object(s["a"])([Object(u["b"])()],U.prototype,"block",void 0),Object(s["a"])([Object(u["b"])()],U.prototype,"flow",void 0),Object(s["a"])([$.Action],U.prototype,"setIsMember",void 0),Object(s["a"])([N.Getter],U.prototype,"isEditable",void 0),Object(s["a"])([F.Mutation],U.prototype,"block_updateConfigByPath",void 0),U=Object(s["a"])([Object(u["a"])({components:{BlockNameEditor:d["a"],BlockLabelEditor:p["a"],BlockSemanticLabelEditor:f["a"],FirstBlockEditorButton:k["a"],BlockId:m["a"],GroupSelector:I,VueMultiselect:O.a}})],U);var q=U,z=Object(W["c"])(D,J),H=q,K=Object(E["a"])(H,a,r,!1,null,null,null);t["default"]=K.exports}}]);
//# sourceMappingURL=chunk-2d0a3a8b.b58dfe19.js.map